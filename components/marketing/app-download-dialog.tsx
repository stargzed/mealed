"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
 * Modal shown when a visitor hits any "account-only" action on the marketing
 * site (Find meals, Add to cart, Sign in, etc.). The site itself is browse-only
 * — every transactional flow lives in the iOS / Android app, so this dialog
 * funnels users toward the store links.
 */
export function AppDownloadDialog() {
  const open = useAppDownload((s) => s.open);
  const context = useAppDownload((s) => s.context);
  const close = useAppDownload((s) => s.close);

  // Detect platform once on mount so the matching CTA pops to the top on phones.
  const [platform, setPlatform] = useState<Platform>("other");
  useEffect(() => setPlatform(detectPlatform()), []);

  const iosFirst = platform !== "android"; // iOS gets pole position by default

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0 border-0">
        <DialogTitle className="sr-only">Get the Mealed app</DialogTitle>
        <DialogDescription className="sr-only">
          Download the Mealed mobile app to order meals from local chefs.
        </DialogDescription>

        {/* Yellow hero */}
        <div className="relative bg-yolk px-6 pt-8 pb-7 text-center overflow-hidden">
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-butter opacity-60"
            aria-hidden
          />
          <div
            className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-yolk-soft opacity-70"
            aria-hidden
          />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yolk-soft shadow-inner mx-auto mb-4">
              <Mascot size={56} />
            </div>
            <h2 className="m-display text-2xl tracking-tightest">
              The full Mealed lives in the app.
            </h2>
            <p className="text-sm text-ink/70 mt-2 leading-relaxed max-w-[320px] mx-auto">
              {context
                ? context
                : "Sign in, order from local chefs, chat, and track deliveries — all from your phone."}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="px-6 py-5 bg-white">
          <div className="flex flex-col gap-2.5">
            {(iosFirst ? (["ios", "android"] as const) : (["android", "ios"] as const)).map(
              (p) => (p === "ios" ? <IosButton key="ios" /> : <AndroidButton key="android" />),
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <Check size={12} /> Coming to App Store & Google Play soon
          </div>

          <button
            onClick={close}
            className="block mx-auto mt-3 text-xs text-sub hover:text-ink underline-offset-2 hover:underline"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Bitten-apple logo path — official Apple silhouette used on App Store badge. */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      className={className}
      fill="currentColor"
      aria-hidden
    >
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
        fill="#0099ff"
        d="M99 12.5l244.1 243.7L99 499.5c-2.9-1.7-5.4-4-7.3-6.9 1.9 2.9 4.4 5.2 7.3 6.9z"
        opacity="0"
      />
      <path
        fill="#ffce00"
        d="M412.3 219.5L343.1 256.2l69.2 36.7c12.5 6.6 18.7 14 18.7 25.1 0 11.1-6.2 18.5-18.7 25.1L99 500c-2.9-1.7-5.4-4-7.3-6.9 1.9 2.9 4.4 5.2 7.3 6.9l313.3-167c12.5-6.6 18.7-14 18.7-25.1 0-11.1-6.2-18.5-18.7-25.1l-69.2-36.7 69.2-36.7c12.5-6.6 18.7-14 18.7-25.1 0-11.1-6.2-18.5-18.7-25.1L99 12c2.9-1.7 5.4-4 7.3-6.9 0 0 0 0 0 0L412.3 219.5z"
        opacity="0"
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
      className="group flex items-center gap-3 h-14 rounded-full bg-ink text-white px-5 transition hover:bg-dark"
    >
      <AppleLogo className="h-6 w-6 shrink-0 -mt-0.5" />
      <div className="text-left leading-tight">
        <div className="text-[10px] uppercase tracking-wider opacity-70">
          Download on the
        </div>
        <div className="text-base font-bold">App Store</div>
      </div>
      <span className="ml-auto text-[10px] uppercase tracking-wide opacity-60">
        iOS
      </span>
    </a>
  );
}

function AndroidButton() {
  return (
    <a
      href={PLAY_STORE_URL}
      className="group flex items-center gap-3 h-14 rounded-full border border-ink text-ink px-5 transition hover:bg-soft"
    >
      <GooglePlayLogo className="h-6 w-6 shrink-0" />
      <div className="text-left leading-tight">
        <div className="text-[10px] uppercase tracking-wider opacity-60">
          Get it on
        </div>
        <div className="text-base font-bold">Google Play</div>
      </div>
      <span className="ml-auto text-[10px] uppercase tracking-wide opacity-60">
        Android
      </span>
    </a>
  );
}
