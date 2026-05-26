import { NextResponse } from "next/server";
import { SEED_MEALS } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const category = searchParams.get("category");
  const chefId = searchParams.get("chefId");
  const maxPrice = searchParams.get("maxPrice");

  let meals = SEED_MEALS;
  if (tag) meals = meals.filter((m) => m.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  if (category)
    meals = meals.filter((m) =>
      m.tags.map((t) => t.toLowerCase()).includes(category.toLowerCase()),
    );
  if (chefId) meals = meals.filter((m) => m.chefId === chefId);
  if (maxPrice) {
    const cap = Number(maxPrice);
    if (!Number.isNaN(cap)) meals = meals.filter((m) => m.price <= cap);
  }

  return NextResponse.json({ meals });
}
