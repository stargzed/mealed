import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function generatePickupCode(orderId: string) {
  return `MEAL-${orderId.slice(0, 6).toUpperCase()}`;
}

export function generateOrderId() {
  return Math.random().toString(36).slice(2, 10);
}

export function formatRelative(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function plural(n: number, one: string, many?: string) {
  return n === 1 ? one : many ?? `${one}s`;
}
