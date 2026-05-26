"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { SEED_MEALS, SEED_CHEFS, chefMap } from "@/lib/seed";
import { MealCard } from "@/components/marketplace/meal-card";
import { ChefCard } from "@/components/marketplace/chef-card";
import { EmptyState } from "@/components/states/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { useFavorites } from "@/lib/favorites/store";

export default function FavoritesPage() {
  const [hydrated, setHydrated] = useState(false);
  const mealIds = useFavorites((s) => s.meals);
  const chefIds = useFavorites((s) => s.chefs);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;

  const meals = SEED_MEALS.filter((m) => mealIds.includes(m.id));
  const chefs = SEED_CHEFS.filter((c) => chefIds.includes(c.id));

  if (meals.length === 0 && chefs.length === 0) {
    return (
      <div className="m-6">
        <EmptyState
          icon={<Heart size={20} />}
          title="No favorites yet"
          description="Tap the heart on any meal or chef to save it for later."
          action={
            <Link href="/browse" className={buttonVariants({})}>
              Browse meals
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-5 md:py-8 space-y-10">
      <div>
        <h1 className="m-display text-3xl md:text-4xl">Favorites</h1>
      </div>

      {meals.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
            Meals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals.map((m) => (
              <MealCard key={m.id} meal={m} chef={chefMap[m.chefId]} />
            ))}
          </div>
        </section>
      )}

      {chefs.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
            Chefs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {chefs.map((c) => (
              <ChefCard
                key={c.id}
                chef={c}
                dishes={SEED_MEALS.filter((m) => m.chefId === c.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
