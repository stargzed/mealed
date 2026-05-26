import { NextResponse } from "next/server";
import { SEED_ORDERS, chefMap, mealMap } from "@/lib/seed";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } },
) {
  const order = SEED_ORDERS.find((o) => o.id === params.orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  const enriched = {
    ...order,
    chef: chefMap[order.chefId],
    items: order.items.map((it) => ({ ...it, meal: mealMap[it.mealId] })),
  };
  return NextResponse.json({ order: enriched });
}
