"use client";

import { useState } from "react";
import type { Meal } from "@/lib/types";
import { PALETTES } from "@/lib/seed/palettes";

interface Props {
  meal: Pick<Meal, "name" | "palette" | "imageUrl">;
  label?: boolean;
  className?: string;
}

export function MealImage({ meal, label = true, className = "" }: Props) {
  const [ok, setOk] = useState(true);
  const pal = PALETTES[meal.palette] ?? PALETTES.bowl;

  return (
    <div
      className={`m-mealimg ${className}`}
      style={{ ["--mi-1" as string]: pal[0], ["--mi-2" as string]: pal[1] }}
    >
      {meal.imageUrl && ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meal.imageUrl}
          alt=""
          onError={() => setOk(false)}
          className="absolute inset-0 w-full h-full object-cover z-[1] block"
        />
      )}
      {label && (!meal.imageUrl || !ok) && (
        <span className="m-mealimg__label">
          {meal.name.split(" ").slice(-2).join(" ").toUpperCase()}
        </span>
      )}
    </div>
  );
}
