import { NextResponse } from "next/server";
import { SEED_CHEFS, SEED_ORDERS, SEED_USERS } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET() {
  const grossRevenue = SEED_ORDERS.reduce((sum, o) => sum + o.fees.total, 0);
  const platformRevenue = SEED_ORDERS.reduce(
    (sum, o) => sum + o.fees.serviceFee + o.fees.protectionFee + o.fees.chefCommission,
    0,
  );
  return NextResponse.json({
    chefs: SEED_CHEFS.length,
    verifiedChefs: SEED_CHEFS.filter((c) => c.verified).length,
    inReview: SEED_CHEFS.filter((c) => c.verificationStatus === "in_review").length,
    users: SEED_USERS.length,
    orders: SEED_ORDERS.length,
    grossRevenue: Math.round(grossRevenue * 100) / 100,
    platformRevenue: Math.round(platformRevenue * 100) / 100,
  });
}
