import { NextResponse } from "next/server";
import { SEED_CHEFS, SEED_MEALS } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  if (!q) return NextResponse.json({ chefs: [], meals: [] });

  const chefs = SEED_CHEFS.filter(
    (c) =>
      c.displayName.toLowerCase().includes(q) ||
      c.specialty.toLowerCase().includes(q) ||
      c.neighborhood.toLowerCase().includes(q),
  );
  const meals = SEED_MEALS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q)) ||
      (m.description ?? "").toLowerCase().includes(q),
  );

  return NextResponse.json({ chefs, meals });
}
