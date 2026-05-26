"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PillOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface Props<T extends string = string> {
  value: T;
  onChange: (v: T) => void;
  options: PillOption<T>[];
  size?: "sm" | "md" | "lg";
  block?: boolean;
  className?: string;
  ariaLabel?: string;
}

const SIZE = {
  sm: { h: "h-8", padX: "px-3", text: "text-xs" },
  md: { h: "h-10", padX: "px-4", text: "text-sm" },
  lg: { h: "h-12", padX: "px-5", text: "text-[15px]" },
} as const;

// A pill-group toggle with a sliding "active" indicator. The active pill
// gets a white card on top of the soft track. Indicator and label both
// animate so it feels alive instead of just swapping classes.
export function PillToggle<T extends string>({
  value,
  onChange,
  options,
  size = "md",
  block = false,
  className,
  ariaLabel,
}: Props<T>) {
  const s = SIZE[size];
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });
  const itemRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  // Position the indicator over the active option after layout.
  React.useLayoutEffect(() => {
    const node = itemRefs.current.get(value);
    const track = trackRef.current;
    if (!node || !track) return;
    const r = node.getBoundingClientRect();
    const t = track.getBoundingClientRect();
    setIndicator({ left: r.left - t.left, width: r.width });
  }, [value, options.length, size]);

  // Re-measure on resize for responsive layouts.
  React.useEffect(() => {
    const onResize = () => {
      const node = itemRefs.current.get(value);
      const track = trackRef.current;
      if (!node || !track) return;
      const r = node.getBoundingClientRect();
      const t = track.getBoundingClientRect();
      setIndicator({ left: r.left - t.left, width: r.width });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [value]);

  return (
    <div
      ref={trackRef}
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex p-1 rounded-full bg-soft",
        block && "w-full",
        className,
      )}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 rounded-full bg-white shadow-soft transition-all duration-300 ease-[cubic-bezier(.32,.72,0,1)]",
        )}
        style={{ left: indicator.left, width: indicator.width }}
      />
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              if (el) itemRefs.current.set(opt.value, el);
              else itemRefs.current.delete(opt.value);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={cn(
              "relative z-[1] inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-colors duration-200",
              s.h,
              s.padX,
              s.text,
              block && "flex-1",
              opt.disabled
                ? "text-faint cursor-not-allowed"
                : active
                ? "text-ink"
                : "text-sub hover:text-ink",
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
