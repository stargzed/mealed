"use client";

import {
  Check,
  ChefHat,
  Clock,
  ShoppingBag,
  Shield,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { LandingHero } from "@/components/marketing/landing-hero";
import { VideoTile } from "@/components/marketing/video-tile";
import { SavingsChart } from "@/components/marketing/savings-chart";
import { useAppDownload } from "@/lib/app-download-store";


export default function LandingPage() {
  return (
    <main style={{ background: "var(--m-bg)", color: "var(--m-ink)" }}>
      <LandingHero />
      <TrustStrip />
      <HowItWorksPreview />
      <SavingsSection />
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
    <section className="py-14 md:py-24" style={{ background: "var(--m-soft)" }}>
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
              className="grid gap-3.5 content-start"
              style={{
                background: "var(--m-bg-elev)",
                padding: "24px 22px",
                borderRadius: "var(--m-radius-md)",
                border: "1px solid var(--m-border)",
                minHeight: 220,
              }}
            >
              {/* Icon tile — the number lives subtly inside the title row */}
              <span
                className="grid place-items-center w-11 h-11"
                style={{
                  borderRadius: "var(--m-radius-sm)",
                  background: "color-mix(in oklch, var(--m-accent) 12%, transparent)",
                  color: "var(--m-accent)",
                }}
              >
                <s.Icon size={20} />
              </span>
              <h3 className="m-display text-[18px] leading-snug">
                <span style={{ color: "var(--m-muted)", fontWeight: 500 }}>
                  {s.n}.&nbsp;
                </span>
                {s.t}
              </h3>
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
    <section className="py-14 md:py-24">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 grid gap-10 md:gap-16 items-center grid-cols-1 md:[grid-template-columns:0.9fr_1.1fr]">
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
    <section className="py-14 md:py-24">
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
        <div className="grid gap-10 md:gap-14 items-start grid-cols-1 md:[grid-template-columns:1.1fr_0.9fr]">
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
                      <div style={{ fontWeight: 600 }}>Kitchen verified</div>
                      <div style={{ color: "var(--m-sub)" }}>
                        Every chef scanned before going live
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
      className="py-14 md:py-24"
      style={{ background: "var(--m-ink)", color: "var(--m-bg)" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <div className="grid gap-10 md:gap-16 items-start grid-cols-1 md:grid-cols-2">
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
    <section className="py-16 md:py-24" style={{ background: "var(--m-soft)" }}>
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 text-center grid gap-7 justify-items-center">
        <Eyebrow>Meal prep, made local.</Eyebrow>
        <h2
          className="m-display"
          style={{
            margin: 0,
            maxWidth: 900,
            fontSize: "clamp(32px, 7vw, 88px)",
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

const h2Style: React.CSSProperties = {
  margin: 0,
  // Lower min so it doesn't overflow tight phone screens.
  fontSize: "clamp(28px, 6.5vw, 72px)",
  lineHeight: 1.05,
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
