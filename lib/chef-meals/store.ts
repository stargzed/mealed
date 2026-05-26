"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Meal } from "../types";

export interface ChefMealDraft {
  name: string;
  description: string;
  price: number;
  palette?: string;
  tags: string[];
  allergens: string[];
  macros?: { cal: number; p: number; c: number; f: number };
  bundle?: { count: number; price: number; label?: string };
  imageUrl?: string;
}

interface State {
  meals: Meal[];
  add: (chefId: string, draft: ChefMealDraft) => Meal;
  update: (id: string, patch: Partial<Meal>) => void;
  remove: (id: string) => void;
  forChef: (chefId: string) => Meal[];
  byId: (id: string) => Meal | undefined;
}

const ISO = () => new Date().toISOString();

export const useChefMeals = create<State>()(
  persist(
    (set, get) => ({
      meals: [],
      add: (chefId, draft) => {
        const now = ISO();
        const meal: Meal = {
          id: `m-${Math.random().toString(36).slice(2, 9)}`,
          chefId,
          name: draft.name,
          description: draft.description,
          palette: draft.palette ?? "bowl",
          price: draft.price,
          tags: draft.tags,
          allergens: draft.allergens,
          macros: draft.macros,
          bundle: draft.bundle,
          imageUrl: draft.imageUrl,
          rating: null,
          reviewCount: 0,
          pickupAvailable: true,
          deliveryAvailable: true,
          active: true,
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ meals: [meal, ...s.meals] }));
        return meal;
      },
      update: (id, patch) =>
        set((s) => ({
          meals: s.meals.map((m) =>
            m.id === id ? { ...m, ...patch, updatedAt: ISO() } : m,
          ),
        })),
      remove: (id) =>
        set((s) => ({ meals: s.meals.filter((m) => m.id !== id) })),
      forChef: (chefId) => get().meals.filter((m) => m.chefId === chefId),
      byId: (id) => get().meals.find((m) => m.id === id),
    }),
    { name: "mealed.chef-meals" },
  ),
);
