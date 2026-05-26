import { apiFetch } from "./client";
import type { Order } from "../types";

export async function getOrders(opts: { consumerId?: string; chefId?: string } = {}): Promise<Order[]> {
  const params = new URLSearchParams();
  if (opts.consumerId) params.set("consumerId", opts.consumerId);
  if (opts.chefId) params.set("chefId", opts.chefId);
  const { orders } = await apiFetch<{ orders: Order[] }>(
    `/api/orders?${params.toString()}`,
  );
  return orders;
}

export async function getOrder(orderId: string): Promise<Order> {
  const { order } = await apiFetch<{ order: Order }>(`/api/orders/${orderId}`);
  return order;
}
