"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Meal, ChefProfile } from "@/lib/types";
import { MealImage } from "@/components/brand/meal-image";
import { Rating } from "@/components/ui/rating";
import { formatPrice, cn } from "@/lib/utils";
import { useFavorites } from "@/lib/favorites/store";

interface Props {
  meal: Meal;
  chef?: Pick<ChefProfile, "id" | "displayName">;
  width?: number;
  className?: string;
}

export function MealCard({ meal, chef, width, className }: Props) {
  const isFav = useFavorites((s) => s.meals.includes(meal.id));
  const toggle = useFavorites((s) => s.toggleMeal);

  return (
    <Link
      href={`/meals/${meal.id}`}
      className={cn(
        "group block flex-shrink-0 text-left",
        "transition-transform duration-200 ease-out hover:-translate-y-1 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 rounded-[var(--m-radius)]",
        className,
      )}
      style={width ? { width } : undefined}
    >
      <div className="relative w-full aspect-[5/4] rounded-[var(--m-radius)] overflow-hidden bg-soft transition-shadow duration-200 group-hover:shadow-lg">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
          <MealImage meal={meal} />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(meal.id);
          }}
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center z-[3] shadow transition-transform duration-150 hover:scale-110 active:scale-95",
            isFav ? "text-tomato" : "text-ink hover:text-tomato",
          )}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={15} fill={isFav ? "currentColor" : "none"} />
        </button>
        {meal.bundle && (
          <span className="absolute top-2 left-2 z-[2] px-2 py-1 rounded-md text-[10px] font-bold bg-white/95 text-ink tracking-wide">
            {meal.bundle.label ?? `${meal.bundle.count} MEALS · $${meal.bundle.price}`}
          </span>
        )}
      </div>
      <div className="pt-2.5">
        <div className="flex justify-between items-baseline gap-2">
          <span className="text-sm font-bold leading-tight text-ink line-clamp-1 transition-colors group-hover:text-accent-deep">
            {meal.name}
          </span>
          <span className="text-sm font-bold text-ink tabular-nums">
            {formatPrice(meal.price)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-muted text-xs">
          {chef && <span>{chef.displayName}</span>}
          {chef && <span>·</span>}
          <Rating value={meal.rating} count={meal.reviewCount} small />
        </div>
      </div>
    </Link>
  );
}
