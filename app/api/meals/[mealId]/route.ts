import { NextResponse } from "next/server";
import { chefMap, mealMap, SEED_MEALS, SEED_REVIEWS } from "@/lib/seed";

export async function GET(
  _req: Request,
  { params }: { params: { mealId: string } },
) {
  const meal = mealMap[params.mealId];
  if (!meal) return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  const chef = chefMap[meal.chefId];
  const related = SEED_MEALS.filter(
    (m) => m.chefId === meal.chefId && m.id !== meal.id,
  ).slice(0, 4);
  const reviews = SEED_REVIEWS.filter((r) => r.mealId === meal.id);
  return NextResponse.json({ meal, chef, related, reviews });
}
