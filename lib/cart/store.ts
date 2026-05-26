"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
  chefId: string | null; // single-chef-per-cart for simplicity
  addItem: (item: CartItem) => { replaced: boolean };
  setQty: (mealId: string, qty: number) => void;
  removeItem: (mealId: string) => void;
  clear: () => void;
  totalQuantity: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      chefId: null,
      addItem: (item) => {
        const state = get();
        let replaced = false;
        if (state.chefId && state.chefId !== item.chefId) {
          set({ items: [item], chefId: item.chefId });
          return { replaced: true };
        }
        const existing = state.items.find((i) => i.mealId === item.mealId);
        if (existing) {
          set({
            items: state.items.map((i) =>
              i.mealId === item.mealId ? { ...i, quantity: i.quantity + item.quantity } : i,
            ),
            chefId: item.chefId,
          });
        } else {
          set({ items: [...state.items, item], chefId: item.chefId });
        }
        return { replaced };
      },
      setQty: (mealId, qty) => {
        const state = get();
        if (qty <= 0) {
          const next = state.items.filter((i) => i.mealId !== mealId);
          set({ items: next, chefId: next.length === 0 ? null : state.chefId });
          return;
        }
        set({
          items: state.items.map((i) => (i.mealId === mealId ? { ...i, quantity: qty } : i)),
        });
      },
      removeItem: (mealId) => {
        const state = get();
        const next = state.items.filter((i) => i.mealId !== mealId);
        set({ items: next, chefId: next.length === 0 ? null : state.chefId });
      },
      clear: () => set({ items: [], chefId: null }),
      totalQuantity: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "mealed.cart" },
  ),
);
