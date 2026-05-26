"use client";

import { use, useMemo } from "react";
import { useParams } from "next/navigation";
import { SEED_MEALS, chefMap } from "@/lib/seed";
import { MealCard } from "@/components/marketplace/meal-card";
import { EmptyState } from "@/components/states/empty-state";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const slug = decodeURIComponent(params.category ?? "");
  const display = slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  const meals = useMemo(
    () =>
      SEED_MEALS.filter((m) =>
        m.tags.some((t) => t.toLowerCase().replace(" ", "-") === slug.toLowerCase()),
      ),
    [slug],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-8">
      <Link href="/browse" className="text-xs text-muted hover:text-ink">
        ← Browse
      </Link>
      <h1 className="m-display text-3xl md:text-5xl mt-2">{display}</h1>
      <p className="text-sub mt-2">
        {meals.length} {meals.length === 1 ? "meal" : "meals"} matching this category.
      </p>

      {meals.length === 0 ? (
        <EmptyState
          title={`No ${display.toLowerCase()} meals yet`}
          description="Check back soon as more chefs join the platform."
          className="mt-8"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} chef={chefMap[meal.chefId]} />
          ))}
        </div>
      )}
    </div>
  );
}
