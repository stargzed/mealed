import { apiFetch } from "./client";
import type { ChefProfile, Meal, Review } from "../types";

export interface MealFilters {
  tag?: string;
  category?: string;
  chefId?: string;
  maxPrice?: number;
}

export async function getMeals(filters: MealFilters = {}): Promise<Meal[]> {
  const params = new URLSearchParams();
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.category) params.set("category", filters.category);
  if (filters.chefId) params.set("chefId", filters.chefId);
  if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
  const { meals } = await apiFetch<{ meals: Meal[] }>(
    `/api/meals?${params.toString()}`,
  );
  return meals;
}

export async function getMeal(mealId: string): Promise<{
  meal: Meal;
  chef: ChefProfile;
  related: Meal[];
  reviews: Review[];
}> {
  return apiFetch(`/api/meals/${mealId}`);
}
