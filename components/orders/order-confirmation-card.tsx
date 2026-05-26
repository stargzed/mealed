"use client";

import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import type { Order } from "@/lib/types";
import { Confetti } from "@/components/states/confetti";
import { buttonVariants } from "@/components/ui/button";
import { CardBrandLogo } from "@/components/brand/card-brand";
import { brandLabel, usePaymentMethods } from "@/lib/payment/store";
import { formatPrice, generatePickupCode } from "@/lib/utils";

interface Props {
  order: Order;
}

export function OrderConfirmationCard({ order }: Props) {
  const defaultCard = usePaymentMethods(
    (s) => s.methods.find((m) => m.isDefault) ?? s.methods[0],
  );
  const code = generatePickupCode(order.id);
  const chefName = order.chef?.displayName ?? "your chef";
  return (
    <div className="relative max-w-xl mx-auto rounded-[var(--m-radius-lg)] border border-border bg-white overflow-hidden shadow-lg">
      <Confetti />
      <div className="p-8 md:p-10 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-accent-soft text-accent-deep flex items-center justify-center">
          <Check size={26} strokeWidth={3} />
        </div>
        <h1 className="m-display text-3xl md:text-4xl mt-5">Order confirmed!</h1>
        <p className="text-sub mt-2 max-w-md mx-auto">
          Your meal prep order has been sent to {chefName}.
        </p>

        <div className="m-mono text-xs text-muted mt-6">{code}</div>
        <div className="mt-1 text-sm font-bold">
          {chefName} ·{" "}
          {order.fulfillmentType === "pickup" ? "Pickup" : "Delivery"}{" "}
          {order.pickupTime
            ? `· ${new Date(order.pickupTime).toLocaleString([], {
                weekday: "short",
                hour: "numeric",
                minute: "2-digit",
              })}`
            : ""}
        </div>

        <div className="bg-soft rounded-2xl p-5 mt-6 inline-flex flex-col items-center">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Total paid
          </div>
          <div className="m-display text-3xl mt-1">
            {formatPrice(order.fees.total)}
          </div>
          {defaultCard ? (
            <div className="flex items-center gap-2 mt-2">
              <CardBrandLogo brand={defaultCard.brand} size="sm" />
              <span className="text-xs text-sub font-semibold">
                {brandLabel(defaultCard.brand)} •••• {defaultCard.last4}
              </span>
            </div>
          ) : (
            <div className="text-xs text-muted mt-1">Demo card</div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-7">
          <Link
            href={`/orders/${order.id}`}
            className={buttonVariants({ size: "sm", className: "!h-10" })}
          >
            Track order <ArrowRight size={14} />
          </Link>
          <Link
            href={`/messages?order=${order.id}`}
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "!h-10",
            })}
          >
            <MessageCircle size={13} /> Message chef
          </Link>
          <Link
            href="/home"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "!h-10",
            })}
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
