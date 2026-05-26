import { NextResponse } from "next/server";
import { SEED_ORDERS, chefMap, mealMap } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const consumerId = searchParams.get("consumerId");
  const chefId = searchParams.get("chefId");

  let orders = SEED_ORDERS;
  if (consumerId) orders = orders.filter((o) => o.consumerId === consumerId);
  if (chefId) orders = orders.filter((o) => o.chefId === chefId);

  const enriched = orders.map((o) => ({
    ...o,
    chef: chefMap[o.chefId],
    items: o.items.map((it) => ({ ...it, meal: mealMap[it.mealId] })),
  }));

  return NextResponse.json({ orders: enriched });
}
