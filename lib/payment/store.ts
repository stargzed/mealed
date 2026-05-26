"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PaymentMethod {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "discover" | "unknown";
  last4: string;
  expMonth: number;
  expYear: number;
  holder: string;
  isDefault: boolean;
}

const SEED: PaymentMethod[] = [
  {
    id: "pm-demo-1",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2029,
    holder: "Sarah Mitchell",
    isDefault: true,
  },
];

interface State {
  methods: PaymentMethod[];
  add: (m: Omit<PaymentMethod, "id" | "isDefault">) => PaymentMethod;
  remove: (id: string) => void;
  setDefault: (id: string) => void;
}

export const usePaymentMethods = create<State>()(
  persist(
    (set, get) => ({
      methods: SEED,
      add: (m) => {
        const next: PaymentMethod = {
          ...m,
          id: `pm-${Math.random().toString(36).slice(2, 9)}`,
          isDefault: get().methods.length === 0,
        };
        set((s) => ({ methods: [...s.methods, next] }));
        return next;
      },
      remove: (id) =>
        set((s) => {
          const next = s.methods.filter((m) => m.id !== id);
          if (next.length > 0 && !next.some((m) => m.isDefault)) {
            next[0] = { ...next[0], isDefault: true };
          }
          return { methods: next };
        }),
      setDefault: (id) =>
        set((s) => ({
          methods: s.methods.map((m) => ({ ...m, isDefault: m.id === id })),
        })),
    }),
    { name: "mealed.payment" },
  ),
);

// Helper: guess card brand from PAN.
export function detectBrand(pan: string): PaymentMethod["brand"] {
  const n = pan.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^6/.test(n)) return "discover";
  return "unknown";
}

const BRAND_LABEL: Record<PaymentMethod["brand"], string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
  unknown: "Card",
};
export function brandLabel(b: PaymentMethod["brand"]) {
  return BRAND_LABEL[b];
}
