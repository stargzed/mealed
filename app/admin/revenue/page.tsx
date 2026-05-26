"use client";

import { DollarSign, ShieldCheck, TrendingUp } from "lucide-react";
import { SEED_ORDERS } from "@/lib/seed";
import { DashboardStatCard } from "@/components/chef/dashboard-stat-card";
import { formatPrice } from "@/lib/utils";

export default function AdminRevenuePage() {
  const gross = SEED_ORDERS.reduce((s, o) => s + o.fees.total, 0);
  const serviceFees = SEED_ORDERS.reduce((s, o) => s + o.fees.serviceFee, 0);
  const protectionFees = SEED_ORDERS.reduce((s, o) => s + o.fees.protectionFee, 0);
  const commission = SEED_ORDERS.reduce((s, o) => s + o.fees.chefCommission, 0);
  const platformTake = serviceFees + protectionFees + commission;

  return (
    <div className="max-w-6xl">
      <header className="mb-6">
        <h1 className="m-display text-3xl">Revenue</h1>
        <p className="text-sub text-sm mt-1">
          All-time platform revenue across orders and custom quotes.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardStatCard
          label="Gross order volume"
          value={formatPrice(gross)}
          icon={<DollarSign size={16} />}
        />
        <DashboardStatCard
          label="Chef commission"
          value={formatPrice(commission)}
          hint="12% of subtotal"
          icon={<TrendingUp size={16} />}
        />
        <DashboardStatCard
          label="Consumer service fees"
          value={formatPrice(serviceFees)}
          hint="6% of subtotal"
        />
        <DashboardStatCard
          label="Protection fees"
          value={formatPrice(protectionFees)}
          hint="$2.99 min"
          icon={<ShieldCheck size={16} />}
        />
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-4">Platform take</h2>
        <div className="m-display text-5xl">{formatPrice(platformTake)}</div>
        <p className="text-sub text-sm mt-2">
          Total platform revenue across {SEED_ORDERS.length} orders.
        </p>
      </div>
    </div>
  );
}
