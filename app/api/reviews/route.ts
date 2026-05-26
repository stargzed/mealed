import { NextResponse } from "next/server";
import { SEED_REVIEWS } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chefId = searchParams.get("chefId");
  const mealId = searchParams.get("mealId");

  let reviews = SEED_REVIEWS;
  if (chefId) reviews = reviews.filter((r) => r.chefId === chefId);
  if (mealId) reviews = reviews.filter((r) => r.mealId === mealId);
  return NextResponse.json({ reviews });
}
