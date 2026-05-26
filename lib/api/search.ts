import { apiFetch } from "./client";
import type { ChefProfile, Meal } from "../types";

export async function search(q: string): Promise<{
  chefs: ChefProfile[];
  meals: Meal[];
}> {
  return apiFetch(`/api/search?q=${encodeURIComponent(q)}`);
}
