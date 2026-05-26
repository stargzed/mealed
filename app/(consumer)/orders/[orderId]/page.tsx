"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Check, MapPin, MessageCircle } from "lucide-react";
import { SEED_ORDERS, chefMap, mealMap } from "@/lib/seed";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { LeaveReviewCard } from "@/components/orders/leave-review-card";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/states/empty-state";
import { MealImage } from "@/components/brand/meal-image";
import { usePlacedOrders } from "@/lib/orders/store";
import { formatPrice, generatePickupCode } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const TIMELINE: OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready_for_pickup",
  "completed",
];

export default function OrderTrackingPage() {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const placed = usePlacedOrders((s) => s.byId(params.orderId ?? ""));
  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;

  let order: Order | undefined = placed;
  if (!order) {
    const seeded = SEED_ORDERS.find((o) => o.id === params.orderId);
    if (seeded) {
      order = {
        ...seeded,
        chef: chefMap[seeded.chefId],
        items: seeded.items.map((i) => ({ ...i, meal: mealMap[i.mealId] })),
      };
    }
  }

  if (!order) {
    return (
      <div className="m-6">
        <EmptyState
          title="Order not found"
          action={
            <button onClick={() => router.push("/orders")} className={buttonVariants({})}>
              Back to orders
            </button>
          }
        />
      </div>
    );
  }

  const currentIdx = TIMELINE.indexOf(order.status);
  const code = generatePickupCode(order.id);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <Link href="/orders" className="text-xs text-muted hover:text-ink">
        ← All orders
      </Link>

      <div className="flex items-center justify-between gap-3 mt-3">
        <div>
          <h1 className="m-display text-2xl md:text-3xl">Order details</h1>
          <div className="m-mono text-xs text-muted mt-1">{code}</div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Status timeline */}
      <div className="bg-white border border-border rounded-2xl p-5 mt-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-4">
          Status
        </div>
        <ol className="space-y-3">
          {TIMELINE.map((s, idx) => {
            const reached = idx <= currentIdx;
            return (
              <li key={s} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    reached ? "bg-accent text-white" : "bg-soft text-muted"
                  }`}
                >
                  {reached ? <Check size={13} strokeWidth={3} /> : idx + 1}
                </span>
                <span
                  className={`text-sm ${reached ? "text-ink font-semibold" : "text-muted"}`}
                >
                  {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Chef + details */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
            Chef
          </div>
          <div className="font-bold">{order.chef?.displayName}</div>
          <div className="text-xs text-muted mt-0.5">
            {order.chef?.neighborhood}
          </div>
          <Link
            href={`/messages?chef=${order.chefId}`}
            className={buttonVariants({ variant: "secondary", size: "sm", className: "mt-4" })}
          >
            <MessageCircle size={13} /> Message chef
          </Link>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
            {order.fulfillmentType === "delivery" ? "Delivery" : "Pickup"}
          </div>
          <div className="text-sm font-semibold">
            {order.pickupTime
              ? new Date(order.pickupTime).toLocaleString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "—"}
          </div>
          {order.deliveryAddress && (
            <div className="text-xs text-muted mt-1.5 flex items-start gap-1">
              <MapPin size={11} className="mt-0.5" />
              {order.deliveryAddress}
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white border border-border rounded-2xl p-5 mt-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
          Items
        </div>
        <div className="space-y-3">
          {order.items.map((it) => (
            <div key={it.id} className="flex gap-3 items-center">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                {it.meal && <MealImage meal={it.meal} label={false} />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">{it.meal?.name ?? "Meal"}</div>
                <div className="text-xs text-muted">
                  {it.quantity} × {formatPrice(it.unitPrice)}
                </div>
              </div>
              <div className="text-sm font-bold tabular-nums">
                {formatPrice(it.total)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div className="bg-surface border border-border rounded-2xl p-5 mt-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-sub">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.fees.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sub">Service fee</dt>
            <dd className="tabular-nums">{formatPrice(order.fees.serviceFee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sub">Mealed protection</dt>
            <dd className="tabular-nums">{formatPrice(order.fees.protectionFee)}</dd>
          </div>
          {order.fees.deliveryFee > 0 && (
            <div className="flex justify-between">
              <dt className="text-sub">Delivery</dt>
              <dd className="tabular-nums">{formatPrice(order.fees.deliveryFee)}</dd>
            </div>
          )}
          <div className="border-t border-divider pt-3 flex justify-between font-bold text-base">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatPrice(order.fees.total)}</dd>
          </div>
        </dl>
      </div>

      {order.status === "completed" && (
        <div className="mt-4">
          <LeaveReviewCard order={order} />
        </div>
      )}
    </div>
  );
}
