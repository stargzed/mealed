"use client";

import { Check, CreditCard, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEED_ORDERS } from "@/lib/seed";
import { formatPrice, generatePickupCode } from "@/lib/utils";
import { toast } from "sonner";

const CHEF_ID = "maya";

export default function ChefPayoutsPage() {
  const orders = SEED_ORDERS.filter((o) => o.chefId === CHEF_ID);

  return (
    <div className="max-w-5xl">
      <h1 className="m-display text-3xl mb-6">Payouts</h1>

      <div className="bg-accent-soft border border-accent/20 rounded-2xl p-5 mb-6 flex items-start gap-4">
        <span className="w-10 h-10 rounded-full bg-white text-accent-deep flex items-center justify-center flex-shrink-0">
          <Check size={18} />
        </span>
        <div className="flex-1">
          <div className="font-bold">Stripe Connect: ready</div>
          <p className="text-sm text-sub mt-1 leading-relaxed">
            Payouts process 24 hours after each order completes. Funds typically
            land in your bank account within 2 business days.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast("Stripe dashboard opens in a new tab in production.")}
        >
          Stripe dashboard <ExternalLink size={13} />
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <SummaryStat label="Available for payout" value="$0.00" hint="Next payout: Sun" />
        <SummaryStat label="Pending" value={formatPrice(orders.reduce((s, o) => s + o.fees.chefPayout, 0))} hint={`${orders.length} orders`} />
        <SummaryStat label="Paid (lifetime)" value="$1,159.62" hint="14 payouts" />
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-divider flex items-center gap-2">
          <CreditCard size={16} />
          <h2 className="font-bold">Recent payouts</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Order
              </th>
              <th className="text-left px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Status
              </th>
              <th className="text-right px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Amount
              </th>
              <th className="text-right px-5 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Eligible
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-divider last:border-0">
                <td className="px-5 py-3 m-mono text-xs">{generatePickupCode(o.id)}</td>
                <td className="px-5 py-3">
                  <Badge variant={o.status === "completed" ? "verified" : "warn"}>
                    {o.status === "completed" ? "Paid" : "Pending"}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">
                  {formatPrice(o.fees.chefPayout)}
                </td>
                <td className="px-5 py-3 text-right text-muted tabular-nums">
                  {o.payoutEligibleAt
                    ? new Date(o.payoutEligibleAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryStat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className="m-display text-2xl mt-2">{value}</div>
      {hint && <div className="text-xs text-muted mt-1">{hint}</div>}
    </div>
  );
}
