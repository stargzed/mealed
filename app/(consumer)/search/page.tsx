"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { SEED_CHEFS, SEED_MEALS, chefMap } from "@/lib/seed";
import { Chip } from "@/components/ui/chip";
import { MealCard } from "@/components/marketplace/meal-card";
import { ChefCard } from "@/components/marketplace/chef-card";
import { EmptyState } from "@/components/states/empty-state";

const QUICK = ["High-Protein", "Vegan", "Family Meals", "Gluten-Free", "Comfort Food", "Cold Meals"];

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 md:px-6 py-12 text-muted">Loading…</div>}>
      <SearchInner />
    </Suspense>
  );
}

function SearchInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = (sp?.get("q") ?? "").trim();
  const query = q.toLowerCase();

  const meals = useMemo(() => {
    if (!query) return [];
    return SEED_MEALS.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.tags.some((t) => t.toLowerCase().includes(query)) ||
        (m.description ?? "").toLowerCase().includes(query),
    );
  }, [query]);

  const chefs = useMemo(() => {
    if (!query) return [];
    return SEED_CHEFS.filter(
      (c) =>
        c.displayName.toLowerCase().includes(query) ||
        c.specialty.toLowerCase().includes(query) ||
        c.neighborhood.toLowerCase().includes(query),
    );
  }, [query]);

  const setQ = (next: string) => {
    if (!next) router.replace("/search");
    else router.replace(`/search?q=${encodeURIComponent(next)}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <h1 className="m-display text-2xl md:text-3xl mb-2">Search</h1>
      <p className="text-sub text-sm">
        {q ? (
          <>
            Results for <span className="font-bold text-ink">"{q}"</span>
            {(meals.length || chefs.length) > 0 && (
              <span className="text-muted">
                {" "}
                · {meals.length} {meals.length === 1 ? "meal" : "meals"}, {chefs.length}{" "}
                {chefs.length === 1 ? "chef" : "chefs"}
              </span>
            )}
          </>
        ) : (
          "Type in the search bar above or pick a tag to get started."
        )}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {QUICK.map((tag) => (
          <Chip
            key={tag}
            active={q.toLowerCase() === tag.toLowerCase()}
            onClick={() => setQ(tag)}
          >
            {tag}
          </Chip>
        ))}
      </div>

      {q && meals.length === 0 && chefs.length === 0 && (
        <EmptyState
          icon={<SearchIcon size={20} />}
          title={`No results for "${q}"`}
          description="Try a different keyword or browse all meals."
          className="mt-8"
        />
      )}

      {meals.length > 0 && (
        <section className="mt-8">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="m-display text-xl">Meals</h2>
            <span className="text-xs text-muted">{meals.length} results</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {meals.map((m) => (
              <MealCard key={m.id} meal={m} chef={chefMap[m.chefId]} />
            ))}
          </div>
        </section>
      )}

      {chefs.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="m-display text-xl">Chefs</h2>
            <span className="text-xs text-muted">{chefs.length} results</span>
          </div>
          <div className="grid grid-cols-1 gap-5">
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
