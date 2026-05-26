"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Location {
  label: string;      // short display: "Echo Park, LA" or "601 W 40th Pl"
  full: string;       // full address used for delivery
  lat?: number;
  lng?: number;
}

const DEFAULT_LOC: Location = {
  label: "Echo Park, LA",
  full: "Echo Park, Los Angeles, CA, USA",
};

// Curated quick picks shown before the user starts typing.
export const QUICK_LOCATIONS: Location[] = [
  { label: "Echo Park, LA", full: "Echo Park, Los Angeles, CA, USA" },
  { label: "Silver Lake, LA", full: "Silver Lake, Los Angeles, CA, USA" },
  { label: "Highland Park, LA", full: "Highland Park, Los Angeles, CA, USA" },
  { label: "DTLA, LA", full: "Downtown, Los Angeles, CA, USA" },
  { label: "Boyle Heights, LA", full: "Boyle Heights, Los Angeles, CA, USA" },
  { label: "Long Beach", full: "Long Beach, CA, USA" },
];

interface State {
  current: Location;
  recents: Location[];
  setLocation: (loc: Location) => void;
}

export const useLocation = create<State>()(
  persist(
    (set, get) => ({
      current: DEFAULT_LOC,
      recents: [],
      setLocation: (loc) => {
        const { recents } = get();
        const filtered = recents.filter((r) => r.full !== loc.full);
        set({ current: loc, recents: [loc, ...filtered].slice(0, 5) });
      },
    }),
    { name: "mealed.location" },
  ),
);
