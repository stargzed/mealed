import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { BentoFeatures } from "@/components/marketing/bento-features";

export const metadata = { title: "Become a chef" };

export default function BecomeAChefPage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent-deep mb-2">
            For chefs
          </div>
          <h1 className="m-display text-4xl md:text-6xl">
            Cook for your neighborhood.
          </h1>
          <p className="text-lg text-sub mt-5 max-w-[520px] leading-relaxed">
            Set your own menu. Choose pickup or delivery. Keep 88% of every order.
            Mealed handles checkout, taxes, and payouts.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              href="/signup?role=chef"
              className={buttonVariants({ size: "lg" })}
            >
              Start chef application <ArrowRight size={16} />
            </Link>
            <Link
              href="/safety"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              See our standards
            </Link>
          </div>
        </div>

        <div id="earnings" className="bg-surface border border-border rounded-3xl p-7">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-4">
            Sample weekly earnings
          </div>
          <div className="space-y-3">
            {[
              { label: "5 customers · 5 meals/wk · $13/meal", take: 286 },
              { label: "10 customers · 5 meals/wk · $13/meal", take: 572 },
              { label: "20 customers · 5 meals/wk · $13/meal", take: 1144 },
            ].map((row) => (
              <div key={row.label} className="bg-white rounded-2xl border border-border p-4 flex items-center justify-between gap-3">
                <div className="text-sm font-semibold flex-1">{row.label}</div>
                <div className="text-right">
                  <AnimatedNumber
                    value={row.take}
                    format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
                    className="m-display text-xl"
                  />
                  <div className="text-xs text-muted">your take / week</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-4 leading-relaxed">
            Illustrative. After 12% Mealed commission. Excludes delivery fees and tips.
          </p>
        </div>
      </section>

      {/* Benefits — bento grid */}
      <BentoFeatures />

      {/* Onboarding steps */}
      <section className="bg-surface border-y border-divider">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-20">
          <h2 className="m-display text-3xl md:text-4xl mb-9">How onboarding works.</h2>
          <ol className="grid md:grid-cols-4 gap-4">
            {[
              { n: "01", t: "Apply", d: "Tell us about your cooking, your kitchen, and what you'd like to sell." },
              { n: "02", t: "Verify", d: "ID + kitchen scan + credentials. Usually under 48 hours." },
              { n: "03", t: "List your menu", d: "Photos, prices, weekly availability. You're in control." },
              { n: "04", t: "Start earning", d: "Orders roll in. Payouts in 24 hours after each completed order." },
            ].map((s) => (
              <li key={s.n} className="bg-white border border-border rounded-2xl p-5">
                <div className="text-[11px] font-bold text-accent-deep bg-accent-soft inline-flex px-1.5 py-0.5 rounded">
                  {s.n}
                </div>
                <div className="mt-3 font-bold">{s.t}</div>
                <div className="mt-1 text-xs text-muted leading-relaxed">{s.d}</div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/signup?role=chef"
              className={buttonVariants({ size: "lg" })}
            >
              Start your application <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
