"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SEED_MEALS } from "@/lib/seed";
import { MealImage } from "@/components/brand/meal-image";
import { Button } from "@/components/ui/button";

const CHEF_ID = "maya";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ChefMenuPage() {
  const meals = SEED_MEALS.filter((m) => m.chefId === CHEF_ID);
  const [assignments, setAssignments] = useState<Record<string, string[]>>({});

  const toggle = (mealId: string, day: string) => {
    setAssignments((a) => {
      const cur = a[mealId] ?? [];
      return {
        ...a,
        [mealId]: cur.includes(day) ? cur.filter((d) => d !== day) : [...cur, day],
      };
    });
  };

  return (
    <div className="max-w-6xl">
      <header className="flex items-end justify-between mb-6">
        <div>
          <h1 className="m-display text-3xl">This week's menu</h1>
          <p className="text-sub text-sm mt-1">
            Auto-publishes Thursdays at 6pm. Tap the days you'll offer each meal.
          </p>
        </div>
        <Button onClick={() => toast.success("Menu saved")}>Save menu</Button>
      </header>

      <div className="bg-white border border-border rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Meal
              </th>
              {DAYS.map((d) => (
                <th key={d} className="px-2 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id} className="border-b border-divider last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <MealImage meal={meal} label={false} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{meal.name}</div>
                      <div className="text-xs text-muted">
                        ${meal.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </td>
                {DAYS.map((d) => {
                  const active = assignments[meal.id]?.includes(d);
                  return (
                    <td key={d} className="px-2 py-3 text-center">
                      <button
                        onClick={() => toggle(meal.id, d)}
                        className={`w-9 h-9 rounded-full text-xs font-bold ${
                          active
                            ? "bg-accent text-white"
                            : "bg-soft text-muted hover:bg-border"
                        }`}
                      >
                        {active ? "✓" : "+"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
