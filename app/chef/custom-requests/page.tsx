"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Utensils, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { computeCustomQuoteFees } from "@/lib/fees";
import { formatPrice } from "@/lib/utils";

const REQUESTS = [
  {
    id: "cr-1",
    name: "Jordan Reyes",
    goal:
      "10 high-protein lunches under $130, no dairy, mostly chicken. Workout meals.",
    mealsPerWeek: 10,
    budget: 130,
    diet: ["High-Protein", "Dairy-Free"],
    allergies: ["Dairy"],
    submitted: "2 hours ago",
  },
  {
    id: "cr-2",
    name: "Sarah Mitchell",
    goal:
      "5 vegan dinners + 5 vegan lunches, gluten-free, under $180. Variety please.",
    mealsPerWeek: 10,
    budget: 180,
    diet: ["Vegan", "Gluten-Free"],
    allergies: [],
    submitted: "yesterday",
  },
  {
    id: "cr-3",
    name: "Marcus Wei",
    goal: "Family of 4 — 3 dinner kits/wk, kid-friendly. $200 budget.",
    mealsPerWeek: 3,
    budget: 200,
    diet: ["Family Meals"],
    allergies: ["Shellfish"],
    submitted: "3 days ago",
  },
];

export default function ChefCustomRequestsPage() {
  const [active, setActive] = useState<string | null>(REQUESTS[0].id);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const req = REQUESTS.find((r) => r.id === active);

  const fees = price ? computeCustomQuoteFees(Number(price)) : null;

  return (
    <div className="max-w-6xl grid lg:grid-cols-[320px_1fr] gap-6">
      <aside>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-accent-deep" />
          <h2 className="font-bold text-sm">{REQUESTS.length} new requests</h2>
        </div>
        <div className="bg-white border border-border rounded-2xl divide-y divide-divider overflow-hidden">
          {REQUESTS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className={`w-full text-left p-4 transition ${
                active === r.id ? "bg-soft" : "hover:bg-soft"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold text-sm">{r.name}</div>
                <span className="text-[11px] text-muted">{r.submitted}</span>
              </div>
              <div className="text-xs text-sub mt-1 line-clamp-2">{r.goal}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {r.diet.map((d) => (
                  <Badge key={d} variant="outline">
                    {d}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="bg-white border border-border rounded-2xl p-6">
        {req ? (
          <>
            <h1 className="m-display text-2xl">Quote {req.name}</h1>
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
              <Stat icon={Utensils} label="Meals / week" value={String(req.mealsPerWeek)} />
              <Stat icon={DollarSign} label="Budget" value={`$${req.budget}`} />
              <Stat icon={Clock} label="Submitted" value={req.submitted} />
            </div>
            <section className="mt-5">
              <Label>Goal</Label>
              <p className="text-sub text-sm mt-1 leading-relaxed">{req.goal}</p>
            </section>
            <section className="mt-5">
              <Label>Allergies</Label>
              <p className="text-sub text-sm mt-1">
                {req.allergies.length ? req.allergies.join(", ") : "None listed"}
              </p>
            </section>

            <div className="border-t border-divider mt-6 pt-6">
              <h2 className="font-bold mb-3">Your quote</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="desc">Plan description *</Label>
                  <Textarea
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What you'll cook, how many of each, prep schedule."
                    className="mt-1.5"
                  />
                </div>
              </div>

              {fees && (
                <div className="mt-4 bg-soft rounded-xl p-4 text-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
                    Quote breakdown
                  </div>
                  <dl className="space-y-1">
                    <div className="flex justify-between"><dt className="text-sub">Subtotal</dt><dd>{formatPrice(fees.subtotal)}</dd></div>
                    <div className="flex justify-between"><dt className="text-sub">Custom request fee (15%)</dt><dd>{formatPrice(fees.customRequestFee ?? 0)}</dd></div>
                    <div className="flex justify-between"><dt className="text-sub">Mealed protection</dt><dd>{formatPrice(fees.protectionFee)}</dd></div>
                    <div className="flex justify-between font-bold border-t border-border pt-2 mt-2"><dt>Customer pays</dt><dd>{formatPrice(fees.total)}</dd></div>
                    <div className="flex justify-between text-accent-deep font-bold"><dt>You receive</dt><dd>{formatPrice(fees.chefPayout)}</dd></div>
                  </dl>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-5">
                <Button
                  variant="secondary"
                  onClick={() => toast("Request declined")}
                >
                  Decline
                </Button>
                <Button
                  onClick={() => {
                    if (!price || !description) {
                      toast.error("Add a price and plan description");
                      return;
                    }
                    toast.success("Quote sent");
                  }}
                >
                  Send quote
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sub">Select a request to quote.</p>
        )}
      </main>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-divider bg-white px-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-soft text-ink">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
          {label}
        </div>
        <div className="m-display text-[15px] leading-tight truncate">
          {value}
        </div>
      </div>
    </div>
  );
}
