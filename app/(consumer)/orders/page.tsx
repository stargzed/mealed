"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ChefHat, Receipt } from "lucide-react";
import { SEED_ORDERS, chefMap, mealMap } from "@/lib/seed";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/states/empty-state";
import { usePlacedOrders } from "@/lib/orders/store";
import { formatPrice, formatRelative, generatePickupCode } from "@/lib/utils";
import type { Order } from "@/lib/types";

export default function OrdersPage() {
 const [hydrated, setHydrated] = useState(false);
 const placed = usePlacedOrders((s) => s.placed);
 useEffect(() => setHydrated(true), []);

 const all = useMemo(() => {
  const seeded: Order[] = SEED_ORDERS.map((o) => ({
   ...o,
   chef: chefMap[o.chefId],
   items: o.items.map((i) => ({ ...i, meal: mealMap[i.mealId] })),
  }));
  return [...placed, ...seeded];
 }, [placed]);

 if (!hydrated) return null;

 if (all.length === 0) {
  return (
   <div className="m-6">
    <EmptyState
     icon={<Receipt size={20} />}
     title="No orders yet"
     description="Once you place an order, it'll show up here."
     action={
      <Link href="/browse" className={buttonVariants({})}>
       Browse meals
      </Link>
     }
    />
   </div>
  );
 }

 const active = all.filter((o) =>
  !["completed", "cancelled", "refunded"].includes(o.status),
 );
 const past = all.filter((o) =>
  ["completed", "cancelled", "refunded"].includes(o.status),
 );

 return (
  <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
   <h1 className="m-display text-3xl md:text-4xl mb-6">Orders</h1>

   {active.length > 0 && (
    <section className="mb-8">
     <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
      Active
     </h2>
     <div className="space-y-3">
      {active.map((o) => (
       <OrderRow key={o.id} order={o} />
      ))}
     </div>
    </section>
   )}

   {past.length > 0 && (
    <section>
     <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
      Past
     </h2>
     <div className="space-y-3">
      {past.map((o) => (
       <OrderRow key={o.id} order={o} />
      ))}
     </div>
    </section>
   )}
  </div>
 );
}

function OrderRow({ order }: { order: Order }) {
 const item0 = order.items[0];
 const more = order.items.length > 1 ? ` + ${order.items.length - 1} more` : "";
 return (
  <Link
   href={`/orders/${order.id}`}
   className="block bg-white border border-border rounded-2xl p-4 hover:shadow transition"
  >
   <div className="flex items-center justify-between gap-3 mb-3">
    <div className="flex items-center gap-2">
     <span className="w-8 h-8 rounded-full bg-soft flex items-center justify-center">
      <ChefHat size={15} />
     </span>
     <div>
      <div className="text-sm font-bold">{order.chef?.displayName}</div>
      <div className="m-mono text-[11px] text-muted">
       {generatePickupCode(order.id)}
      </div>
     </div>
    </div>
    <OrderStatusBadge status={order.status} />
   </div>
   <div className="flex items-center justify-between gap-3 text-sm">
    <div className="text-sub truncate flex-1">
     {item0
      ? `${item0.quantity} × ${item0.meal?.name ?? "Meal"}${more}`
      : " "}
    </div>
    <div className="text-right">
     <div className="font-bold tabular-nums">
      {formatPrice(order.fees.total)}
     </div>
     <div className="text-[11px] text-muted">
      {formatRelative(order.createdAt)}
     </div>
    </div>
   </div>
  </Link>
 );
}
