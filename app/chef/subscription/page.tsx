"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
 Check,
 ChefHat,
 Crown,
 Headphones,
 Megaphone,
 Sparkles,
 Star,
 TrendingUp,
 Zap,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PillToggle } from "@/components/ui/pill-toggle";
import { cn, formatPrice } from "@/lib/utils";

type Cycle = "monthly" | "yearly";

interface Plan {
 id: "free" | "pro" | "premium";
 name: string;
 blurb: string;
 Icon: React.ComponentType<{ size?: number | string; className?: string }>;
 monthly: number;
 yearly: number;
 badge?: string;
 highlight?: boolean;
 features: { text: string; pro?: boolean }[];
 commission: string;
}

const PLANS: Plan[] = [
 {
  id: "free",
  name: "Starter",
  blurb: "For new chefs testing the waters.",
  Icon: ChefHat,
  monthly: 0,
  yearly: 0,
  commission: "12% platform commission",
  features: [
   { text: "List up to 5 active meals" },
   { text: "Pickup orders" },
   { text: "Weekly menu" },
   { text: "Standard 24-hour payouts" },
   { text: "Email support" },
  ],
 },
 {
  id: "pro",
  name: "Pro",
  blurb: "For chefs going full-time.",
  Icon: Sparkles,
  monthly: 19,
  yearly: 190,
  badge: "Most popular",
  highlight: true,
  commission: "10% platform commission (was 12%)",
  features: [
   { text: "Unlimited meals", pro: true },
   { text: "Pickup + delivery", pro: true },
   { text: "Custom request inbox", pro: true },
   { text: "Same-day payouts (was 24h)", pro: true },
   { text: "Featured placement on /home (weekly)", pro: true },
   { text: "Priority support" },
   { text: "Sales analytics dashboard" },
  ],
 },
 {
  id: "premium",
  name: "Premium",
  blurb: "For chefs running a real business.",
  Icon: Crown,
  monthly: 49,
  yearly: 490,
  commission: "8% platform commission",
  features: [
   { text: "Everything in Pro", pro: true },
   { text: "8% commission (was 10%)", pro: true },
   { text: "Multi-chef teams (up to 3 cooks)", pro: true },
   { text: "Marketing co-op with Mealed press", pro: true },
   { text: "Custom branded delivery boxes (50/mo)", pro: true },
   { text: "Dedicated account manager", pro: true },
   { text: "Priority verification for new menu items" },
  ],
 },
];

