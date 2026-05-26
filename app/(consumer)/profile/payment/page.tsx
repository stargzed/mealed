"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardBrandLogo } from "@/components/brand/card-brand";
import {
  brandLabel,
  detectBrand,
  usePaymentMethods,
  type PaymentMethod,
} from "@/lib/payment/store";

const schema = z.object({
  pan: z
    .string()
    .min(13)
    .max(23)
    .refine((v) => v.replace(/\D/g, "").length >= 13, "Invalid card number"),
  holder: z.string().min(2, "Name on card is required"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\s*\/\s*\d{2,4}$/, "MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
});
type FormData = z.infer<typeof schema>;

export default function PaymentMethodsPage() {
  const [hydrated, setHydrated] = useState(false);
  const methods = usePaymentMethods((s) => s.methods);
  const addMethod = usePaymentMethods((s) => s.add);
  const removeMethod = usePaymentMethods((s) => s.remove);
  const setDefault = usePaymentMethods((s) => s.setDefault);
  const [adding, setAdding] = useState(false);

  useEffect(() => setHydrated(true), []);

  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  if (!hydrated) return null;

  const onSubmit = (d: FormData) => {
    const cleaned = d.pan.replace(/\D/g, "");
    const last4 = cleaned.slice(-4);
    const [mm, yy] = d.expiry.split("/").map((s) => s.trim());
    const year = yy.length === 2 ? 2000 + Number(yy) : Number(yy);
    addMethod({
      brand: detectBrand(cleaned),
      last4,
      expMonth: Number(mm),
      expYear: year,
      holder: d.holder,
    });
    form.reset();
    setAdding(false);
    toast.success("Card saved");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <Link
        href="/profile"
        className="text-xs text-muted hover:text-ink"
      >
        ← Profile
      </Link>
      <h1 className="m-display text-3xl md:text-4xl mt-2">Payment methods</h1>
      <p className="text-sub text-sm mt-2">
        Saved cards live in your browser for now. Wired to{" "}
        <span className="font-semibold">Stripe Payment Element</span> in
        production.
      </p>

      <div className="bg-accent-soft border border-accent/20 rounded-2xl p-4 mt-6 flex items-start gap-3 text-sm">
        <ShieldCheck size={18} className="text-accent-deep shrink-0 mt-0.5" />
        <div className="text-accent-deep">
          Demo mode: no real card data is processed. Try test PAN{" "}
          <code className="m-mono bg-white/60 px-1.5 py-0.5 rounded">4242 4242 4242 4242</code>.
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {methods.length === 0 ? (
          <div className="bg-white border border-dashed border-border rounded-2xl p-8 text-center text-sm text-muted">
            No saved cards yet.
          </div>
        ) : (
          methods.map((m) => (
            <CardRow
              key={m.id}
              card={m}
              onRemove={() => {
                removeMethod(m.id);
                toast(`Removed ${brandLabel(m.brand)} ending ${m.last4}`);
              }}
              onSetDefault={() => {
                setDefault(m.id);
                toast.success("Default card updated");
              }}
            />
          ))
        )}
      </div>

      {!adding ? (
        <Button
          variant="secondary"
          block
          className="mt-5"
          onClick={() => setAdding(true)}
        >
          <Plus size={15} /> Add a card
        </Button>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white border border-border rounded-2xl p-6 mt-5 space-y-4"
        >
          <h2 className="font-bold">Add a card</h2>
          <div>
            <Label htmlFor="pan">Card number</Label>
            <Input
              id="pan"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              className="mt-1.5"
              {...form.register("pan")}
            />
            {form.formState.errors.pan && (
              <p className="text-xs text-tomato mt-1.5">
                {form.formState.errors.pan.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="holder">Name on card</Label>
            <Input
              id="holder"
              autoComplete="cc-name"
              placeholder="Sarah Mitchell"
              className="mt-1.5"
              {...form.register("holder")}
            />
            {form.formState.errors.holder && (
              <p className="text-xs text-tomato mt-1.5">
                {form.formState.errors.holder.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expiry">Expires</Label>
              <Input
                id="expiry"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                className="mt-1.5"
                {...form.register("expiry")}
              />
              {form.formState.errors.expiry && (
                <p className="text-xs text-tomato mt-1.5">
                  {form.formState.errors.expiry.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                className="mt-1.5"
                {...form.register("cvc")}
              />
              {form.formState.errors.cvc && (
                <p className="text-xs text-tomato mt-1.5">
                  {form.formState.errors.cvc.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => {
                form.reset();
                setAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save card
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function CardRow({
  card,
  onRemove,
  onSetDefault,
}: {
  card: PaymentMethod;
  onRemove: () => void;
  onSetDefault: () => void;
}) {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4">
      <CardBrandLogo brand={card.brand} size="lg" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{brandLabel(card.brand)}</span>
          <span className="text-muted text-sm">•••• {card.last4}</span>
          {card.isDefault && (
            <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-accent-deep bg-accent-soft px-1.5 py-0.5 rounded">
              Default
            </span>
          )}
        </div>
        <div className="text-xs text-muted mt-0.5">
          {card.holder} · Expires {String(card.expMonth).padStart(2, "0")}/
          {String(card.expYear).slice(-2)}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {!card.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-xs font-semibold text-ink hover:bg-soft px-2 py-1.5 rounded-lg inline-flex items-center gap-1"
          >
            <Check size={12} /> Default
          </button>
        )}
        <button
          onClick={onRemove}
          className="w-9 h-9 rounded-full text-muted hover:text-tomato hover:bg-tomato-soft flex items-center justify-center"
          aria-label="Remove card"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
