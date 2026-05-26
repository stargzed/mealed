"use client";

import { useMemo, useState } from "react";
import { ChefHat, Flame, Leaf, Salad, ShieldCheck, Soup, Store, Truck, UtensilsCrossed, Users, Wheat } from "lucide-react";
import { SEED_CHEFS, SEED_MEALS, chefMap } from "@/lib/seed";
import { MealCard } from "@/components/marketplace/meal-card";
import { ChefCard } from "@/components/marketplace/chef-card";
import { Chip } from "@/components/ui/chip";
import { PillToggle } from "@/components/ui/pill-toggle";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/states/empty-state";

const CATEGORIES = [
  { label: "All", value: null, icon: null },
  { label: "High-protein", value: "High-Protein", icon: <Flame size={14} /> },
  { label: "Vegan", value: "Vegan", icon: <Leaf size={14} /> },
  { label: "Family", value: "Family Meals", icon: <ChefHat size={14} /> },
  { label: "Healthy", value: "Healthy", icon: <Salad size={14} /> },
  { label: "Gluten-Free", value: "Gluten-Free", icon: <Wheat size={14} /> },
  { label: "Comfort Food", value: "Comfort Food", icon: <Soup size={14} /> },
] as const;

type Fulfillment = "all" | "pickup" | "delivery";

export default function BrowsePage() {
  const [category, setCategory] = useState<string | null>(null);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [view, setView] = useState<"meals" | "chefs">("meals");

  const filteredMeals = useMemo(() => {
    return SEED_MEALS.filter((m) => {
      const chef = chefMap[m.chefId];
      if (category && !m.tags.includes(category)) return false;
      if (fulfillment === "pickup" && !chef?.pickupEnabled) return false;
      if (fulfillment === "delivery" && !chef?.deliveryEnabled) return false;
      if (verifiedOnly && !chef?.verified) return false;
      return true;
    });
  }, [category, fulfillment, verifiedOnly]);

  const filteredChefs = useMemo(() => {
    return SEED_CHEFS.filter((c) => {
      if (verifiedOnly && !c.verified) return false;
      if (fulfillment === "pickup" && !c.pickupEnabled) return false;
      if (fulfillment === "delivery" && !c.deliveryEnabled) return false;
      return true;
    });
  }, [fulfillment, verifiedOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-8">
      <div className="flex items-baseline justify-between mb-5 gap-3 flex-wrap">
        <h1 className="m-display text-2xl md:text-4xl">Browse</h1>
        <PillToggle
          value={view}
          onChange={setView}
          options={[
            { value: "meals", label: "Meals", icon: <UtensilsCrossed size={14} /> },
            { value: "chefs", label: "Chefs", icon: <Users size={14} /> },
          ]}
          size="sm"
          ariaLabel="Browse meals or chefs"
        />
      </div>

      {/* Filter bar */}
      <div className="space-y-3">
        <div className="m-noscroll-x flex gap-2 -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map((c) => (
            <Chip
              key={c.label}
              active={(c.value ?? null) === category}
              icon={c.icon}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PillToggle
            value={fulfillment}
            onChange={setFulfillment}
            options={[
              { value: "all", label: "All" },
              { value: "pickup", label: "Pickup", icon: <Store size={13} /> },
              { value: "delivery", label: "Delivery", icon: <Truck size={13} /> },
            ]}
            size="sm"
            ariaLabel="Filter by fulfillment"
          />
          <button
            onClick={() => setVerifiedOnly((v) => !v)}
            className={`h-9 px-4 rounded-full text-[13px] font-semibold transition-all duration-150 inline-flex items-center gap-1.5 active:scale-[.97] ${
              verifiedOnly
                ? "bg-accent text-white shadow-soft hover:bg-accent-hover"
                : "bg-soft text-sub hover:bg-border/60 hover:text-ink"
            }`}
          >
            <ShieldCheck size={13} />
            Verified only
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-7">
        {view === "meals" ? (
          filteredMeals.length === 0 ? (
            <EmptyState
              title="No meals match these filters"
              description="Try clearing some filters or changing the category."
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCategory(null);
                    setFulfillment("all");
                    setVerifiedOnly(false);
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} chef={chefMap[meal.chefId]} />
              ))}
            </div>
          )
        ) : filteredChefs.length === 0 ? (
          <EmptyState
            title="No chefs match these filters"
            description="Try toggling pickup/delivery or removing the verified filter."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChefs.map((chef) => (
              <ChefCard
                key={chef.id}
                chef={chef}
                dishes={SEED_MEALS.filter((m) => m.chefId === chef.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
