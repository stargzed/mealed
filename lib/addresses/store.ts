"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedAddress {
  id: string;
  label: string;       // "Home", "Work", or first line
  primary: string;     // "601 W 40th Pl"
  secondary: string;   // "Los Angeles, CA"
  full: string;        // full single-line address
  lat?: number;
  lng?: number;
  isDefault: boolean;
  notes?: string;
}

interface State {
  addresses: SavedAddress[];
  add: (a: Omit<SavedAddress, "id" | "isDefault">) => SavedAddress;
  update: (id: string, patch: Partial<SavedAddress>) => void;
  remove: (id: string) => void;
  setDefault: (id: string) => void;
}

export const useAddresses = create<State>()(
  persist(
    (set, get) => ({
      addresses: [],
      add: (a) => {
        const next: SavedAddress = {
          ...a,
          id: `addr-${Math.random().toString(36).slice(2, 9)}`,
          isDefault: get().addresses.length === 0,
        };
        set((s) => ({ addresses: [...s.addresses, next] }));
        return next;
      },
      update: (id, patch) =>
        set((s) => ({
          addresses: s.addresses.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        })),
      remove: (id) =>
        set((s) => {
          const next = s.addresses.filter((a) => a.id !== id);
          if (next.length > 0 && !next.some((a) => a.isDefault)) {
            next[0] = { ...next[0], isDefault: true };
          }
          return { addresses: next };
        }),
      setDefault: (id) =>
        set((s) => ({
          addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
    }),
    { name: "mealed.addresses" },
  ),
);
