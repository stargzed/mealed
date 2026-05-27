import Link from "next/link";
import { ArrowRight, Zap, Camera, Check, ChefHat, MapPin, Search, Shield, Star, Truck } from "lucide-react";
import { SEED_CHEFS, SEED_MEALS, chefMap } from "@/lib/seed";
import { ChefCard } from "@/components/marketplace/chef-card";
import { buttonVariants } from "@/components/ui/button";
import { Mascot } from "@/components/brand/mascot";
import { MealImage } from "@/components/brand/meal-image";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { Rating } from "@/components/ui/rating";
import { TrustPill } from "@/components/marketing/trust-pill";
import { LandingHeroSearch } from "@/components/marketing/landing-hero-search";
import { SavingsChart } from "@/components/marketing/savings-chart";
import { FindMealsButton } from "@/components/marketing/find-meals-button";

export default function LandingPage() {
  // Show 3 chefs in the trust grid below (top-rated, verified). The old `featured`
  // flag only covered 2, leaving a gap on the 3-column row.
  const featured = SEED_CHEFS.filter((c) => c.verified)
    .slice()
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 md:px-12 py-12 md:py-20 grid md:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <div className="mb-5">
            <TrustPill />
          </div>
          <h1 className="m-display text-5xl md:text-6xl lg:text-7xl">
            Home-cooked meal prep<br className="hidden sm:block" />
            <span> from trusted local chefs.</span>
          </h1>
          <p className="text-base md:text-lg text-sub mt-5 max-w-[480px] leading-relaxed">
            Find verified chefs near you for weekly meal prep, custom plans, pickup,
            or delivery. Meal prep, made local.
          </p>

          <LandingHeroSearch />

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Shield size={13} /> Verified chefs only
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={13} /> Kitchen reviewed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap size={13} /> Same-week pickup
            </span>
          </div>
        </div>

        {/* Hero collage */}
        <div className="relative h-[420px] md:h-[520px] hidden md:block">
          <div className="absolute top-0 left-0 w-[320px] rounded-[22px] overflow-hidden bg-white border border-border shadow-lg">
            <div className="h-[200px] relative">
              <MealImage meal={SEED_MEALS[2]} label={false} />
              <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/95 text-[10px] font-bold tracking-wide">
                5 MEALS · $52
              </span>
            </div>
            <div className="p-4">
              <div className="text-[15px] font-bold mb-1">{SEED_MEALS[2].name}</div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{chefMap[SEED_MEALS[2].chefId].displayName}</span>
                <span>·</span>
                <Rating value={SEED_MEALS[2].rating} count={SEED_MEALS[2].reviewCount} small />
              </div>
            </div>
          </div>

          <div className="absolute top-[60px] right-0 w-[280px] rounded-[22px] overflow-hidden bg-white border border-border shadow-lg">
            <div className="grid gap-[2px] bg-border" style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", height: 180 }}>
              <div className="relative row-span-2">
                <MealImage meal={SEED_MEALS[4]} label={false} />
              </div>
              <div className="relative">
                <MealImage meal={SEED_MEALS[5]} label={false} />
              </div>
              <div className="relative">
                <MealImage meal={SEED_MEALS[6]} label={false} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2.5">
                <ChefAvatar chef={chefMap.lina} size={36} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold">Chef Lina</span>
                    <span className="m-vdot" />
                  </div>
                  <div className="text-[11px] text-muted">Vegan & gluten-free</div>
                </div>
              </div>
              <div className="mt-3 px-2.5 py-2 bg-soft rounded-md text-xs flex justify-between">
                <Rating value={4.95} count={367} small />
                <span className="text-muted">0.8 mi · delivers</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-12 w-[280px] rounded-[18px] bg-white border border-border p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-ink flex items-center justify-center">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <span className="text-[13px] font-bold">Order confirmed</span>
              <span className="text-[10px] font-bold bg-accent-soft text-accent-deep px-1.5 py-0.5 rounded ml-auto">
                PENDING
              </span>
            </div>
            <div className="m-mono text-[11px] text-muted">MEAL-102938 · Sun 5:30 PM</div>
            <div className="flex justify-between items-baseline mt-2">
              <span className="text-xs text-sub">5 meals · Chef Maya · delivery</span>
              <span className="text-sm font-bold">$57.71</span>
            </div>
          </div>

          <div className="absolute bottom-20 right-8 w-[196px] bg-ink text-white rounded-2xl px-3.5 py-3 shadow-lg">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-bold tracking-wider text-accent">
                CUSTOM REQUEST
              </span>
            </div>
            <div className="text-xs leading-relaxed opacity-90">
              "10 high-protein meals, no dairy, under $130. Mostly chicken."
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-divider bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Every Mealed chef
          </span>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-sub">
            <span className="inline-flex items-center gap-1.5">
              <Shield size={14} /> ID verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Camera size={14} /> 360° kitchen scan
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} /> Sink visible in prep
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} /> Reviews per dish
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24">
        <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
              For consumers
            </div>
            <h2 className="m-display text-3xl md:text-5xl">How Mealed works.</h2>
          </div>
          <Link
            href="/become-a-chef"
            className={buttonVariants({ variant: "secondary" })}
          >
            For chefs <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { n: "01", t: "Tell us your diet", d: "Allergies, goals, meals per week. Takes 90 seconds." },
            { n: "02", t: "Discover chefs", d: "Verified home chefs near you, ranked by dish ratings." },
            { n: "03", t: "Order weekly or custom", d: "Pick from this week's menu or request a personal plan." },
            { n: "04", t: "Pickup or delivery", d: "Depends on the chef. Track every order to the door." },
            { n: "05", t: "Review per dish", d: "Help future eaters. Rate the chef and each meal." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border p-5 bg-white">
              <div className="text-[11px] font-bold text-accent-deep bg-accent-soft inline-flex px-1.5 py-0.5 rounded">
                {s.n}
              </div>
              <div className="mt-3 font-bold">{s.t}</div>
              <div className="mt-1 text-xs text-muted leading-relaxed">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured chefs */}
      <section className="bg-surface border-y border-divider">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <div className="mb-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
              Verified chefs
            </div>
            <h2 className="m-display text-2xl md:text-4xl">Cooked by people you can trust.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((chef) => (
              <ChefCard
                key={chef.id}
                chef={chef}
                dishes={SEED_MEALS.filter((m) => m.chefId === chef.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Savings */}
      <section className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
            Eat better, spend less
          </div>
          <h2 className="m-display text-3xl md:text-5xl">
            Save $50–$70 per week
            <br />replacing one meal a day.
          </h2>
          <p className="text-base text-sub mt-5 leading-relaxed max-w-[520px]">
            Compared to $20–$30+ fast food meals, Mealed-style home-cooked meals at
            $13–$18 can save customers around $8–$10 per meal — without the prep work.
          </p>
          <FindMealsButton />
        </div>
        <SavingsChart />
      </section>

      {/* Chef CTA */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2">
              For chefs
            </div>
            <h2 className="m-display text-3xl md:text-5xl">
              Cook for your neighborhood.
            </h2>
            <p className="text-base text-white/70 mt-5 leading-relaxed max-w-[520px]">
              Set your own menu. Choose pickup or delivery. Keep 88% of every order.
              Mealed handles checkout, taxes, and payouts.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="/become-a-chef"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Become a chef
              </Link>
              <Link
                href="/safety"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-[22px] rounded-full text-[15px] font-bold tracking-tight transition-all bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/60"
              >
                See our standards
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { Icon: ChefHat, t: "Own your menu", d: "Weekly drops, custom plans, your prices." },
              { Icon: Truck, t: "Pickup or delivery", d: "You choose. Mealed handles routing." },
              { Icon: Shield, t: "Built-in trust", d: "Verified chef badge, kitchen scan, dish reviews." },
              { Icon: Zap, t: "Fast payouts", d: "24 hours after a completed order." },
            ].map((b) => (
              <div key={b.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <b.Icon size={20} className="text-accent" />
                <div className="font-bold mt-3">{b.t}</div>
                <div className="text-xs text-white/70 mt-1 leading-relaxed">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 text-center">
        <div className="flex justify-center mb-6">
          <Mascot size={56} />
        </div>
        <h2 className="m-display text-4xl md:text-6xl">
          Meal prep, made local.
        </h2>
        <p className="text-base text-sub max-w-md mx-auto mt-5">
          Browse chefs in your neighborhood. Order this week's prep in under a minute.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            href="/browse"
            className={buttonVariants({ size: "lg" })}
          >
            <Search size={16} /> Find meals near me
          </Link>
          <Link
            href="/become-a-chef"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Become a chef
          </Link>
        </div>
      </section>
    </div>
  );
}
