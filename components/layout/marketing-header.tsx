"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/mascot";
import { Button } from "@/components/ui/button";
import { useAppDownload } from "@/lib/app-download-store";

const NAV = [
  ["How it works", "/how-it-works"],
  ["For chefs", "/become-a-chef"],
  ["Trust & safety", "/safety"],
] as const;

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const show = useAppDownload((s) => s.show);

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-divider">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-12 py-4">
        <Link href="/" className="flex items-center" aria-label="Mealed">
          <Wordmark size={22} />
        </Link>

        <nav className="hidden md:flex gap-7 text-[13px] font-semibold text-sub">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-ink transition">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" onClick={() => show()}>
            Get the app
          </Button>
        </div>

        <button
          className="md:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-divider bg-white px-5 py-3 space-y-1">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-3 rounded-lg hover:bg-soft text-[15px] font-semibold"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              size="sm"
              block
              onClick={() => {
                setOpen(false);
                show();
              }}
            >
              Get the app
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
