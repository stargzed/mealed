"use client";

import {
  ArrowUpRight,
  Check,
  ChefHat,
  Clock,
  ShoppingBag,
  Shield,
  Sparkles,
  Star,
  Truck,
  Heart,
  Plus,
  Quote,
} from "lucide-react";
import { useState } from "react";
import { LandingHero } from "@/components/marketing/landing-hero";
import { VideoTile } from "@/components/marketing/video-tile";
import { SavingsChart } from "@/components/marketing/savings-chart";
import { useAppDownload } from "@/lib/app-download-store";

// ---------------------------------------------------------------------------
// MOCK DATA — kept in the page file so it's easy to tweak without hunting.
// These are illustrative, not analytics: per-chef ratings stay (product detail
// per chef), but no aggregate counts ("X chefs", "X meals", "X reviews").
// ---------------------------------------------------------------------------

const MEALS = [
  {
    name: "Lemon Herb Salmon",
    chef: "Chef Maya",
    rating: "4.93",
    dist: "1.2",
    price: "14",
    servings: "5 meals · $52 plan",
    tags: ["High protein", "No dairy"],
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Miso Glazed Eggplant",
    chef: "Chef Lina",
    rating: "4.95",
    dist: "0.8",
    price: "11",
    servings: "5 meals · $48 plan",
    tags: ["Vegan", "GF"],
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cast Iron Carnitas",
    chef: "Chef Andre",
    rating: "4.86",
    dist: "2.4",
    price: "13",
    servings: "4 meals · $50 plan",
    tags: ["Family", "Hearty"],
    img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Coconut Chicken Bowl",
    chef: "Chef Sofia",
    rating: "4.91",
    dist: "1.7",
    price: "12",
    servings: "5 meals · $52 plan",
    tags: ["High protein"],
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
];

const CHEFS = [
  {
    name: "Maya",
    desc: "High-protein weekly prep",
    rating: "4.93",
    dist: "1.2 mi",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=240&h=240&fit=crop&crop=faces",
    spec: "Salmon · Chicken · Bowls",
  },
  {
    name: "Lina",
    desc: "Vegan & gluten-free meal prep",
    rating: "4.95",
    dist: "0.8 mi",
    img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=240&h=240&fit=crop&crop=faces",
    spec: "Vegan · Plant-forward",
  },
  {
    name: "Andre",
    desc: "Family dinners & comfort meals",
    rating: "4.86",
    dist: "2.4 mi",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=240&h=240&fit=crop&crop=faces",
    spec: "Family · Comfort",
  },
  {
    name: "Sofia",
    desc: "Latin-inspired weekly menus",
    rating: "4.91",
    dist: "1.7 mi",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=240&h=240&fit=crop&crop=faces",
    spec: "Latin · Bowls · Stews",
  },
  {
    name: "Marcus",
    desc: "BBQ & smoked specialties",
    rating: "4.88",
    dist: "3.1 mi",
    img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=240&h=240&fit=crop&crop=faces",
    spec: "BBQ · Smoked · Sides",
  },
];

const CHEF_INTROS = [
  {
    name: "Maya",
    spec: "High-protein weekly prep",
    quote:
      "My Sundays are eight pans, five families, and zero takeout for any of them.",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=240&h=240&fit=crop&crop=faces",
    video:
      "https://videos.pexels.com/video-files/3196175/3196175-hd_1280_720_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/3196175/free-video-3196175.jpg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Lina",
    spec: "Vegan & gluten-free",
    quote:
      "Plant-forward doesn't mean boring. Every plate has to earn its space in your fridge.",
    img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=240&h=240&fit=crop&crop=faces",
    video:
      "https://videos.pexels.com/video-files/8626681/8626681-hd_1280_720_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8626681/pexels-photo-8626681.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Andre",
    spec: "Family dinners & comfort meals",
    quote:
      "I cook the way my grandmother did. Slow, in cast iron, with whatever's in season.",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=240&h=240&fit=crop&crop=faces",
    video:
      "https://videos.pexels.com/video-files/8626674/8626674-hd_1280_720_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8626674/pexels-photo-8626674.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Sofia",
    spec: "Latin-inspired weekly menus",
    quote:
      "My abuela ran a fonda in Oaxaca. Now her recipes pay my rent in Echo Park.",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=240&h=240&fit=crop&crop=faces",
    video:
      "https://videos.pexels.com/video-files/8626677/8626677-hd_1280_720_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8626677/pexels-photo-8626677.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

// ---------------------------------------------------------------------------

export default function LandingPage() {
  return (
    <main style={{ background: "var(--m-bg)", color: "var(--m-ink)" }}>
      <LandingHero />
      <TrustStrip />
      <ThisWeekSection />
      <ChefIntrosSection />
      <HowItWorksPreview />
      <SavingsSection />
      <ChefsSection />
      <TrustSection />
      <ForChefsCTA />
      <FinalCTA />
    </main>
  );
}

// ===========================================================================
// TRUST STRIP — horizontal marquee of standards
// ===========================================================================
function TrustStrip() {
  const items = [
    "ID verified",
    "360° kitchen scan",
    "Sink visible in prep",
    "Reviews per dish",
    "Refrigerated handoff",
    "Allergen disclosure",
    "Background checked",
    "Insured kitchens",
  ];
  const doubled = [...items, ...items];
  return (
    <section
      style={{
        borderBottom: "1px solid var(--m-border)",
        padding: "20px 0",
        background: "var(--m-bg)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          animation: "marquee 40s linear infinite",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 text-[14px]"
            style={{ color: "var(--m-sub)" }}
          >
            <Check size={14} style={{ color: "var(--m-accent)" }} />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

// ===========================================================================
// THIS WEEK — filter chips + meal cards
// ===========================================================================
function ThisWeekSection() {
  const [filter, setFilter] = useState("All");
  const show = useAppDownload((s) => s.show);
  const filters = ["All", "High protein", "Vegan", "Family size", "Under $12", "Pickup", "Delivery"];
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div>
            <Eyebrow>This week in Echo Park</Eyebrow>
            <h2 className="m-display mt-3.5 max-w-2xl" style={h2Style}>
              Tonight's plate.
              <br />
              Tomorrow's lunches.
            </h2>
          </div>
          <button
            onClick={() => show()}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: "var(--m-ink)" }}
          >
            See all meals
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Filter row */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-2 px-2" style={scrollbarStyle}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="inline-flex items-center px-4 py-2.5 rounded-full text-[14px] whitespace-nowrap"
              style={
                filter === f
                  ? {
                      background: "var(--m-ink)",
                      color: "var(--m-bg)",
                      border: "1px solid var(--m-ink)",
                      fontWeight: 500,
                    }
                  : {
                      background: "transparent",
                      color: "var(--m-sub)",
                      border: "1px solid var(--m-line-2)",
                      fontWeight: 500,
                    }
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {MEALS.map((m) => (
            <MealCard key={m.name} meal={m} onAdd={() => show(`Add ${m.name} from ${m.chef} to your order in the Mealed app.`)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MealCard({
  meal,
  onAdd,
}: {
  meal: (typeof MEALS)[number];
  onAdd: () => void;
}) {
  return (
    <article
      className="grid overflow-hidden transition-shadow hover:shadow-md"
      style={{
        background: "var(--m-bg-elev)",
        borderRadius: "var(--m-radius-md)",
        border: "1px solid var(--m-border)",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <div className="relative aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={meal.img}
          alt={meal.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {meal.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-1 rounded-full backdrop-blur"
              style={{
                background: "color-mix(in oklch, var(--m-bg-elev) 92%, transparent)",
                color: "var(--m-ink)",
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <button
          aria-label="Save"
          onClick={onAdd}
          className="absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center backdrop-blur"
          style={{
            background: "color-mix(in oklch, var(--m-bg-elev) 92%, transparent)",
            color: "var(--m-ink)",
          }}
        >
          <Heart size={16} />
        </button>
      </div>
      <div className="px-5 pt-4 pb-5 grid gap-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="m-display text-[20px] leading-tight">{meal.name}</h3>
          <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--m-sub)" }}>
            ${meal.price}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[14px]" style={{ color: "var(--m-sub)" }}>
          <span>{meal.chef}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span className="inline-flex items-center gap-1">
            <Star size={12} style={{ color: "var(--m-orange)", fill: "var(--m-orange)" }} />
            {meal.rating}
          </span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{meal.dist} mi</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[13px]" style={{ color: "var(--m-muted)" }}>
            {meal.servings}
          </span>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: "var(--m-accent)" }}
          >
            Add <Plus size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

// ===========================================================================
// CHEF INTROS — switchable video tile
// ===========================================================================
function ChefIntrosSection() {
  const [active, setActive] = useState(0);
  const chef = CHEF_INTROS[active];
  const show = useAppDownload((s) => s.show);
  return (
    <section
      className="py-20 md:py-24"
      style={{ background: "var(--m-ink)", color: "var(--m-bg)" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <Eyebrow style={{ color: "color-mix(in oklch, var(--m-bg) 55%, transparent)" }}>
              Meet the chefs
            </Eyebrow>
            <h2 className="m-display mt-3.5" style={{ ...h2Style, color: "var(--m-bg)" }}>
              Their hands.
              <br />
              <span style={{ color: "var(--m-orange)" }}>Their kitchens.</span>
            </h2>
          </div>
          <p
            className="max-w-[380px] text-[16px]"
            style={{ color: "color-mix(in oklch, var(--m-bg) 70%, transparent)", margin: 0 }}
          >
            Every chef on Mealed records a 60-second intro. No script, no
            production crew — just them and a knife.
          </p>
        </div>

        <div
          className="grid items-start gap-8"
          style={{ gridTemplateColumns: "1.2fr 0.8fr" }}
        >
          {/* Main video */}
          <VideoTile
            key={chef.name}
            src={chef.video}
            poster={chef.poster}
            ratio="16/10"
            radius="var(--m-radius-lg)"
            style={{ boxShadow: "var(--m-shadow-lg)" }}
            overlay={
              <>
                {/* Bottom gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Live "COOK DAY" tag */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "var(--m-radius-pill)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#F45",
                      animation: "pulse 1.6s infinite",
                    }}
                  />
                  COOK DAY
                </div>
                {/* Caption */}
                <div
                  className="flex items-end justify-between gap-4"
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    color: "#fff",
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    <ChefAvatar src={chef.img} size={52} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.2 }}>
                        Chef {chef.name}
                      </div>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>{chef.spec}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => show(`View Chef ${chef.name}'s menu in the Mealed app.`)}
                    style={{
                      background: "var(--m-orange)",
                      color: "#14110C",
                      padding: "10px 16px",
                      borderRadius: "var(--m-radius-pill)",
                      fontWeight: 600,
                      fontSize: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      pointerEvents: "auto",
                    }}
                  >
                    View menu <ArrowUpRight size={14} />
                  </button>
                </div>
              </>
            }
          />

          {/* Right column: quote + thumbnails */}
          <div className="grid gap-6" style={{ gridTemplateRows: "auto 1fr" }}>
            <blockquote
              style={{
                margin: 0,
                padding: "28px",
                borderRadius: "var(--m-radius-lg)",
                border: "1px solid color-mix(in oklch, var(--m-bg) 14%, transparent)",
                background: "color-mix(in oklch, var(--m-bg) 5%, transparent)",
                color: "var(--m-bg)",
                fontSize: 22,
                lineHeight: 1.4,
                letterSpacing: "-0.015em",
                fontWeight: 500,
                display: "grid",
                gap: 18,
              }}
            >
              <Quote size={22} style={{ color: "var(--m-orange)" }} />
              &ldquo;{chef.quote}&rdquo;
              <span
                style={{
                  fontSize: 13,
                  color: "color-mix(in oklch, var(--m-bg) 65%, transparent)",
                  fontWeight: 500,
                  letterSpacing: 0,
                }}
              >
                — Chef {chef.name}, {chef.spec.toLowerCase()}
              </span>
            </blockquote>

            <div className="grid grid-cols-2 gap-3">
              {CHEF_INTROS.map((c, i) => (
                <div
                  key={c.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={i === active}
                  // onPointerDown fires before any focus / click suppression
                  // and works the same on mouse + touch. Switching is
                  // instantaneous and immune to whatever was eating click
                  // events on the <button> variant.
                  onPointerDown={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className="relative overflow-hidden aspect-[4/3] select-none"
                  style={{
                    borderRadius: "var(--m-radius-md)",
                    border: i === active ? "2px solid var(--m-orange)" : "2px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.poster}
                    alt={c.name}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: i === active ? 1 : 0.55,
                      transition: "opacity .2s",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-center"
                    style={{
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      pointerEvents: "none",
                    }}
                  >
                    <span>Chef {c.name}</span>
                    {i === active && (
                      <span
                        className="inline-flex items-center text-[10px] px-1.5 py-0.5"
                        style={{
                          letterSpacing: "0.08em",
                          background: "var(--m-orange)",
                          color: "#14110C",
                          borderRadius: 4,
                        }}
                      >
                        PLAYING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// HOW IT WORKS — 5-step preview cards
// ===========================================================================
function HowItWorksPreview() {
  const steps = [
    { n: "01", t: "Tell us your diet", d: "Allergies, goals, meals per week. Takes 90 seconds.", Icon: Sparkles },
    { n: "02", t: "Discover chefs", d: "Verified home chefs near you, ranked by dish ratings.", Icon: ChefHat },
    { n: "03", t: "Order weekly or custom", d: "Pick from this week's menu or request a personal plan.", Icon: ShoppingBag },
    { n: "04", t: "Pickup or delivery", d: "Depends on the chef. Track every order to the door.", Icon: Truck },
    { n: "05", t: "Review per dish", d: "Help future eaters. Rate the chef and each meal.", Icon: Star },
  ];
  return (
    <section className="py-20 md:py-24" style={{ background: "var(--m-soft)" }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <header className="grid gap-4 max-w-[900px] mb-14">
          <Eyebrow>How Mealed works</Eyebrow>
          <h2 className="m-display" style={h2Style}>
            Five steps. About a minute.
          </h2>
          <p style={leadStyle}>
            From signup to a fridge full of home-cooked meals — without lifting a knife.
          </p>
        </header>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        >
          {steps.map((s) => (
            <article
              key={s.n}
              className="grid gap-3.5"
              style={{
                background: "var(--m-bg-elev)",
                padding: "24px 22px",
                borderRadius: "var(--m-radius-md)",
                border: "1px solid var(--m-border)",
                minHeight: 220,
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 12, color: "var(--m-muted)" }}>
                  {s.n}
                </span>
                <span
                  className="grid place-items-center w-8 h-8 rounded-full"
                  style={{
                    background: "color-mix(in oklch, var(--m-accent) 12%, transparent)",
                    color: "var(--m-accent)",
                  }}
                >
                  <s.Icon size={16} />
                </span>
              </div>
              <h3 className="m-display text-[18px] leading-snug">{s.t}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "var(--m-sub)" }}>
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// SAVINGS — reuses the existing bar-chart component, new copy
// ===========================================================================
function SavingsSection() {
  const show = useAppDownload((s) => s.show);
  return (
    <section className="py-20 md:py-24">
      <div
        className="max-w-[1320px] mx-auto px-5 md:px-8 grid gap-16 items-center"
        style={{ gridTemplateColumns: "0.9fr 1.1fr" }}
      >
        <div>
          <Eyebrow>Eat better, spend less</Eyebrow>
          <h2 className="m-display mt-3.5 mb-5" style={h2Style}>
            Save{" "}
            <span style={{ color: "var(--m-accent)" }}>$25–$45</span> a week, one meal a day.
          </h2>
          <p style={leadStyle} className="mb-7">
            Compared to a $20+ fast food habit, Mealed-style home-cooked meals at $13
            land in your fridge for $8–$10 less per meal — with none of the prep.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => show("Find verified chefs near you in the Mealed app.")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] transition hover:-translate-y-0.5"
              style={{ background: "var(--m-accent)", color: "var(--m-hero-ink)" }}
            >
              Find meals near me
            </button>
            <button
              onClick={() => show("Preview a sample week in the Mealed app.")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border transition hover:bg-[color-mix(in_oklch,var(--m-bg)_60%,transparent)]"
              style={{
                background: "transparent",
                color: "var(--m-ink)",
                borderColor: "var(--m-line-2)",
              }}
            >
              See sample week
            </button>
          </div>
        </div>
        <SavingsChart />
      </div>
    </section>
  );
}

// ===========================================================================
// CHEFS — verified chef grid
// ===========================================================================
function ChefsSection() {
  const show = useAppDownload((s) => s.show);
  return (
    <section className="py-20 md:py-24" style={{ background: "var(--m-soft)" }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <Eyebrow>Verified chefs</Eyebrow>
            <h2 className="m-display mt-3.5 max-w-2xl" style={h2Style}>
              Cooked by people you can trust.
            </h2>
          </div>
          <p className="max-w-[380px]" style={{ ...leadStyle, margin: 0 }}>
            Every chef passes an ID check, a 360° kitchen scan, and a sample-meal review.
            Then you decide.
          </p>
        </div>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {CHEFS.map((c) => (
            <article
              key={c.name}
              className="grid gap-3.5 transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--m-bg-elev)",
                borderRadius: "var(--m-radius-md)",
                padding: "24px 20px 22px",
                border: "1px solid var(--m-border)",
              }}
            >
              <div className="flex items-center gap-3.5">
                <ChefAvatar src={c.img} size={56} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17 }}>Chef {c.name}</div>
                  <div
                    className="inline-flex items-center gap-1.5 text-[13px]"
                    style={{ color: "var(--m-muted)" }}
                  >
                    <Star size={11} style={{ color: "var(--m-orange)", fill: "var(--m-orange)" }} />
                    {c.rating} · {c.dist}
                  </div>
                </div>
              </div>
              <p className="text-[14px]" style={{ color: "var(--m-sub)", margin: 0 }}>
                {c.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.spec.split(" · ").map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center text-[11px] px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: "var(--m-line-2)",
                      color: "var(--m-sub)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                onClick={() => show(`View Chef ${c.name}'s menu in the Mealed app.`)}
                className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-left"
                style={{ color: "var(--m-accent)" }}
              >
                View menu <ArrowUpRight size={12} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// TRUST PANEL — standards list + kitchen scan video
// ===========================================================================
function TrustSection() {
  const items = [
    { t: "ID verified", d: "Government ID + selfie match before any listing goes live.", Icon: Shield },
    { t: "360° kitchen scan", d: "Walk us through your kitchen on video. Every surface, every appliance.", Icon: Sparkles },
    { t: "Sink visible in prep", d: "All cook-day prep photos include a clean sink. Yes, really.", Icon: Check },
    { t: "Reviews per dish", d: "Rate each meal, not just the chef. Filter chefs by your favorite dish.", Icon: Star },
  ];
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <header className="grid gap-4 max-w-[900px] mb-14">
          <Eyebrow>Trust &amp; safety</Eyebrow>
          <h2 className="m-display" style={h2Style}>
            The standards behind every Mealed kitchen.
          </h2>
          <p style={leadStyle}>
            Strangers cooking for strangers only works with paranoia and transparency.
            We chose both.
          </p>
        </header>
        <div className="grid gap-14 items-start" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
          <div className="grid gap-0">
            {items.map((it, i) => (
              <div
                key={it.t}
                className="grid items-start gap-6 py-7"
                style={{
                  gridTemplateColumns: "56px 1fr auto",
                  borderTop: i === 0 ? "1px solid var(--m-border)" : "none",
                  borderBottom: "1px solid var(--m-border)",
                }}
              >
                <span
                  className="grid place-items-center w-12 h-12"
                  style={{
                    borderRadius: "var(--m-radius-sm)",
                    background: "color-mix(in oklch, var(--m-accent) 12%, transparent)",
                    color: "var(--m-accent)",
                  }}
                >
                  <it.Icon size={20} />
                </span>
                <div>
                  <h3 className="m-display text-[22px] mb-1.5">{it.t}</h3>
                  <p className="text-[15px]" style={{ color: "var(--m-sub)", margin: 0 }}>
                    {it.d}
                  </p>
                </div>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 12,
                    color: "var(--m-muted)",
                  }}
                >
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>

          <div style={{ position: "sticky", top: 96 }}>
            <VideoTile
              src="https://videos.pexels.com/video-files/8626672/8626672-hd_1280_720_25fps.mp4"
              poster="https://images.pexels.com/videos/8626672/pexels-photo-8626672.jpeg?auto=compress&cs=tinysrgb&w=900"
              ratio="4/5"
              radius="var(--m-radius-lg)"
              style={{ boxShadow: "var(--m-shadow-lg)" }}
              overlay={
                <>
                  {/* Live scan tag */}
                  <div
                    className="inline-flex items-center gap-2"
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "var(--m-radius-pill)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#F45",
                        animation: "pulse 1.6s infinite",
                      }}
                    />
                    360° KITCHEN SCAN
                  </div>
                  {/* Verified badge */}
                  <div
                    className="flex items-center gap-3"
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      background: "color-mix(in oklch, var(--m-bg-elev) 92%, transparent)",
                      backdropFilter: "blur(12px)",
                      padding: "14px 18px",
                      borderRadius: "var(--m-radius-sm)",
                      color: "var(--m-ink)",
                    }}
                  >
                    <Shield size={20} style={{ color: "var(--m-accent)" }} />
                    <div style={{ fontSize: 13, lineHeight: 1.35 }}>
                      <div style={{ fontWeight: 600 }}>Verified Aug 2026</div>
                      <div style={{ color: "var(--m-sub)" }}>
                        Chef Maya · Kitchen ID #LA-0241
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// FOR CHEFS CTA
// ===========================================================================
function ForChefsCTA() {
  const show = useAppDownload((s) => s.show);
  const perks = [
    { t: "Own your menu", d: "Weekly drops, custom plans, your prices.", Icon: Sparkles },
    { t: "Pickup or delivery", d: "You choose. Mealed handles routing.", Icon: Truck },
    { t: "Built-in trust", d: "Verified badge, kitchen scan, dish reviews.", Icon: Shield },
    { t: "Fast payouts", d: "24 hours after a completed order.", Icon: Clock },
  ];
  return (
    <section
      className="py-20 md:py-24"
      style={{ background: "var(--m-ink)", color: "var(--m-bg)" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <div className="grid gap-16 items-start" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="grid gap-6">
            <Eyebrow style={{ color: "color-mix(in oklch, var(--m-bg) 60%, transparent)" }}>
              For chefs
            </Eyebrow>
            <h2 className="m-display" style={{ ...h2Style, color: "var(--m-bg)" }}>
              Cook for your{" "}
              <span style={{ color: "var(--m-orange)" }}>neighborhood.</span>
            </h2>
            <p
              style={{
                margin: 0,
                color: "color-mix(in oklch, var(--m-bg) 80%, transparent)",
                maxWidth: 520,
                fontSize: 20,
                lineHeight: 1.45,
              }}
            >
              Set your own menu. Choose pickup or delivery. Keep{" "}
              <strong style={{ color: "var(--m-orange)" }}>93%</strong> of every
              order. Mealed handles checkout, taxes, and payouts.
            </p>
            <div className="flex gap-3 flex-wrap mt-2">
              <button
                onClick={() =>
                  show("Apply, verify your kitchen, and post your first menu from the Mealed app.")
                }
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[15px] transition hover:-translate-y-0.5"
                style={{ background: "var(--m-orange)", color: "#14110C" }}
              >
                Become a chef
              </button>
              <a
                href="/safety"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[15px] border transition"
                style={{
                  background: "transparent",
                  color: "var(--m-bg)",
                  borderColor: "color-mix(in oklch, var(--m-bg) 30%, transparent)",
                }}
              >
                See our standards
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {perks.map((p) => (
              <div
                key={p.t}
                className="grid gap-2.5"
                style={{
                  background: "color-mix(in oklch, var(--m-bg) 6%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--m-bg) 12%, transparent)",
                  borderRadius: "var(--m-radius-md)",
                  padding: "22px 20px",
                }}
              >
                <p.Icon size={20} style={{ color: "var(--m-orange)" }} />
                <div style={{ fontWeight: 600, fontSize: 17, color: "var(--m-bg)" }}>
                  {p.t}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "color-mix(in oklch, var(--m-bg) 70%, transparent)",
                  }}
                >
                  {p.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// FINAL CTA
// ===========================================================================
function FinalCTA() {
  const show = useAppDownload((s) => s.show);
  return (
    <section style={{ padding: "96px 0", background: "var(--m-soft)" }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 text-center grid gap-7 justify-items-center">
        <Eyebrow>Meal prep, made local.</Eyebrow>
        <h2
          className="m-display"
          style={{
            margin: 0,
            maxWidth: 900,
            fontSize: "clamp(48px, 6vw, 88px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
          }}
        >
          Browse chefs in your neighborhood.
          <br />
          <span style={{ color: "var(--m-accent)" }}>
            Order this week in under a minute.
          </span>
        </h2>
        <div className="flex gap-3 justify-center flex-wrap mt-2">
          <button
            onClick={() => show()}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[15px] transition hover:-translate-y-0.5"
            style={{ background: "var(--m-accent)", color: "var(--m-hero-ink)" }}
          >
            Find meals near me
          </button>
          <a
            href="/become-a-chef"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[15px] border transition"
            style={{
              background: "transparent",
              color: "var(--m-ink)",
              borderColor: "var(--m-line-2)",
            }}
          >
            Become a chef
          </a>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// Shared small components
// ===========================================================================
function Eyebrow({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="text-[12px] uppercase"
      style={{
        letterSpacing: "0.14em",
        color: "var(--m-muted)",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ChefAvatar({ src, size = 56 }: { src: string; size?: number }) {
  return (
    <span
      className="overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        background: "var(--m-soft)",
        border: "2px solid var(--m-bg-elev)",
        flex: `0 0 ${size}px`,
        display: "inline-block",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </span>
  );
}

const h2Style: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(36px, 5vw, 72px)",
  lineHeight: 1.0,
  letterSpacing: "-0.025em",
};

const leadStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.45,
  color: "var(--m-sub)",
  maxWidth: "60ch",
};

const scrollbarStyle: React.CSSProperties = {
  scrollbarWidth: "thin",
};
