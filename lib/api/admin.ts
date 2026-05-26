import { apiFetch } from "./client";

export interface AdminStats {
  chefs: number;
  verifiedChefs: number;
  inReview: number;
  users: number;
  orders: number;
  grossRevenue: number;
  platformRevenue: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  return apiFetch(`/api/admin/stats`);
}
