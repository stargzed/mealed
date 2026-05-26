import { NextResponse } from "next/server";
import { chefMap, SEED_MEALS, SEED_REVIEWS } from "@/lib/seed";

export async function GET(
  _req: Request,
  { params }: { params: { chefId: string } },
) {
  const chef = chefMap[params.chefId];
  if (!chef) return NextResponse.json({ error: "Chef not found" }, { status: 404 });
  const meals = SEED_MEALS.filter((m) => m.chefId === chef.id);
  const reviews = SEED_REVIEWS.filter((r) => r.chefId === chef.id);
  return NextResponse.json({ chef, meals, reviews });
}