export default function ChefSubscriptionPage() {
 const [cycle, setCycle] = useState<Cycle>("monthly");
 const [current, setCurrent] = useState<Plan["id"]>("free");

 const onPick = (plan: Plan) => {
  if (plan.id === current) {
   toast("You're already on this plan.");
   return;
  }
  setCurrent(plan.id);
  toast.success(
   plan.id === "free"
    ? "Downgraded to Starter."
    : `Upgraded to ${plan.name} (${cycle === "yearly" ? "yearly" : "monthly"})`,
  );
 };

 return (
  <div className="max-w-6xl mx-auto">
   <header className="text-center mb-8">
    <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
     Mealed for chefs
    </div>
    <h1 className="m-display text-3xl md:text-5xl mt-2">
     Tools that scale with your kitchen.
    </h1>
    <p className="text-sub mt-3 max-w-xl mx-auto">
     Take less commission, list more meals, and unlock featured placement 
     when you're ready.
    </p>
    <div className="flex justify-center mt-6">
     <PillToggle
      value={cycle}
      onChange={setCycle}
      options={[
       { value: "monthly", label: "Monthly" },
       {
        value: "yearly",
        label: (
         <span className="inline-flex items-center gap-1.5">
          Yearly
          <Badge variant="accent" className="!h-4 !text-[9px]">
           Save 17%
          </Badge>
         </span>
        ),
       },
      ]}
      size="md"
      ariaLabel="Billing cycle"
     />
    </div>
   </header>

   <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {PLANS.map((plan) => {
     const price = cycle === "yearly" ? plan.yearly : plan.monthly;
     const isCurrent = current === plan.id;
     const Icon = plan.Icon;
     return (
      <div
       key={plan.id}
       className={cn(
        "relative rounded-2xl border p-6 flex flex-col bg-white transition-all hover:-translate-y-1 hover:shadow-lg",
        plan.highlight
         ? "border-ink shadow-lg md:scale-[1.02]"
         : "border-border",
       )}
      >
       {plan.badge && (
        <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
         <Star size={10} fill="currentColor" strokeWidth={0} /> {plan.badge}
        </span>
       )}

       <div className="flex items-center gap-3 mb-1">
        <span
         className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center",
          plan.highlight ? "bg-ink text-white" : "bg-soft text-ink",
         )}
        >
         <Icon size={16} />
        </span>
        <h2 className="font-bold text-lg">{plan.name}</h2>
        {isCurrent && (
         <Badge variant="verified" className="ml-auto">
          Current plan
         </Badge>
        )}
       </div>
       <p className="text-sm text-sub mb-5">{plan.blurb}</p>

       <div className="flex items-baseline gap-1.5 mb-1">
        <span className="m-display text-4xl">
         {price === 0 ? "Free" : formatPrice(price)}
        </span>
        {price > 0 && (
         <span className="text-sm text-muted">
          / {cycle === "yearly" ? "year" : "month"}
         </span>
        )}
       </div>
       <p className="text-xs text-muted mb-5">{plan.commission}</p>

       <Button
        block
        variant={
         isCurrent ? "secondary" : plan.highlight ? "default" : "secondary"
        }
        disabled={isCurrent}
        onClick={() => onPick(plan)}
       >
        {isCurrent
         ? "Your plan"
         : plan.id === "free"
         ? "Downgrade"
         : current === "free"
         ? `Upgrade to ${plan.name}`
         : "Switch"}
       </Button>

       <ul className="mt-6 space-y-2.5 text-sm">
        {plan.features.map((f) => (
         <li
          key={f.text}
          className="flex items-start gap-2.5"
         >
          <span
           className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
            f.pro ? "bg-accent text-white" : "bg-soft text-ink",
           )}
          >
           <Check size={10} strokeWidth={3} />
          </span>
          <span className={f.pro ? "text-ink font-semibold" : "text-sub"}>
           {f.text}
          </span>
         </li>
        ))}
       </ul>
      </div>
     );
    })}
   </section>

   {/* Why upgrade */}
   <section className="mt-12 bg-surface border border-border rounded-2xl p-6 md:p-8">
    <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
     What you unlock with Pro
    </div>
    <h2 className="m-display text-2xl md:text-3xl mt-1.5 mb-6">
     Save more, sell more.
    </h2>
    <div className="grid sm:grid-cols-3 gap-4">
     {[
      {
       Icon: TrendingUp,
       t: "Lower commission",
       d: "Drop from 12% to 10% (Pro) or 8% (Premium). On $1k/wk, that's $1,000+ a year extra.",
      },
      {
       Icon: Zap,
       t: "Faster payouts",
       d: "Same-day instead of 24-hour eligibility. Cash flow when you need it.",
      },
      {
       Icon: Megaphone,
       t: "Featured placement",
       d: "We surface you on /home weekly. Top featured chefs see 2-3× new orders.",
      },
      {
       Icon: Headphones,
       t: "Priority support",
       d: "Skip the queue. Most Pro tickets are answered in under 2 hours.",
      },
      {
       Icon: Sparkles,
       t: "Multi-chef teams",
       d: "Run a real kitchen add up to 3 collaborating cooks under one account.",
      },
      {
       Icon: Crown,
       t: "Dedicated AM",
       d: "Premium chefs get a real human at Mealed who knows their menu.",
      },
     ].map((b) => (
      <div
       key={b.t}
       className="bg-white border border-border rounded-2xl p-5"
      >
       <b.Icon size={18} className="text-accent-deep mb-3" />
       <div className="font-bold text-sm">{b.t}</div>
       <p className="text-xs text-sub mt-1 leading-relaxed">{b.d}</p>
      </div>
     ))}
    </div>
   </section>

   <p className="text-[11px] text-muted mt-6 text-center leading-relaxed max-w-xl mx-auto">
    Cancel or downgrade any time. Charges are pro-rated. Plan changes apply to
    new orders going forward existing orders keep their original commission.
   </p>
  </div>
 );
}
