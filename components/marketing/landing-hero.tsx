"use client";

import { useState } from "react";
import { MapPin, Check, ArrowRight, Star } from "lucide-react";
import { useAppDownload } from "@/lib/app-download-store";

/**
 * Mealed 3.0 hero. Dark forest-green background with a layered photo
 * composition on the right (main meal photo + floating order chip +
 * floating chef chip + small "Now in LA" tag). The location finder and
 * "Find meals" button both funnel into the app-download dialog because
 * actual ordering lives in the mobile app.
 */
export function LandingHero() {
  const [zip, setZip] = useState("Echo Park, LA");
  const show = useAppDownload((s) => s.show);

  const openWith = () =>
    show(
      zip.trim()
        ? `Find chefs near ${zip.trim()} in the Mealed app.`
        : "Find verified chefs near you in the Mealed app.",
    );

  return (
    <section
      className="pt-10 pb-16 md:pt-14 md:pb-24 border-b overflow-hidden relative"
      style={{
        background: "var(--m-hero-bg)",
        color: "var(--m-hero-ink)",
        borderColor: "var(--m-border)",
      }}
    >
      <div
        className="max-w-[1320px] mx-auto px-5 md:px-8"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="grid items-center gap-10 lg:gap-14 grid-cols-1 md:[grid-template-columns:1.05fr_0.95fr]">
          {/* Left: copy + finder */}
          <div className="grid gap-6 md:gap-8 min-w-0">
            <div className="inline-flex items-center gap-2.5 self-start">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
                style={{
                  background: "color-mix(in oklch, var(--m-hero-ink) 12%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--m-hero-ink) 18%, transparent)",
                  color: "var(--m-hero-ink)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--m-orange)",
                  }}
                />
                Verified local chefs · Los Angeles
              </span>
            </div>

            <h1
              className="m-display"
              style={{
                margin: 0,
                color: "var(--m-hero-ink)",
                // Lower min on mobile so it doesn't overflow narrow screens.
                fontSize: "clamp(40px, 9vw, 104px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
              }}
            >
              Meal prep,
              <br />
              <span style={{ color: "var(--m-orange)" }}>made local.</span>
            </h1>

            <p
              className="text-[17px] md:text-[21px]"
              style={{
                margin: 0,
                color: "color-mix(in oklch, var(--m-hero-ink) 78%, transparent)",
                lineHeight: 1.45,
                maxWidth: 540,
              }}
            >
              Home-cooked weekly meals from verified chefs in your
              neighborhood. Pickup or delivery, custom plans, real reviews. No
              frozen, no shipped, no compromise.
            </p>

            {/* Location finder */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                openWith();
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 8,
                padding: 8,
                borderRadius: "var(--m-radius-pill)",
                background: "color-mix(in oklch, var(--m-hero-ink) 8%, transparent)",
                border: "1px solid color-mix(in oklch, var(--m-hero-ink) 14%, transparent)",
                maxWidth: 540,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  paddingLeft: 16,
                }}
              >
                <MapPin size={18} style={{ color: "var(--m-orange)" }} />
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="Enter your neighborhood or ZIP"
                  style={{
                    border: 0,
                    outline: 0,
                    background: "transparent",
                    color: "var(--m-hero-ink)",
                    fontSize: 16,
                    padding: "12px 0",
                    width: "100%",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-[15px] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "var(--m-orange)",
                  color: "#14110C",
                }}
              >
                Find meals
                <ArrowRight size={16} />
              </button>
            </form>

            <div
              className="flex flex-wrap gap-x-6 gap-y-2"
              style={{
                color: "color-mix(in oklch, var(--m-hero-ink) 78%, transparent)",
                fontSize: 14,
              }}
            >
              {["Verified chefs only", "Kitchen reviewed", "Same-week pickup"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <Check size={16} style={{ color: "var(--m-orange)" }} />
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right: photo composition */}
          <HeroComposition />
        </div>
      </div>

      {/* Subtle radial accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 60% at 80% 20%, color-mix(in oklch, var(--m-orange) 14%, transparent) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </section>
  );
}

function HeroComposition() {
  return (
    <div style={{ position: "relative", height: 560 }} className="hidden md:block">
      {/* Main meal photo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "82%",
          aspectRatio: "4/5",
          borderRadius: "var(--m-radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--m-shadow-lg)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80"
          alt="Salmon meal prep"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Floating order chip (bottom-left) */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          background: "var(--m-bg-elev)",
          color: "var(--m-ink)",
          padding: "16px 18px",
          borderRadius: "var(--m-radius-md)",
          boxShadow: "var(--m-shadow-lg)",
          width: 280,
          display: "grid",
          gap: 10,
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] uppercase"
            style={{
              letterSpacing: "0.12em",
              color: "var(--m-muted)",
              fontWeight: 500,
            }}
          >
            Order confirmed
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: "var(--m-accent)",
              color: "var(--m-hero-ink)",
              letterSpacing: "0.05em",
            }}
          >
            PICKUP
          </span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>5 meals · Chef Maya</div>
        <div
          className="flex items-center justify-between"
          style={{ color: "var(--m-sub)", fontSize: 13 }}
        >
          <span>Sun · 5:30 PM</span>
          <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 12 }}>
            MEAL-102938
          </span>
        </div>
        <div style={{ height: 1, background: "var(--m-border)" }} />
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 13, color: "var(--m-sub)" }}>Total</span>
          <span style={{ fontWeight: 600 }}>$57.71</span>
        </div>
      </div>

      {/* Floating chef chip (top-left) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: -20,
          background: "var(--m-bg-elev)",
          color: "var(--m-ink)",
          padding: "12px 16px 12px 12px",
          borderRadius: "var(--m-radius-pill)",
          boxShadow: "var(--m-shadow)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid var(--m-bg-elev)",
            flex: "0 0 40px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&h=120&fit=crop&crop=faces"
            alt="Chef Maya"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </span>
        <div className="grid">
          <span style={{ fontWeight: 600, fontSize: 14 }}>
            Chef Maya · just delivered
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[12px]"
            style={{ color: "var(--m-muted)" }}
          >
            <Star size={11} style={{ color: "var(--m-orange)", fill: "var(--m-orange)" }} />
            Top-rated this week
          </span>
        </div>
      </div>

      {/* Live tag (bottom-right) */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 30,
          background: "var(--m-orange)",
          color: "#14110C",
          padding: "10px 14px",
          borderRadius: "var(--m-radius-pill)",
          fontWeight: 600,
          fontSize: 13,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "var(--m-shadow)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#14110C",
            animation: "pulse 1.6s infinite",
          }}
        />
        Now in Los Angeles
      </div>
    </div>
  );
}
