"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Wordmark } from "@/components/brand/mascot";
import { LocationPicker } from "@/components/layout/location-picker";
import { HeaderSearch } from "@/components/layout/header-search";
import { NotificationsBell } from "@/components/layout/notifications-bell";
import { UserDropdown } from "@/components/layout/user-dropdown";
import { useCart } from "@/lib/cart/store";

export function AppHeader() {
  const router = useRouter();
  const totalQty = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header className="bg-white border-b border-divider sticky top-0 z-30">
      {/* Desktop bar */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 lg:px-12 py-4 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/home" aria-label="Mealed">
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
          <NotificationsBell size="md" />
          <button
            onClick={() => router.push(totalQty > 0 ? "/cart" : "/browse")}
            className="relative w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-soft"
            aria-label="Cart"
          >
            <ShoppingCart size={17} />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {totalQty}
              </span>
            )}
          </button>
          <UserDropdown size={40} />
        </div>
      </div>

      {/* Mobile bar */}
      <div className="md:hidden px-4 pt-4 pb-3 bg-white">
        <div className="flex items-center justify-between mb-3">
          <LocationPicker variant="mobile" />
          <div className="flex gap-2">
            <NotificationsBell size="sm" />
            <button
              onClick={() => router.push(totalQty > 0 ? "/cart" : "/browse")}
              className="relative w-9 h-9 rounded-full border border-border flex items-center justify-center"
              aria-label="Cart"
            >
              <ShoppingCart size={17} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
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
