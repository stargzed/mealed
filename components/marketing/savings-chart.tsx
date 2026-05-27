"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  ChefHat,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Package,
} from "lucide-react";

interface Row {
 Icon: typeof ChefHat;
 label: string;
 weeklyLabel: string;
 perMeal: string;
 /** Weekly cost in dollars drives the bar width. */
 weekly: number;
 tone: "default" | "highlight";
 /** Extra inline note shown after the weekly label (e.g. cooking time). */
 note?: string;
}

const ROWS: Row[] = [
 {
  Icon: UtensilsCrossed,
  label: "Fast food lunch",
  weeklyLabel: "$110",
  weekly: 110,
  perMeal: "$22",
  tone: "default",
 },
 {
  Icon: ShoppingBag,
  label: "Restaurant meal prep",
  weeklyLabel: "$90",
  weekly: 90,
  perMeal: "$18",
  tone: "default",
 },
 {
  Icon: Package,
  label: "Mail-delivery meal prep",
  weeklyLabel: "$75",
  weekly: 75,
  perMeal: "$15",
  tone: "default",
  note: "frozen / shipped",
 },
 {
  Icon: ChefHat,
  label: "Mealed",
  weeklyLabel: "$65",
  weekly: 65,
  perMeal: "$13",
  tone: "highlight",
 },
 {
  Icon: Clock,
  label: "DIY meal prep",
  weeklyLabel: "$40",
  weekly: 40,
  perMeal: "$8",
  tone: "default",
  note: "+ 2 hrs/wk of prep",
 },
];

const MAX = Math.max(...ROWS.map((r) => r.weekly));

/**
 * Horizontal bar-chart take on the old "savings cards" tile grid. Each option
 * gets a single row: icon + label on the left, a bar sized to weekly cost,
 * and the per-meal price on the right. Mealed's row is highlighted as the
 * value winner. Bars animate in on mount.
 */
export function SavingsChart() {
 // Trigger the bar-fill animation once the component is mounted client-side.
 const [mounted, setMounted] = useState(false);
 useEffect(() => {
  const t = requestAnimationFrame(() => setMounted(true));
  return () => cancelAnimationFrame(t);
 }, []);

 return (
  <div className="rounded-3xl border border-border bg-white p-6 md:p-7 shadow-soft">
   {/* Header strip */}
   <div className="flex items-center justify-between mb-6">
    <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
     Weekly meal cost
    </div>
    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-deep bg-accent-soft px-2 py-1 rounded-full">
     <Sparkles size={11} /> Mealed saves $25–$45 / wk
    </div>
   </div>

   <div className="space-y-3.5">
    {ROWS.map((row, i) => {
     const pct = (row.weekly / MAX) * 100;
     const isHighlight = row.tone === "highlight";
     return (
      <div key={row.label} className="group">
       {/* Label row */}
       <div className="flex items-center justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
         <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0 ${
           isHighlight
            ? "bg-accent text-white"
            : "bg-soft text-muted"
          }`}
         >
          <row.Icon size={13} strokeWidth={2} />
         </span>
         <span
          className={`text-sm font-bold truncate ${
           isHighlight ? "text-ink" : "text-sub"
          }`}
         >
          {row.label}
         </span>
         {isHighlight && (
          <span className="text-[9px] font-bold uppercase tracking-wider bg-yolk text-ink px-1.5 py-0.5 rounded">
           Best value
          </span>
         )}
        </div>
        <div className="m-display text-base text-ink shrink-0">
         {row.perMeal}
         <span className="text-[10px] text-muted font-sans font-normal ml-0.5">
          /meal
         </span>
        </div>
       </div>

       {/* Bar */}
       <div className="relative h-7 rounded-lg bg-soft/60 overflow-hidden">
        <div
         className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-700 ease-out ${
          isHighlight
           ? "bg-gradient-to-r from-accent to-accent-deep"
           : "bg-ink/15"
         }`}
         style={{
          width: mounted ? `${pct}%` : "0%",
          transitionDelay: `${i * 80}ms`,
         }}
        />
        <div className="relative h-full flex items-center justify-between px-3">
         <span
          className={`text-[12px] font-bold ${
           isHighlight ? "text-white" : "text-ink"
          }`}
         >
          {row.weeklyLabel}
          {row.note && (
           <span className="ml-1.5 font-normal text-[11px] opacity-70">
            {row.note}
           </span>
          )}
         </span>
        </div>
       </div>
      </div>
     );
    })}
   </div>

   <p className="text-[11px] text-muted mt-5 leading-relaxed">
    Based on 5 meals / week. DIY price excludes 2+ hours of weekly prep time.
   </p>
  </div>
 );
}
