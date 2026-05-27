import Link from "next/link";
import { ArrowUpRight, ChefHat, DollarSign, Shield, Truck, Zap } from "lucide-react";

interface Feature {
 Icon: typeof ChefHat;
 number: string;
 title: string;
 description: string;
}

const FEATURES: Feature[] = [
 {
  Icon: ChefHat,
  number: "01",
  title: "Own your menu",
  description:
   "Weekly drops, custom plans, or both. Your prices, your portions, your rules.",
 },
 {
  Icon: DollarSign,
  number: "02",
  title: "Keep 88% of every order",
  description:
   "Flat 12% commission. No subscription, no listing fees, no monthly minimums.",
 },
 {
  Icon: Truck,
  number: "03",
  title: "Pickup or delivery your call",
  description:
   "Set your radius, set your fee. Mealed handles routing, ETAs, and customer comms.",
 },
 {
  Icon: Shield,
  number: "04",
  title: "Built-in trust",
  description:
   "Verified chef badge, kitchen scan, dish-level reviews. We do the hard part of earning customer trust.",
 },
 {
  Icon: Zap,
  number: "05",
  title: "Paid in 24 hours",
  description:
   "Stripe Connect pays out the day after each completed order. No invoicing, no waiting.",
 },
];

/**
 * Modern editorial replacement for the old bento grid. A clean 2-column
 * feature list with serif headlines, generous whitespace, and a hover-only
 * arrow indicator no card backgrounds, no asymmetric tiles. Pairs with the
 * Fraunces display type for an editorial feel.
 */
export function ChefFeatures() {
 return (
  <section className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24">
   <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
    <div>
     <div className="text-[11px] font-bold uppercase tracking-wider text-accent-deep mb-3">
      Why chefs choose Mealed
     </div>
     <h2 className="m-display text-4xl md:text-5xl max-w-2xl">
      Built for the way <em className="not-italic text-accent-deep">you</em> cook.
     </h2>
    </div>
    <Link
     href="/safety"
     className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink self-start md:self-end"
    >
     Read our standards
     <ArrowUpRight
      size={15}
      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
     />
    </Link>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
    {FEATURES.map((feature, i) => (
     <FeatureRow
      key={feature.number}
      feature={feature}
      isLastInColumn={
       i === FEATURES.length - 1 ||
       (i === FEATURES.length - 2 && FEATURES.length % 2 === 1)
      }
     />
    ))}
   </div>
  </section>
 );
}

function FeatureRow({
 feature,
 isLastInColumn,
}: {
 feature: Feature;
 isLastInColumn: boolean;
}) {
 const { Icon, number, title, description } = feature;
 return (
  <div
   className={`group relative py-7 md:py-8 ${
    !isLastInColumn ? "border-b border-divider" : ""
   }`}
  >
   <div className="flex items-start gap-5">
    {/* Icon block subtle but with brand color on hover */}
    <div className="shrink-0 w-12 h-12 rounded-2xl border border-border bg-white flex items-center justify-center transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white group-hover:-translate-y-0.5">
     <Icon size={18} strokeWidth={1.7} />
    </div>

    <div className="flex-1 min-w-0">
     <div className="flex items-baseline gap-2 mb-1.5">
      <span className="font-mono text-[10px] text-muted tracking-wide">
       {number}
      </span>
     </div>
     <h3 className="m-display text-[22px] md:text-2xl tracking-tight leading-snug">
      {title}
     </h3>
     <p className="text-sub text-[14px] leading-relaxed mt-2 max-w-[42ch]">
      {description}
     </p>
    </div>

    {/* Hover arrow */}
    <ArrowUpRight
     size={18}
     className="shrink-0 text-muted opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-ink"
    />
   </div>
  </div>
 );
}
