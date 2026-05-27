"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/mascot";
import { LocationPicker } from "@/components/layout/location-picker";
import { HeaderSearch } from "@/components/layout/header-search";
import { Button } from "@/components/ui/button";
import { useAppDownload } from "@/lib/app-download-store";

export function AppHeader() {
  const show = useAppDownload((s) => s.show);

  return (
    <header className="bg-white border-b border-divider sticky top-0 z-30">
      {/* Desktop bar */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 lg:px-12 py-4 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Mealed">
            <Wordmark size={20} />
          </Link>
          <LocationPicker variant="desktop" />
        </div>
        <Suspense
          fallback={
            <div className="flex-1 max-w-xl h-11 rounded-full bg-soft border border-border" />
          }
        >
          <HeaderSearch variant="desktop" className="flex-1 max-w-xl" />
        </Suspense>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => show()}>
            Get the app
          </Button>
        </div>
      </div>

      {/* Mobile bar */}
      <div className="md:hidden px-4 pt-4 pb-3 bg-white">
        <div className="flex items-center justify-between mb-3">
          <LocationPicker variant="mobile" />
          <Button size="sm" onClick={() => show()}>
            Get the app
          </Button>
        </div>
        <Suspense
          fallback={<div className="h-11 rounded-full bg-soft border border-border" />}
        >
          <HeaderSearch variant="mobile" />
        </Suspense>
      </div>
    </header>
  );
}
