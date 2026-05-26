"use client";

import Link from "next/link";
import type { ChefProfile, Meal } from "@/lib/types";
import { MealImage } from "@/components/brand/meal-image";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

interface Props {
  chef: ChefProfile;
  dishes: Meal[];
  width?: number;
  className?: string;
}

export function ChefCard({ chef, dishes, width, className }: Props) {
  const preview = dishes.slice(0, 3);
  return (
    <Link
      href={`/chefs/${chef.id}`}
      className={cn(
        "group block flex-shrink-0 rounded-[var(--m-radius-lg)] overflow-hidden bg-white border border-border",
        "transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-ink/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
        className,
      )}
      style={width ? { width } : undefined}
    >
      <div
        className="grid gap-[2px] bg-border overflow-hidden"
        style={{
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "1fr 1fr",
          height: width ? width * 0.7 : 180,
        }}
      >
        {preview[0] && (
          <div className="relative row-span-2 overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
              <MealImage meal={preview[0]} label={false} />
            </div>
          </div>
        )}
        {preview[1] && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
              <MealImage meal={preview[1]} label={false} />
            </div>
          </div>
        )}
        {preview[2] && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
              <MealImage meal={preview[2]} label={false} />
            </div>
          </div>
        )}
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-2.5 mb-2">
          <ChefAvatar chef={chef} size={36} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight transition-colors group-hover:text-accent-deep">
                {chef.displayName}
              </span>
              {chef.verified && <span className="m-vdot" />}
            </div>
            <div className="text-[11px] text-muted mt-0.5 truncate">
              {chef.specialty}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Rating value={chef.rating} count={chef.reviewCount} small />
          <span className="text-[11px] text-muted">
            {chef.neighborhood.split("·")[1]?.trim()}
          </span>
        </div>
      </div>
    </Link>
  );
}
