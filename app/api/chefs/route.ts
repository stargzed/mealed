import { NextResponse } from "next/server";
import { SEED_CHEFS } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verifiedOnly = searchParams.get("verifiedOnly") === "true";
  const fulfillmentType = searchParams.get("fulfillmentType");
  const featured = searchParams.get("featured") === "true";

  let chefs = SEED_CHEFS;
  if (verifiedOnly) chefs = chefs.filter((c) => c.verified);
  if (featured) chefs = chefs.filter((c) => c.featured);
  if (fulfillmentType === "pickup") chefs = chefs.filter((c) => c.pickupEnabled);
  if (fulfillmentType === "delivery") chefs = chefs.filter((c) => c.deliveryEnabled);

  return NextResponse.json({ chefs });
}
