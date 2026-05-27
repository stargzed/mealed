"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDownload } from "@/lib/app-download-store";

/**
 * Hero search bar on the landing page. The query field is purely cosmetic now —
 * any submission opens the "Get the app" dialog instead of navigating to
 * results, because ordering and personalization live in the mobile app.
 */
export function LandingHeroSearch() {
  const [q, setQ] = useState("");
  const show = useAppDownload((s) => s.show);

  const open = () =>
    show(
      q.trim()
        ? `Looking for "${q.trim()}"? Order it from the Mealed app.`
        : undefined,
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        open();
      }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-[480px] mt-7 p-1.5 rounded-full border border-border bg-white shadow-soft"
    >
      <div className="hidden sm:flex items-center gap-2 px-3 text-muted">
        <MapPin size={16} />
        <span className="text-sm text-ink font-semibold">Echo Park, LA</span>
      </div>
      <div className="hidden sm:block w-px self-stretch bg-divider my-1.5" />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search high-protein, vegan, family…"
        className="flex-1 h-10 px-3 sm:px-1.5 bg-transparent outline-none text-[15px]"
      />
      <Button type="submit" className="h-10">
        Find meals
      </Button>
    </form>
  );
}
