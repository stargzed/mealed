import { ChefHat, DollarSign, Shield, Truck, Zap } from "lucide-react";
import Link from "next/link";

// Bento-style features grid. Asymmetric 3-row × 4-col layout where the
// hero card spans 2 columns / 2 rows. Inspired by aceternity's bento grid
// but rebuilt against the Mealed design tokens.

interface Feature {
  Icon: typeof ChefHat;
  title: string;
  description: string;
  accent?: "ink" | "accent" | "yolk";
  className?: string;
}

const FEATURES: Feature[] = [
  {
    Icon: ChefHat,
    title: "Own your menu",
    description:
      "Weekly drops, custom plans, or both. Your prices, your portions, your rules.",
    accent: "ink",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    Icon: DollarSign,
    title: "Keep 88%",
    description: "12% commission. No subscription, no monthly fee.",
    accent: "accent",
  },
  {
    Icon: Truck,
    title: "Pickup or delivery",
    description: "Set your radius and fee. Mealed handles the routing.",
  },
  {
    Icon: Shield,
    title: "Built-in trust",
    description:
      "Verified chef badge, kitchen scan, dish-level reviews. We build the trust so you can focus on cooking.",
    className: "md:col-span-2",
  },
  {
    Icon: Zap,
    title: "Paid in 24 hours",
    description: "Stripe Connect pays out the day after each completed order.",
    accent: "yolk",
    className: "md:col-span-2",
  },
];

export function BentoFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-12 py-12 md:py-16">
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <h2 className="m-display text-3xl md:text-4xl">Built for cooks.</h2>
        <Link href="/safety" className="text-sm font-bold underline underline-offset-4 text-ink">
          Read our standards
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        {FEATURES.map((f) => (
          <BentoTile key={f.title} feature={f} />
        ))}
      </div>
    </section>
  );
}

function BentoTile({ feature }: { feature: Feature }) {
  const { Icon, title, description, accent, className } = feature;
  const tone =
    accent === "ink"
      ? "bg-ink text-white border-ink"
      : accent === "accent"
      ? "bg-accent-soft text-accent-deep border-accent/20"
      : accent === "yolk"
      ? "bg-yolk-soft text-ink border-yolk/40"
      : "bg-white text-ink border-border";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${tone} p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${className ?? ""}`}
    >
      <Icon
        size={accent === "ink" ? 28 : 22}
        className={accent === "ink" ? "text-accent" : ""}
      />
      <div>
        <div
          className={`m-display ${accent === "ink" ? "text-2xl md:text-3xl" : "text-lg"} mb-1.5`}
        >
          {title}
        </div>
        <p
          className={`text-sm leading-relaxed ${
            accent === "ink" ? "text-white/70" : "text-sub"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
