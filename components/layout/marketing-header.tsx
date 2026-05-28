"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/mascot";
import { useAppDownload } from "@/lib/app-download-store";

const NAV = [
  ["Home", "/"],
  ["How it works", "/how-it-works"],
  ["About", "/about"],
  ["For chefs", "/become-a-chef"],
  ["Trust & safety", "/safety"],
] as const;

/**
 * Mealed 3.0 marketing header. Glassy sticky nav with the lowercase wordmark,
 * a horizontal link row, and a single ink "Get the app" CTA on the right.
 */
export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const show = useAppDownload((s) => s.show);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in oklch, var(--m-bg-elev) 88%, transparent)",
        borderColor: "var(--m-border)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center" aria-label="Mealed">
          <Wordmark size={22} />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 text-sm rounded-full transition-colors"
              style={{ color: "var(--m-sub)", fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--m-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--m-sub)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => show()}
            className="inline-flex items-center px-3.5 py-1.5 text-[13.5px] rounded-md transition"
            style={{
              background: "var(--m-ink)",
              color: "var(--m-bg-elev)",
              fontWeight: 500,
            }}
          >
            Get the app
          </button>
        </div>

        <button
          className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center"
          style={{ borderColor: "var(--m-border)" }}
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t px-5 py-3 space-y-1"
          style={{ borderColor: "var(--m-border)", background: "var(--m-bg-elev)" }}
        >
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-3 rounded-lg text-[15px] font-medium"
              onClick={() => setOpen(false)}
              style={{ color: "var(--m-ink)" }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              show();
            }}
            className="block w-full text-left px-3 py-3 rounded-lg text-[15px] font-semibold"
            style={{ background: "var(--m-ink)", color: "var(--m-bg-elev)" }}
          >
            Get the app
          </button>
        </div>
      )}
    </header>
  );
}
