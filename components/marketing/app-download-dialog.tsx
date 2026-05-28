"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Mascot } from "@/components/brand/mascot";
import { useAppDownload } from "@/lib/app-download-store";

// Placeholder store URLs — swap with real ones when the app ships.
const APP_STORE_URL = "#app-store-coming-soon";
const PLAY_STORE_URL = "#play-store-coming-soon";

type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

/**
 * Self-contained "Get the app" modal. Hand-rolled instead of using the Radix
 * Dialog primitive so it survives any token / Tailwind churn — only a fixed
 * backdrop + a centered card. Mounted globally in the root layout.
 */
export function AppDownloadDialog() {
  const open = useAppDownload((s) => s.open);
  const context = useAppDownload((s) => s.context);
  const close = useAppDownload((s) => s.close);

  // Detect platform once for iOS-first ordering on iPhones / iPads.
  const [platform, setPlatform] = useState<Platform>("other");
  useEffect(() => setPlatform(detectPlatform()), []);

  // Lock body scroll while open + handle Escape to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  const iosFirst = platform !== "android";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get the Mealed app"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(20, 32, 26, 0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        padding: 20,
        animation: "fade-in 0.18s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--m-bg-elev)",
          borderRadius: "var(--m-radius-lg)",
          overflow: "hidden",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.45)",
          animation: "pop-in 0.22s cubic-bezier(.2,.9,.4,1.2)",
        }}
      >
        {/* Yellow hero */}
        <div
          style={{
            position: "relative",
            background: "var(--m-yolk)",
            padding: "32px 24px 28px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -64,
              right: -64,
              width: 192,
              height: 192,
              borderRadius: "50%",
              background: "var(--m-butter)",
              opacity: 0.6,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -48,
              left: -48,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "var(--m-yolk-soft)",
              opacity: 0.7,
            }}
          />

          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(20, 32, 26, 0.08)",
              color: "var(--m-ink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              border: 0,
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--m-yolk-soft)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,.06)",
                marginBottom: 16,
              }}
            >
              <Mascot size={56} />
            </div>
            <h2
              className="m-display"
              style={{
                margin: 0,
                fontSize: 24,
                letterSpacing: "-0.025em",
                color: "var(--m-ink)",
              }}
            >
              The full Mealed lives in the app.
            </h2>
            <p
              style={{
                margin: "8px auto 0",
                fontSize: 14,
                lineHeight: 1.5,
                color: "rgba(20, 32, 26, 0.7)",
                maxWidth: 320,
              }}
            >
              {context
                ? context
                : "Sign in, order from local chefs, chat, and track deliveries all from your phone."}
            </p>
          </div>
        </div>

        {/* CTA stack */}
        <div style={{ padding: "20px 24px 24px", background: "var(--m-bg-elev)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(iosFirst
              ? (["ios", "android"] as const)
              : (["android", "ios"] as const)
            ).map((p) =>
              p === "ios" ? <IosButton key="ios" /> : <AndroidButton key="android" />,
            )}
          </div>

          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontSize: 11,
              color: "var(--m-muted)",
            }}
          >
            <Check size={12} /> Coming to App Store &amp; Google Play soon
          </div>

          <button
            onClick={close}
            style={{
              display: "block",
              margin: "12px auto 0",
              padding: 4,
              fontSize: 12,
              color: "var(--m-sub)",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Maybe later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pop-in {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/** Bitten-apple silhouette used on App Store badge. */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Four-color Google Play triangular play-button logo. */
function GooglePlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <path
        fill="#00d2ff"
        d="M99 12.5c-7.5 4.4-12 11.7-12 19.6v447.8c0 7.9 4.5 15.2 12 19.6l244.1-243.3L99 12.5z"
      />
      <path
        fill="#00f076"
        d="M412.3 219.5L99 12.5c2.9-1.7 6.4-2.5 10.2-2.5 3.8 0 7.3.8 10.2 2.5l292.9 207z"
      />
      <path
        fill="#ff3a44"
        d="M412.3 292.5L119.4 499.5c-2.9 1.7-6.4 2.5-10.2 2.5-3.8 0-7.3-.8-10.2-2.5l313.3-207z"
      />
      <path
        fill="#ffce00"
        d="M412.3 292.5l-69.2-36.3 69.2-36.7c12.5 6.6 18.7 14 18.7 25.1 0 11.1-6.2 18.5-18.7 25.1z"
      />
    </svg>
  );
}

function IosButton() {
  return (
    <a
      href={APP_STORE_URL}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 56,
        borderRadius: 999,
        background: "var(--m-ink)",
        color: "#FFFFFF",
        padding: "0 20px",
        transition: "background 160ms",
        textDecoration: "none",
      }}
    >
      <AppleLogo className="h-6 w-6 shrink-0" />
      <div style={{ textAlign: "left", lineHeight: 1.1 }}>
        <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Download on the
        </div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>App Store</div>
      </div>
      <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        iOS
      </span>
    </a>
  );
}

function AndroidButton() {
  return (
    <a
      href={PLAY_STORE_URL}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 56,
        borderRadius: 999,
        border: "1px solid var(--m-ink)",
        color: "var(--m-ink)",
        padding: "0 20px",
        textDecoration: "none",
      }}
    >
      <GooglePlayLogo className="h-6 w-6 shrink-0" />
      <div style={{ textAlign: "left", lineHeight: 1.1 }}>
        <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Get it on
        </div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Google Play</div>
      </div>
      <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Android
      </span>
    </a>
  );
}
