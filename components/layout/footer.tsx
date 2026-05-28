"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import { Wordmark } from "@/components/brand/mascot";
import { useAppDownload } from "@/lib/app-download-store";

const SOCIALS: Array<[typeof Instagram, string, string]> = [
  [Instagram, "Instagram", "https://instagram.com/mealedorg"],
  [Twitter, "Twitter / X", "https://x.com/mealedorg"],
];

/**
 * Minimal footer for the landing-only marketing site. Brand on the left,
 * single "Get the app" CTA, socials, and legal links. No fake feature
 * navigation columns since the marketplace lives in the mobile app.
 */
export function Footer() {
  const show = useAppDownload((s) => s.show);
  return (
    <footer
      className="border-t mt-16"
      style={{ borderColor: "var(--m-border)", color: "var(--m-ink)" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 py-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start md:items-center">
          <div className="grid gap-3 max-w-md">
            <Wordmark size={22} />
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--m-sub)" }}>
              Home-cooked meal prep from trusted local chefs. The full Mealed
              experience lives in the app.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => show()}
              className="inline-flex items-center px-5 py-2.5 rounded-full font-semibold text-[14px] transition hover:opacity-90"
              style={{ background: "var(--m-ink)", color: "var(--m-bg-elev)" }}
            >
              Get the app
            </button>
            {SOCIALS.map(([Icon, label, href]) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition hover:bg-[color-mix(in_oklch,var(--m-soft)_60%,transparent)]"
                style={{
                  borderColor: "var(--m-line-2)",
                  color: "var(--m-sub)",
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[13px]"
          style={{ borderColor: "var(--m-border)", color: "var(--m-muted)" }}
        >
          <span>
            © {new Date().getFullYear()} Mealed, Inc. Cooked with care in Los Angeles.
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about">About</Link>
            <Link href="/safety">Trust &amp; safety</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
