"use client";

import { useMemo, useState } from "react";
import {
  TrendingUp,
  Users,
  Utensils,
  DollarSign,
  CalendarDays,
  CalendarRange,
  Receipt,
} from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

const COMMISSION_RATE = 0.12; // Mealed keeps 12%, chef keeps 88%.

interface Range {
  min: number;
  max: number;
  step: number;
}

const RANGES: Record<"customers" | "meals" | "price", Range> = {
  customers: { min: 1, max: 50, step: 1 },
  meals: { min: 1, max: 10, step: 1 },
  price: { min: 8, max: 30, step: 1 },
};

/**
 * Interactive weekly-earnings projection for chefs. Three sliders feed a live
 * calculation of weekly / monthly / yearly take (88% of gross after Mealed's
 * 12% commission). Replaces the old static "Sample weekly earnings" card.
 */
export function EarningsCalculator() {
  const [customers, setCustomers] = useState(10);
  const [meals, setMeals] = useState(5);
  const [price, setPrice] = useState(13);

  const { weekly, monthly, yearly, gross } = useMemo(() => {
    const g = customers * meals * price;
    const w = Math.round(g * (1 - COMMISSION_RATE));
    return { gross: g, weekly: w, monthly: Math.round(w * 4.33), yearly: w * 52 };
  }, [customers, meals, price]);

  const currency = {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  } as const;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-yolk-soft/60 via-white to-white">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-yolk/40 blur-3xl"
      />

      <div className="relative p-6 md:p-8">
        {/* Eyebrow + headline */}
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent-deep">
            Project your earnings
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-deep bg-accent-soft px-2 py-0.5 rounded-full">
            <TrendingUp size={11} /> Live
          </span>
        </div>

        {/* Big weekly number */}
        <div className="flex items-baseline gap-2 mt-2">
          <AnimatedNumber
            value={weekly}
            format={currency}
            className="m-display text-5xl md:text-6xl tracking-tight"
          />
          <span className="text-sm text-muted font-semibold">/ week</span>
        </div>
        <div className="mt-1 text-xs text-muted">
          Your take after Mealed's 12% commission.
        </div>

        {/* Sliders */}
        <div className="mt-7 space-y-5">
          <Slider
            icon={<Users size={14} />}
            label="Active customers"
            value={customers}
            onChange={setCustomers}
            range={RANGES.customers}
            display={`${customers}`}
          />
          <Slider
            icon={<Utensils size={14} />}
            label="Meals / customer / week"
            value={meals}
            onChange={setMeals}
            range={RANGES.meals}
            display={`${meals}`}
          />
          <Slider
            icon={<DollarSign size={14} />}
            label="Price per meal"
            value={price}
            onChange={setPrice}
            range={RANGES.price}
            display={`$${price}`}
          />
        </div>

        {/* Period summary */}
        <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
          <PeriodCard
            icon={<CalendarDays size={14} />}
            label="Monthly"
            value={monthly}
            format={currency}
          />
          <PeriodCard
            icon={<CalendarRange size={14} />}
            label="Yearly"
            value={yearly}
            format={currency}
            highlight
          />
          <PeriodCard
            icon={<Receipt size={14} />}
            label="Gross / wk"
            value={gross}
            format={currency}
            muted
          />
        </div>

        <p className="text-[11px] text-muted mt-5 leading-relaxed">
          Illustrative. After Mealed's 12% commission. Excludes delivery fees and
          tips — those go straight to you.
        </p>
      </div>
    </div>
  );
}

function Slider({
  icon,
  label,
  value,
  onChange,
  range,
  display,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  range: Range;
  display: string;
}) {
  const pct = ((value - range.min) / (range.max - range.min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-ink mb-1.5">
        <span className="inline-flex items-center gap-1.5 text-sub">
          <span className="text-muted">{icon}</span>
          {label}
        </span>
        <span className="m-display text-base text-ink leading-none">{display}</span>
      </div>
      <div className="relative h-7 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-soft border border-divider" />
        {/* Filled portion */}
        <div
          className="absolute h-1.5 rounded-full bg-ink"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="
            relative w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-ink
            [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(5,5,5,0.18)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-150
            hover:[&::-webkit-slider-thumb]:scale-110
            active:[&::-webkit-slider-thumb]:scale-95
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-ink
            [&::-moz-range-thumb]:cursor-pointer
          "
        />
      </div>
    </div>
  );
}

function PeriodCard({
  icon,
  label,
  value,
  format,
  highlight,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  format: Intl.NumberFormatOptions;
  highlight?: boolean;
  muted?: boolean;
}) {
  // Three distinct styles so the row doesn't feel like a row of identical pills:
  //  - highlight (yearly):  filled accent card, the "wow" tile
  //  - muted (gross/wk):    minimal, no border fill, just stats
  //  - default (monthly):   ink-tinted card with hover lift
  const wrapBase =
    "group relative rounded-2xl p-3.5 transition-all duration-300 flex flex-col min-w-0 overflow-hidden";
  const wrapTone = highlight
    ? "bg-gradient-to-br from-accent to-accent-deep text-white shadow-[0_10px_30px_-12px_rgba(0,184,107,0.55)]"
    : muted
    ? "bg-white/40 backdrop-blur-sm"
    : "bg-ink/[0.04] hover:bg-ink/[0.07] hover:-translate-y-0.5";

  const labelTone = highlight
    ? "text-white/80"
    : muted
    ? "text-muted"
    : "text-sub";

  const iconTone = highlight
    ? "bg-white/20 text-white"
    : muted
    ? "bg-soft text-muted"
    : "bg-white text-ink";

  const numberTone = highlight
    ? "text-3xl text-white"
    : muted
    ? "text-xl text-muted"
    : "text-2xl text-ink";

  return (
    <div className={`${wrapBase} ${wrapTone}`}>
      {/* Decorative glow on the highlighted card */}
      {highlight && (
        <div
          aria-hidden
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/15 blur-2xl"
        />
      )}

      <div className="flex items-center gap-1.5 relative">
        <span
          className={`inline-flex w-5 h-5 items-center justify-center rounded-md ${iconTone}`}
        >
          {icon}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${labelTone}`}
        >
          {label}
        </span>
      </div>

      <AnimatedNumber
        value={value}
        format={format}
        className={`m-display mt-2 leading-none truncate w-full relative ${numberTone}`}
      />
    </div>
  );
}
