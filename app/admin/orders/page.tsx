"use client";

import { SEED_ORDERS, chefMap } from "@/lib/seed";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { formatPrice, generatePickupCode } from "@/lib/utils";

export default function AdminOrdersPage() {
  return (
    <div className="max-w-6xl">
      <header className="mb-6">
        <h1 className="m-display text-3xl">Orders</h1>
        <p className="text-sub text-sm mt-1">
          {SEED_ORDERS.length} orders in the last 30 days.
        </p>
      </header>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Code
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Chef
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold hidden md:table-cell">
                Type
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Status
              </th>
              <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Total
              </th>
              <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold hidden md:table-cell">
                Platform
              </th>
            </tr>
          </thead>
          <tbody>
            {SEED_ORDERS.map((o) => (
              <tr key={o.id} className="border-b border-divider last:border-0">
                <td className="px-4 py-3 m-mono text-xs">{generatePickupCode(o.id)}</td>
                <td className="px-4 py-3 font-semibold">
                  {chefMap[o.chefId]?.displayName}
                </td>
                <td className="px-4 py-3 hidden md:table-cell capitalize text-sub">
                  {o.fulfillmentType}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatPrice(o.fees.total)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-accent-deep font-bold hidden md:table-cell">
                  {formatPrice(o.fees.serviceFee + o.fees.protectionFee + o.fees.chefCommission)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
