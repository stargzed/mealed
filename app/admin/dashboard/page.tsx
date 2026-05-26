"use client";

import Link from "next/link";
import { AlertTriangle, ChefHat, DollarSign, ShieldCheck, Users } from "lucide-react";
import { SEED_CHEFS, SEED_ORDERS, SEED_USERS } from "@/lib/seed";
import { DashboardStatCard } from "@/components/chef/dashboard-stat-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const verified = SEED_CHEFS.filter((c) => c.verified);
  const inReview = SEED_CHEFS.filter((c) => c.verificationStatus === "in_review");
  const grossRevenue = SEED_ORDERS.reduce((s, o) => s + o.fees.total, 0);
  const platformTake = SEED_ORDERS.reduce(
    (s, o) => s + o.fees.serviceFee + o.fees.protectionFee + o.fees.chefCommission,
    0,
  );

  return (
    <div className="max-w-7xl space-y-6">
      <header>
        <h1 className="m-display text-3xl md:text-4xl">Platform overview</h1>
        <p className="text-sub text-sm mt-1">
          {SEED_USERS.length} users · {SEED_CHEFS.length} chefs · {SEED_ORDERS.length} orders
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardStatCard
          label="Verified chefs"
          value={String(verified.length)}
          hint={`+${inReview.length} in review`}
          icon={<ChefHat size={16} />}
        />
        <DashboardStatCard
          label="Total users"
          value={String(SEED_USERS.length)}
          hint="Consumers + chefs"
          icon={<Users size={16} />}
        />
        <DashboardStatCard
          label="Gross revenue"
          value={formatPrice(grossRevenue)}
          hint="All-time order volume"
          icon={<DollarSign size={16} />}
        />
        <DashboardStatCard
          label="Platform take"
          value={formatPrice(platformTake)}
          hint="Commission + fees"
          icon={<DollarSign size={16} />}
          trend="+12% MoM"
        />
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent-deep" />
              <h2 className="font-bold">Verification queue</h2>
            </div>
            <Link
              href="/admin/verification"
              className="text-sm font-bold text-ink"
            >
              Review →
            </Link>
          </div>
          {inReview.length === 0 ? (
            <p className="text-sub text-sm">No applications waiting.</p>
          ) : (
            <ul className="divide-y divide-divider -mx-2">
              {inReview.map((c) => (
                <li
                  key={c.id}
                  className="px-2 py-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-sm">{c.displayName}</div>
                    <div className="text-xs text-muted">{c.neighborhood}</div>
                  </div>
                  <Badge variant="warn">In review</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-tomato" />
              <h2 className="font-bold">Open reports</h2>
            </div>
            <Link href="/admin/reports" className="text-sm font-bold text-ink">
              View →
            </Link>
          </div>
          <p className="text-sub text-sm">
            No open reports right now. All quality issues from the last week have
            been resolved.
          </p>
        </div>
      </section>

      <section className="bg-white border border-border rounded-2xl p-5">
        <h2 className="font-bold mb-4">Latest orders</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-muted font-bold">
                Order
              </th>
              <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-muted font-bold">
                Status
              </th>
              <th className="text-right px-3 py-2 text-[11px] uppercase tracking-wider text-muted font-bold">
                Total
              </th>
              <th className="text-right px-3 py-2 text-[11px] uppercase tracking-wider text-muted font-bold">
                Platform
              </th>
            </tr>
          </thead>
          <tbody>
            {SEED_ORDERS.map((o) => (
              <tr key={o.id} className="border-b border-divider last:border-0">
                <td className="px-3 py-3 m-mono text-xs">{o.id}</td>
                <td className="px-3 py-3">
                  <Badge variant={o.status === "completed" ? "verified" : "warn"}>
                    {o.status}
                  </Badge>
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {formatPrice(o.fees.total)}
                </td>
                <td className="px-3 py-3 text-right tabular-nums text-accent-deep font-bold">
                  {formatPrice(o.fees.serviceFee + o.fees.protectionFee + o.fees.chefCommission)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
