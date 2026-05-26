import { apiFetch } from "./client";
import type { Review } from "../types";

export async function getReviews(
  opts: { chefId?: string; mealId?: string } = {},
): Promise<Review[]> {
  const params = new URLSearchParams();
  if (opts.chefId) params.set("chefId", opts.chefId);
  if (opts.mealId) params.set("mealId", opts.mealId);
  const { reviews } = await apiFetch<{ reviews: Review[] }>(
    `/api/reviews?${params.toString()}`,
  );
  return reviews;
}
