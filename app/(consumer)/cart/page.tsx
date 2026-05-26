"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { chefMap, mealMap } from "@/lib/seed";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { MealImage } from "@/components/brand/meal-image";
import { EmptyState } from "@/components/states/empty-state";
import { useCart } from "@/lib/cart/store";
import { formatPrice } from "@/lib/utils";
import { computeOrderFees } from "@/lib/fees";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const chefId = useCart((s) => s.chefId);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  const chef = chefId ? chefMap[chefId] : null;
  const subtotal = items.reduce((sum, it) => {
    const m = mealMap[it.mealId];
    return sum + (m?.price ?? 0) * it.quantity;
  }, 0);
  const deliveryFee = chef?.deliveryEnabled ? chef.deliveryFee ?? 0 : 0;
  const fees = computeOrderFees(subtotal, deliveryFee);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-10">
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="Your cart is empty"
          description="Browse meals to start a weekly prep order."
          action={
            <Link href="/browse" className={buttonVariants({})}>
              Browse meals
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-5 md:py-8 grid lg:grid-cols-[1fr_360px] gap-8">
      <section>
        <h1 className="m-display text-3xl md:text-4xl mb-5">Your cart</h1>
        {chef && (
          <Link
            href={`/chefs/${chef.id}`}
            className="flex items-center gap-3 p-3 -mx-3 rounded-xl hover:bg-soft mb-4"
          >
            <ChefAvatar chef={chef} size={40} />
            <div>
              <div className="text-sm font-bold">{chef.displayName}</div>
              <div className="text-xs text-muted">
                {chef.neighborhood}
                {chef.deliveryEnabled && chef.deliveryFee != null && (
                  <> · Delivery {formatPrice(chef.deliveryFee)}</>
                )}
              </div>
            </div>
          </Link>
        )}
        <div className="border border-border rounded-2xl divide-y divide-divider overflow-hidden bg-white">
          {items.map((it) => {
            const m = mealMap[it.mealId];
            if (!m) return null;
            return (
              <div key={it.mealId} className="p-4 flex gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <MealImage meal={m} label={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{m.name}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {formatPrice(m.price)} each
                  </div>
                  <div className="inline-flex items-center mt-2 border border-border rounded-full overflow-hidden">
                    <button
                      onClick={() => setQty(it.mealId, it.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-soft"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 text-sm font-bold tabular-nums w-7 text-center">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() => setQty(it.mealId, it.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-soft"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold tabular-nums">
                    {formatPrice(m.price * it.quantity)}
                  </div>
                  <button
                    onClick={() => removeItem(it.mealId)}
                    className="text-tomato hover:bg-tomato-soft p-1.5 rounded-md mt-2"
                    aria-label="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={clear}
          className="text-xs text-muted hover:text-tomato mt-4"
        >
          Clear cart
        </button>
      </section>

      <aside className="lg:sticky lg:top-24 self-start">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="font-bold text-sm uppercase tracking-wider mb-3">
            Summary
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-sub">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(fees.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sub">Service fee</dt>
              <dd className="tabular-nums">{formatPrice(fees.serviceFee)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sub">Mealed protection</dt>
              <dd className="tabular-nums">{formatPrice(fees.protectionFee)}</dd>
            </div>
            {fees.deliveryFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-sub">Delivery</dt>
                <dd className="tabular-nums">{formatPrice(fees.deliveryFee)}</dd>
              </div>
            )}
            <div className="border-t border-divider pt-3 flex justify-between font-bold text-base">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(fees.total)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className={buttonVariants({ size: "lg", block: true, className: "mt-5" })}>
            Continue to checkout
          </Link>
          <p className="text-[11px] text-muted mt-3 leading-relaxed">
            The protection fee covers refunds for quality or safety issues. Payouts
            to your chef are released 24 hours after a completed order.
          </p>
        </div>
      </aside>
    </div>
  );
}
