"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationType =
  | "order"
  | "message"
  | "custom_request"
  | "review"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  href?: string;
  createdAt: string;
  readAt?: string;
}

const SEED: AppNotification[] = [
  {
    id: "n1",
    type: "order",
    title: "Chef Maya started prepping your order",
    body: "MEAL-O1029 · 5 meals · ready by Sunday 5:30 PM",
    href: "/orders/o-1029",
    createdAt: new Date(Date.now() - 35 * 60_000).toISOString(),
  },
  {
    id: "n2",
    type: "message",
    title: "New message from Chef Lina",
    body: "Menu's posted — let me know if anything looks off for your allergies this week.",
    href: "/messages/t-lina-sarah",
    createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
  },
  {
    id: "n3",
    type: "review",
    title: "How was your meal?",
    body: "Your last order from Chef Andre — leave a quick review.",
    href: "/orders/o-0987",
    createdAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
  },
];

interface State {
  items: AppNotification[];
  unreadCount: () => number;
  push: (n: Omit<AppNotification, "id" | "createdAt">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
}

export const useNotifications = create<State>()(
  persist(
    (set, get) => ({
      items: SEED,
      unreadCount: () => get().items.filter((n) => !n.readAt).length,
      push: (n) =>
        set((s) => ({
          items: [
            {
              ...n,
              id: `n-${Math.random().toString(36).slice(2, 9)}`,
              createdAt: new Date().toISOString(),
            },
            ...s.items,
          ],
        })),
      markRead: (id) =>
        set((s) => ({
          items: s.items.map((n) =>
            n.id === id && !n.readAt
              ? { ...n, readAt: new Date().toISOString() }
              : n,
          ),
        })),
      markAllRead: () =>
        set((s) => {
          const now = new Date().toISOString();
          return {
            items: s.items.map((n) => (n.readAt ? n : { ...n, readAt: now })),
          };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "mealed.notifications" },
  ),
);
