import { NextResponse } from "next/server";

// Address autocomplete proxy.
//
// - If GOOGLE_PLACES_API_KEY is set, calls Google Places Autocomplete (New).
// - Otherwise falls back to OpenStreetMap Nominatim (free, no key, but rate-
//  limited and requires a UA header per their policy).
//
// Returns a normalized shape so the frontend doesn't care which provider
// answered.

export interface PlacePrediction {
 id: string;
 label: string;    // primary line, e.g. "601 W 40th Pl"
 secondary?: string;  // city/region, e.g. "Los Angeles, CA, USA"
 lat?: number;
 lng?: number;
 full: string;     // the full address the input should be set to
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const q = (searchParams.get("q") ?? "").trim();

 if (q.length < 2) return NextResponse.json({ predictions: [] });

 const googleKey = process.env.GOOGLE_PLACES_API_KEY;

 try {
  let predictions: PlacePrediction[];
  if (googleKey) {
   predictions = await fetchGoogle(q, googleKey);
  } else {
   // Photon is designed for autocomplete; falls back to Nominatim if it
   // returns nothing useful.
   predictions = await fetchPhoton(q);
   if (predictions.length === 0) predictions = await fetchNominatim(q);
  }
  return NextResponse.json({ predictions });
 } catch (err) {
  console.warn("autocomplete failed", err);
  return NextResponse.json({ predictions: [] });
 }
}

async function fetchPhoton(q: string): Promise<PlacePrediction[]> {
 // If the query starts with a number (house number), we'll use it to filter
 // out partial street matches that don't include that number.
 const numMatch = q.match(/^\s*(\d{1,7})\b/);
 const queryHouseNumber = numMatch ? numMatch[1] : null;
 const queryTokens = q.toLowerCase().split(/\s+/).filter(Boolean);

 const url = new URL("https://photon.komoot.io/api/");
 url.searchParams.set("q", q);
 url.searchParams.set("limit", "15"); // over-fetch so we have room to filter
 url.searchParams.set("lang", "en");
 // LA proximity bias (Mealed is LA-only for now). Soft bias, not hard filter.
 url.searchParams.set("lat", "34.0522");
 url.searchParams.set("lon", "-118.2437");

 const res = await fetch(url, {
  headers: { "User-Agent": "Mealed/0.1 (mealed.app)", Accept: "application/json" },
  next: { revalidate: 60 },
 });
 if (!res.ok) throw new Error(`photon ${res.status}`);
 const data = (await res.json()) as {
  features?: Array<{
   properties: {
    osm_id: number;
    osm_type: string;
    name?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    postcode?: string;
    type?: string;
   };
   geometry: { coordinates: [number, number] };
  }>;
 };

 const mapped = (data.features ?? [])
  .filter((f) => (f.properties.countrycode ?? "").toUpperCase() === "US")
  .map((f) => {
   const p = f.properties;
   const street = abbreviateStreet(p.street ?? "");
   const primary = p.housenumber && street
    ? `${p.housenumber} ${street}`
    : street || p.name || "";
   const city = p.city ?? p.district ?? p.county ?? "";
   const stateRaw = p.state ?? "";
   const state =
    STATE_ABBR[stateRaw.toLowerCase()] ?? (stateRaw.length === 2 ? stateRaw : stateRaw);
   const secondary = [city, state].filter(Boolean).join(", ");
   const full = [primary, city, stateRaw, p.postcode, p.country]
    .filter(Boolean)
    .join(", ");
   // Score: lower is better.
   let score = 0;
   // If query had a house number, require a matching one (huge penalty otherwise).
   if (queryHouseNumber) {
    if (p.housenumber === queryHouseNumber) score -= 100;
    else if (p.housenumber && p.housenumber.startsWith(queryHouseNumber)) score -= 60;
    else score += 1000; // effectively drops
   }
   // Reward results whose street/name contains query tokens as whole words.
   // (Substring matching causes "place" → "Placentia" false positives.)
   // Expand common abbreviations so "west" / "place" match "W" / "Pl".
   const tokenExpand: Record<string, string[]> = {
    west: ["west", "w"],
    east: ["east", "e"],
    north: ["north", "n"],
    south: ["south", "s"],
    place: ["place", "pl"],
    street: ["street", "st"],
    avenue: ["avenue", "ave"],
    boulevard: ["boulevard", "blvd"],
    road: ["road", "rd"],
    drive: ["drive", "dr"],
    lane: ["lane", "ln"],
    court: ["court", "ct"],
   };
   const haystackWords = new Set(
    `${street} ${p.name ?? ""} ${city} ${stateRaw}`
     .toLowerCase()
     .split(/[^a-z0-9]+/)
     .filter(Boolean),
   );
   // Exclude only the leading pure-numeric house number; keep "40th" etc.
   const nonNumTokens = queryTokens.filter(
    (t, i) => !(i === 0 && /^\d+$/.test(t)),
   );
   const matched = nonNumTokens.filter((t) => {
    const variants = tokenExpand[t] ?? [t];
    return variants.some((v) => haystackWords.has(v));
   }).length;
   score -= matched * 15;
   // Soft penalty for missing city.
   if (!city) score += 5;
   return {
    prediction: {
     id: `${p.osm_type}-${p.osm_id}`,
     label: primary || p.name || "Unknown",
     secondary,
     lat: f.geometry.coordinates[1],
     lng: f.geometry.coordinates[0],
     full,
    } satisfies PlacePrediction,
    score,
    hasHouseNumber: Boolean(p.housenumber),
   };
  });

 let pool = mapped;
 // When the user typed a house number, drop results that don't have that number.
 if (queryHouseNumber) {
  const withMatch = pool.filter((r) => r.score < 1000);
  if (withMatch.length > 0) pool = withMatch;
 }

 return pool
  .sort((a, b) => a.score - b.score)
  .slice(0, 8)
  .map((r) => r.prediction)
  .filter((p) => p.label && p.secondary);
}

