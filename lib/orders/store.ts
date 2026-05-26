"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "../types";

interface OrdersState {
  placed: Order[];
  add: (order: Order) => void;
  updateStatus: (orderId: string, status: Order["status"]) => void;
  byId: (id: string) => Order | undefined;
}

export const usePlacedOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      placed: [],
      add: (order) => set((s) => ({ placed: [order, ...s.placed] })),
      updateStatus: (orderId, status) =>
        set((s) => ({
          placed: s.placed.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o,
          ),
        })),
      byId: (id) => get().placed.find((o) => o.id === id),
    }),
    { name: "mealed.orders" },
  ),
);
