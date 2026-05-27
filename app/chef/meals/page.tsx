"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Plus, Power, Trash2 } from "lucide-react";
import { SEED_MEALS } from "@/lib/seed";
import { MealImage } from "@/components/brand/meal-image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { formatPrice } from "@/lib/utils";
import { useChefMeals } from "@/lib/chef-meals/store";
import type { Meal } from "@/lib/types";

const CHEF_ID = "maya";

export default function ChefMealsPage() {
 const [hydrated, setHydrated] = useState(false);
 const owned = useChefMeals((s) => s.meals.filter((m) => m.chefId === CHEF_ID));
 const removeOwned = useChefMeals((s) => s.remove);
 const update = useChefMeals((s) => s.update);
 useEffect(() => setHydrated(true), []);

 // Locally-created meals first, then the seed meals. Avoid hydration mismatch
 // by only merging in the persisted ones after mount.
 const seeded = SEED_MEALS.filter((m) => m.chefId === CHEF_ID);
 const meals: Meal[] = hydrated ? [...owned, ...seeded] : seeded;

 return (
  <div className="max-w-6xl">
   <header className="flex items-end justify-between mb-6">
    <div>
     <h1 className="m-display text-3xl">My meals</h1>
     <p className="text-sub text-sm mt-1">
      {meals.length} listed · {meals.filter((m) => m.active).length} active
      {hydrated && owned.length > 0 && (
       <> · <span className="text-accent-deep font-semibold">{owned.length} new</span></>
      )}
     </p>
    </div>
    <Link href="/chef/meals/new" className={buttonVariants({})}>
     <Plus size={15} /> Add a meal
    </Link>
   </header>

   <div className="bg-white border border-border rounded-2xl divide-y divide-divider overflow-hidden">
    {meals.map((meal) => {
     const isOwned = owned.some((m) => m.id === meal.id);
     return (
      <div key={meal.id} className="p-4 flex items-center gap-4">
       <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <MealImage meal={meal} label={false} />
       </div>
       <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
         <div className="font-bold text-sm">{meal.name}</div>
         {isOwned && (
          <Badge variant="accent" className="!h-4 !text-[9px]">New</Badge>
         )}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 items-center">
         <Rating value={meal.rating} count={meal.reviewCount} small />
         <span className="text-xs text-muted">{formatPrice(meal.price)}</span>
         {meal.bundle && (
          <Badge variant="outline">
           {meal.bundle.count} × ${meal.bundle.price}
          </Badge>
         )}
        </div>
       </div>
       <div className="flex items-center gap-2">
        <Badge variant={meal.active ? "verified" : "outline"}>
         {meal.active ? "Active" : "Paused"}
        </Badge>
        <button
         onClick={() => {
          if (isOwned) {
           update(meal.id, { active: !meal.active });
           toast(`${meal.active ? "Paused" : "Resumed"} ${meal.name}`);
          } else {
           toast("Toggling seed meals isn't persisted create your own to manage.");
          }
         }}
         className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-soft"
         aria-label="Toggle active"
        >
         <Power size={14} />
        </button>
        {isOwned ? (
         <button
          onClick={() => {
           removeOwned(meal.id);
           toast(`Removed ${meal.name}`);
          }}
          className="w-9 h-9 rounded-full text-muted hover:text-tomato hover:bg-tomato-soft flex items-center justify-center"
          aria-label="Delete"
         >
          <Trash2 size={14} />
         </button>
        ) : (
         <button
          onClick={() =>
           toast("Seed meals are read-only. Tap + Add a meal to create your own.")
          }
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-soft"
          aria-label="Edit"
         >
          <Pencil size={14} />
         </button>
        )}
       </div>
      </div>
     );
    })}
   </div>
  </div>
 );
}
