"use client";

import { DollarSign, TrendingUp } from "lucide-react";
import { SEED_ORDERS } from "@/lib/seed";
import { DashboardStatCard } from "@/components/chef/dashboard-stat-card";
import { formatPrice } from "@/lib/utils";

const CHEF_ID = "maya";

export default function ChefEarningsPage() {
  const orders = SEED_ORDERS.filter((o) => o.chefId === CHEF_ID);
  const gross = orders.reduce((s, o) => s + o.fees.subtotal, 0);
  const payout = orders.reduce((s, o) => s + o.fees.chefPayout, 0);
  const commission = gross - payout;

  // Mock weekly breakdown
  const WEEKS = [
    { label: "Mar 16 – Mar 22", gross: 312.5, payout: 275 },
    { label: "Mar 23 – Mar 29", gross: 425, payout: 374 },
    { label: "Mar 30 – Apr 5", gross: 580.25, payout: 510.62 },
    { label: "Apr 6 – Apr 12 (current)", gross, payout },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="m-display text-3xl mb-6">Earnings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardStatCard
          label="Gross sales (lifetime)"
          value={formatPrice(gross + 1317.75)}
          hint="Before commission"
          icon={<DollarSign size={16} />}
        />
        <DashboardStatCard
          label="Your take (lifetime)"
          value={formatPrice(payout + 1159.62)}
          hint="After 12% commission"
          icon={<TrendingUp size={16} />}
          trend="+18% MoM"
        />
        <DashboardStatCard
          label="Avg. order"
          value={formatPrice((gross / Math.max(orders.length, 1)))}
          hint={`${orders.length} orders this period`}
        />
      </div>

      <div className="bg-white border border-border rounded-2xl mt-6 overflow-hidden">
        <div className="p-5 border-b border-divider">
          <h2 className="font-bold">Weekly breakdown</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Week
              </th>
              <th className="text-right px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Gross
              </th>
              <th className="text-right px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Commission
              </th>
              <th className="text-right px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Payout
              </th>
            </tr>
          </thead>
          <tbody>
            {WEEKS.map((w) => (
              <tr key={w.label} className="border-b border-divider last:border-0">
                <td className="px-5 py-3 font-semibold">{w.label}</td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {formatPrice(w.gross)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-tomato">
                  -{formatPrice(w.gross - w.payout)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums font-bold">
                  {formatPrice(w.payout)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
