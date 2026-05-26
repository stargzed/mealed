"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Channel = "push" | "email" | "sms";
export type Category =
  | "orderUpdates"
  | "messages"
  | "customRequests"
  | "reviews"
  | "marketing";

export type NotificationPrefs = Record<Category, Record<Channel, boolean>>;

const DEFAULT: NotificationPrefs = {
  orderUpdates: { push: true, email: true, sms: true },
  messages: { push: true, email: false, sms: false },
  customRequests: { push: true, email: true, sms: false },
  reviews: { push: false, email: true, sms: false },
  marketing: { push: false, email: false, sms: false },
};

interface State {
  prefs: NotificationPrefs;
  setPref: (category: Category, channel: Channel, value: boolean) => void;
  reset: () => void;
}

export const useNotificationPrefs = create<State>()(
  persist(
    (set) => ({
      prefs: DEFAULT,
      setPref: (category, channel, value) =>
        set((s) => ({
          prefs: {
            ...s.prefs,
            [category]: { ...s.prefs[category], [channel]: value },
          },
        })),
      reset: () => set({ prefs: DEFAULT }),
    }),
    { name: "mealed.notification-prefs" },
  ),
);
