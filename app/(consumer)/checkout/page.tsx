"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Plus, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { chefMap, mealMap } from "@/lib/seed";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { CardBrandLogo } from "@/components/brand/card-brand";
import { EmptyState } from "@/components/states/empty-state";
import { useCart } from "@/lib/cart/store";
import { useAuth } from "@/lib/auth/store";
import { useLocation } from "@/lib/location/store";
import { usePlacedOrders } from "@/lib/orders/store";
import { brandLabel, usePaymentMethods } from "@/lib/payment/store";
import { computeOrderFees } from "@/lib/fees";
import { formatPrice, generateOrderId } from "@/lib/utils";
import type { Order, OrderItem } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const chefId = useCart((s) => s.chefId);
  const clear = useCart((s) => s.clear);
  const user = useAuth((s) => s.user);
  const signIn = useAuth((s) => s.signIn);
  const addOrder = usePlacedOrders((s) => s.add);

  const savedLoc = useLocation((s) => s.current);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState(savedLoc.full ?? "");
  const [pickupSlot, setPickupSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [allergyOK, setAllergyOK] = useState(false);
  const [placing, setPlacing] = useState(false);

  const chef = chefId ? chefMap[chefId] : null;

  if (items.length === 0 || !chef) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-10">
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="Your cart is empty"
          description="Add a meal first."
          action={
            <Link href="/browse" className={buttonVariants({})}>
              Browse meals
            </Link>
          }
        />
      </div>
    );
  }

  const subtotal = items.reduce(
    (sum, it) => sum + (mealMap[it.mealId]?.price ?? 0) * it.quantity,
    0,
  );
  const deliveryFee =
    fulfillment === "delivery" && chef.deliveryEnabled ? chef.deliveryFee ?? 0 : 0;
  const fees = computeOrderFees(subtotal, deliveryFee);

  const place = async () => {
    if (!allergyOK) {
      toast.error("Please confirm the allergy notice before placing.");
      return;
    }
    if (fulfillment === "delivery" && !address.trim()) {
      toast.error("Add a delivery address.");
      return;
    }
    if (!pickupSlot.trim()) {
      toast.error("Pick a time.");
      return;
    }

    setPlacing(true);

    // Make sure they're "signed in" — pop them into demo consumer if not.
    const u = user ?? signIn("consumer");

    const orderId = generateOrderId();
    const orderItems: OrderItem[] = items.map((it, idx) => {
      const m = mealMap[it.mealId];
      return {
        id: `oi-${orderId}-${idx}`,
        orderId,
        mealId: it.mealId,
        quantity: it.quantity,
        unitPrice: m?.price ?? 0,
        total: (m?.price ?? 0) * it.quantity,
        meal: m,
      };
    });

    const now = new Date().toISOString();
    const order: Order = {
      id: orderId,
      consumerId: u.id,
      chefId: chef.id,
      chef,
      status: "pending",
      fulfillmentType: fulfillment,
      pickupTime: pickupSlot,
      deliveryAddress: fulfillment === "delivery" ? address : undefined,
      items: orderItems,
      fees,
      allergyConfirmed: true,
      notes: notes || undefined,
      createdAt: now,
      updatedAt: now,
    };

    // Fake payment processing latency
    await new Promise((r) => setTimeout(r, 750));

    addOrder(order);
    clear();
    setPlacing(false);
    router.push(`/orders/${orderId}/confirmation`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-5 md:py-8 grid lg:grid-cols-[1fr_360px] gap-8">
      <section>
        <h1 className="m-display text-3xl md:text-4xl mb-6">Checkout</h1>

        {/* Fulfillment */}
        <div className="bg-white border border-border rounded-2xl p-5 mb-4">
          <Label>Fulfillment</Label>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {(
              [
                ["pickup", "Pickup", chef.pickupEnabled],
                ["delivery", "Delivery", chef.deliveryEnabled],
              ] as const
            ).map(([value, label, enabled]) => (
              <button
                key={value}
                disabled={!enabled}
                onClick={() => setFulfillment(value)}
                className={`h-14 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition ${
                  fulfillment === value
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-white text-ink hover:bg-soft"
                } ${!enabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {value === "delivery" && <Truck size={15} />}
                {label}
              </button>
            ))}
          </div>
          {fulfillment === "delivery" && (
            <div className="mt-4">
              <Label htmlFor="address">Delivery address</Label>
              <AddressAutocomplete
                id="address"
                value={address}
                onChange={setAddress}
                onSelect={(p) => setAddress(p.full)}
                placeholder="Start typing your address…"
                className="mt-1.5"
              />
            </div>
          )}
          <div className="mt-4">
            <Label htmlFor="slot">
              {fulfillment === "delivery" ? "Delivery slot" : "Pickup slot"}
            </Label>
            <Input
              id="slot"
              type="datetime-local"
              value={pickupSlot}
              onChange={(e) => setPickupSlot(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white border border-border rounded-2xl p-5 mb-4">
          <Label htmlFor="notes">Notes for the chef (optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Allergies, swaps, prep notes..."
            className="mt-1.5"
          />
        </div>

        {/* Payment */}
        <PaymentSection />

        {/* Allergy confirm */}
        <label className="flex items-start gap-3 bg-warn-soft border border-warn/20 rounded-2xl p-4 cursor-pointer">
          <input
            type="checkbox"
            checked={allergyOK}
            onChange={(e) => setAllergyOK(e.target.checked)}
            className="mt-1 accent-ink"
          />
          <div className="text-sm text-warn">
            <strong className="font-bold">Allergy notice.</strong> I've reviewed the
            allergen info on each meal in this order. Mealed protects orders against
            quality and safety issues — see <Link href="/safety" className="underline">trust & safety</Link>.
          </div>
        </label>
      </section>

      <aside className="lg:sticky lg:top-24 self-start">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="font-bold text-sm uppercase tracking-wider mb-3">
            Order summary
          </div>
          <div className="space-y-2 text-sm mb-4 max-h-48 overflow-y-auto">
            {items.map((it) => {
              const m = mealMap[it.mealId];
              if (!m) return null;
              return (
                <div key={it.mealId} className="flex justify-between gap-3">
                  <span className="text-sub truncate">
                    {it.quantity} × {m.name}
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(m.price * it.quantity)}
                  </span>
                </div>
              );
            })}
          </div>
          <dl className="space-y-2 text-sm border-t border-divider pt-3">
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
          <Button
            onClick={place}
            disabled={placing}
            size="lg"
            block
            className="mt-5"
          >
            {placing ? "Placing order…" : "Place order"} <Check size={16} />
          </Button>
        </div>
      </aside>
    </div>
  );
}

function PaymentSection() {
  const methods = usePaymentMethods((s) => s.methods);
  const setDefault = usePaymentMethods((s) => s.setDefault);
  const defaultCard = methods.find((m) => m.isDefault) ?? methods[0];

  return (
    <div className="bg-white border border-border rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <Label>Payment</Label>
        <Link
          href="/profile/payment"
          className="text-xs font-semibold text-ink hover:underline"
        >
          Manage cards
        </Link>
      </div>
      {defaultCard ? (
        <div className="space-y-2">
          {methods.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setDefault(m.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition text-left ${
                m.isDefault
                  ? "border-ink bg-soft"
                  : "border-border hover:bg-soft"
              }`}
            >
              <CardBrandLogo brand={m.brand} size="md" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold">
                  {brandLabel(m.brand)} •••• {m.last4}
                </div>
                <div className="text-xs text-muted">
                  {m.holder} · Expires {String(m.expMonth).padStart(2, "0")}/
                  {String(m.expYear).slice(-2)}
                </div>
              </div>
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  m.isDefault
                    ? "border-ink bg-ink"
                    : "border-border bg-white"
                }`}
              >
                {m.isDefault && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No saved cards yet.</p>
      )}
      <Link
        href="/profile/payment"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:underline"
      >
        <Plus size={14} /> Add a card
      </Link>
    </div>
  );
}