async function fetchNominatim(q: string): Promise<PlacePrediction[]> {
 const url = new URL("https://nominatim.openstreetmap.org/search");
 url.searchParams.set("q", q);
 url.searchParams.set("format", "json");
 url.searchParams.set("addressdetails", "1");
 url.searchParams.set("limit", "6");
 url.searchParams.set("countrycodes", "us"); // narrow to US Mealed is US-only for now

 const res = await fetch(url, {
  headers: {
   // Nominatim's usage policy requires a descriptive User-Agent.
   "User-Agent": "Mealed/0.1 (mealed.app)",
   Accept: "application/json",
  },
  next: { revalidate: 60 },
 });
 if (!res.ok) throw new Error(`nominatim ${res.status}`);
 const data = (await res.json()) as Array<{
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: Record<string, string>;
 }>;

 return data.map((row) => {
  const a = row.address ?? {};
  const num = a.house_number ?? "";
  const street = abbreviateStreet(a.road ?? "");
  const primary = [num, street].filter(Boolean).join(" ").trim();
  const cityish =
   a.city ?? a.town ?? a.village ?? a.suburb ?? a.neighbourhood ?? "";
  const stateRaw = a.state ?? "";
  const state =
   a.state_code ?? STATE_ABBR[stateRaw.toLowerCase()] ?? stateRaw;
  const secondary = [cityish, state].filter(Boolean).join(", ");
  return {
   id: String(row.place_id),
   label: primary || row.display_name.split(",")[0],
   secondary,
   lat: Number(row.lat),
   lng: Number(row.lon),
   full: row.display_name,
  } satisfies PlacePrediction;
 });
}

// Map common street suffixes / directions to the short form people actually
// recognize. Matches the look of Google Places ("601 W 40th Pl" not
// "601 West 40th Place").
const ABBR: Record<string, string> = {
 street: "St",
 avenue: "Ave",
 boulevard: "Blvd",
 road: "Rd",
 drive: "Dr",
 lane: "Ln",
 place: "Pl",
 court: "Ct",
 highway: "Hwy",
 parkway: "Pkwy",
 terrace: "Ter",
 square: "Sq",
 circle: "Cir",
 trail: "Trl",
 way: "Way",
 alley: "Aly",
 east: "E",
 west: "W",
 north: "N",
 south: "S",
 northeast: "NE",
 northwest: "NW",
 southeast: "SE",
 southwest: "SW",
};
function abbreviateStreet(s: string): string {
 if (!s) return s;
 return s
  .split(/\s+/)
  .map((word) => {
   const lower = word.toLowerCase();
   if (ABBR[lower]) return ABBR[lower];
   return word;
  })
  .join(" ");
}

const STATE_ABBR: Record<string, string> = {
 alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
 colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
 hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
 kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
 massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
 missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
 "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM",
 "new york": "NY", "north carolina": "NC", "north dakota": "ND",
 ohio: "OH", oklahoma: "OK", oregon: "OR", pennsylvania: "PA",
 "rhode island": "RI", "south carolina": "SC", "south dakota": "SD",
 tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT", virginia: "VA",
 washington: "WA", "west virginia": "WV", wisconsin: "WI", wyoming: "WY",
 "district of columbia": "DC",
};

async function fetchGoogle(q: string, key: string): Promise<PlacePrediction[]> {
 const res = await fetch(
  "https://places.googleapis.com/v1/places:autocomplete",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": key,
   },
   body: JSON.stringify({
    input: q,
    includedRegionCodes: ["us"],
    languageCode: "en",
   }),
   cache: "no-store",
  },
 );
 if (!res.ok) throw new Error(`google places ${res.status}`);
 const data = (await res.json()) as {
  suggestions?: Array<{
   placePrediction?: {
    placeId: string;
    text: { text: string };
    structuredFormat?: {
     mainText?: { text: string };
     secondaryText?: { text: string };
    };
   };
  }>;
 };
 return (data.suggestions ?? [])
  .map((s) => s.placePrediction)
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .map((p) => ({
   id: p.placeId,
   label: p.structuredFormat?.mainText?.text ?? p.text.text,
   secondary: p.structuredFormat?.secondaryText?.text,
   full: p.text.text,
  }));
}
