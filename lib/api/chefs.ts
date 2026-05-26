import { apiFetch } from "./client";
import type { ChefProfile, Meal, Review } from "../types";

export interface ChefFilters {
  verifiedOnly?: boolean;
  fulfillmentType?: "pickup" | "delivery";
  featured?: boolean;
}

export async function getChefs(filters: ChefFilters = {}): Promise<ChefProfile[]> {
  const params = new URLSearchParams();
  if (filters.verifiedOnly) params.set("verifiedOnly", "true");
  if (filters.fulfillmentType) params.set("fulfillmentType", filters.fulfillmentType);
  if (filters.featured) params.set("featured", "true");
  const { chefs } = await apiFetch<{ chefs: ChefProfile[] }>(
    `/api/chefs?${params.toString()}`,
  );
  return chefs;
}

export async function getChef(chefId: string): Promise<{
  chef: ChefProfile;
  meals: Meal[];
  reviews: Review[];
}> {
  return apiFetch(`/api/chefs/${chefId}`);
}
