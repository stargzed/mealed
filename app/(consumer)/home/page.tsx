import { ChefHat, Flame, Leaf, Salad, Soup, Wheat } from "lucide-react";
import { SEED_CHEFS, SEED_MEALS, chefMap } from "@/lib/seed";
import { MealCard } from "@/components/marketplace/meal-card";
import { ChefCard } from "@/components/marketplace/chef-card";
import { RowHeader } from "@/components/marketplace/row-header";
import { HScroll } from "@/components/marketplace/h-scroll";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";

const CATEGORIES = [
  { label: "All", icon: null },
  { label: "High-protein", icon: <Flame size={14} /> },
  { label: "Vegan", icon: <Leaf size={14} /> },
  { label: "Family", icon: <ChefHat size={14} /> },
  { label: "Healthy", icon: <Salad size={14} /> },
  { label: "Gluten-Free", icon: <Wheat size={14} /> },
  { label: "Comfort Food", icon: <Soup size={14} /> },
] as const;

export default function ConsumerHome() {
  const featured = SEED_CHEFS.filter((c) => c.featured);
  const popular = SEED_MEALS.slice(0, 6);
  const highProtein = SEED_MEALS.filter((m) => m.tags.includes("High-Protein"));
  const healthy = SEED_MEALS.filter((m) =>
    m.tags.some((t) => ["Healthy", "Vegan", "Vegetarian", "Gluten-Free"].includes(t)),
  );

  return (
    <div className="space-y-9 py-3">
      {/* Categories */}
      <HScroll padding={16} gap={8}>
        {CATEGORIES.map((c, i) => (
          <Link key={c.label} href={`/categories/${encodeURIComponent(c.label.toLowerCase())}`}>
            <Chip active={i === 0} icon={c.icon}>
              {c.label}
            </Chip>
          </Link>
        ))}
      </HScroll>

      {/* Hero card */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-[var(--m-radius-lg)] overflow-hidden bg-ink text-white p-6 md:p-10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-3">
            This week's pick
          </div>
          <h2 className="m-display text-3xl md:text-5xl max-w-lg">
            Verified chefs near Echo Park.
          </h2>
          <p className="text-white/70 mt-4 max-w-md leading-relaxed">
            Browse hand-picked menus, custom request options, and same-week pickup
            from chefs within 5 miles.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center bg-white text-ink h-11 px-5 rounded-full font-bold text-sm mt-6"
          >
            Browse all chefs
          </Link>
        </div>
      </section>

      {/* Popular */}
      <section>
        <RowHeader title="Popular near you" subtitle="Echo Park · 1.2 mi" href="/browse" />
        <HScroll>
          {popular.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              chef={chefMap[meal.chefId]}
              width={200}
            />
          ))}
        </HScroll>
      </section>

      {/* Verified chefs */}
      <section>
        <RowHeader
          title="Verified chefs"
          subtitle="ID + kitchen reviewed"
          href="/browse"
        />
        <HScroll>
          {featured.map((chef) => (
            <ChefCard
              key={chef.id}
              chef={chef}
              dishes={SEED_MEALS.filter((m) => m.chefId === chef.id)}
              width={260}
            />
          ))}
        </HScroll>
      </section>

      {/* High protein */}
      <section>
        <RowHeader title="High-protein meals" href="/categories/high-protein" />
        <HScroll>
          {highProtein.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              chef={chefMap[meal.chefId]}
              width={200}
            />
          ))}
        </HScroll>
      </section>

      {/* Healthy / weekly prep */}
      <section>
        <RowHeader title="Healthy weekly prep" href="/categories/healthy" />
        <HScroll>
          {healthy.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              chef={chefMap[meal.chefId]}
              width={200}
            />
          ))}
        </HScroll>
      </section>

      {/* Custom requests strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-[var(--m-radius-lg)] bg-accent-soft border border-accent/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="max-w-lg">
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent-deep mb-2">
              Custom requests
            </div>
            <h3 className="m-display text-2xl md:text-3xl text-ink">
              Tell a chef exactly what you want.
            </h3>
            <p className="text-sub text-sm mt-2 leading-relaxed">
              Allergies, macros, budget. They'll quote you back in under 24 hours.
            </p>
          </div>
          <Link
            href={`/custom-request/${SEED_CHEFS[0].id}`}
            className="bg-ink text-white h-11 px-5 rounded-full font-bold text-sm inline-flex items-center justify-center"
          >
            Start a request
          </Link>
        </div>
      </section>
    </div>
  );
}
