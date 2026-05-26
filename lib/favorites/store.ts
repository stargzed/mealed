"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavState {
  meals: string[];
  chefs: string[];
  toggleMeal: (id: string) => void;
  toggleChef: (id: string) => void;
  isMeal: (id: string) => boolean;
  isChef: (id: string) => boolean;
}

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      meals: [],
      chefs: [],
      toggleMeal: (id) =>
        set((state) => ({
          meals: state.meals.includes(id)
            ? state.meals.filter((m) => m !== id)
            : [...state.meals, id],
        })),
      toggleChef: (id) =>
        set((state) => ({
          chefs: state.chefs.includes(id)
            ? state.chefs.filter((c) => c !== id)
            : [...state.chefs, id],
        })),
      isMeal: (id) => get().meals.includes(id),
      isChef: (id) => get().chefs.includes(id),
    }),
    { name: "mealed.favorites" },
  ),
);
