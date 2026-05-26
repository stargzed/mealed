"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { chefMap, mealMap } from "@/lib/seed";
import { useCart } from "@/lib/cart/store";
import { computeOrderFees } from "@/lib/fees";
import { formatPrice } from "@/lib/utils";

const HIDDEN_ON = ["/cart", "/checkout"];

export function MobileCartBar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? "";
  const items = useCart((s) => s.items);
  const chefId = useCart((s) => s.chefId);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (items.length === 0) return null;
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const chef = chefId ? chefMap[chefId] : null;
  const subtotal = items.reduce(
    (s, it) => s + (mealMap[it.mealId]?.price ?? 0) * it.quantity,
    0,
  );
  const fees = computeOrderFees(subtotal);
  const qty = items.reduce((s, it) => s + it.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-[76px] left-0 right-0 z-30 px-3 pb-1 pointer-events-none">
      <Link
        href="/cart"
        className="pointer-events-auto flex items-center justify-between gap-3 bg-ink text-white rounded-2xl shadow-lg px-4 h-14 transition-transform active:scale-[.98]"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <ShoppingCart size={18} />
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-ink">
              {qty}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-white/60 font-bold">
              From {chef?.displayName ?? "your chef"}
            </div>
            <div className="text-sm font-bold truncate">
              {qty} {qty === 1 ? "meal" : "meals"} ·{" "}
              <span className="tabular-nums">{formatPrice(fees.subtotal)}</span>
            </div>
          </div>
        </div>
        <span className="bg-white text-ink rounded-full h-9 px-3.5 text-xs font-bold inline-flex items-center gap-1.5">
          View cart →
        </span>
      </Link>
    </div>
  );
}
