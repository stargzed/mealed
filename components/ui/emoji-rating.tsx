"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value?: number;
  onChange?: (rating: number) => void;
  className?: string;
}

const RATINGS = [
  { emoji: "😔", label: "Terrible" },
  { emoji: "😕", label: "Poor" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😍", label: "Amazing" },
];

export function EmojiRating({ value: controlled, onChange, className }: Props) {
  const [internal, setInternal] = useState(0);
  const [hover, setHover] = useState(0);
  const value = controlled ?? internal;
  const display = hover || value;

  const handleClick = (next: number) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      <div className="flex items-center gap-2 md:gap-3">
        {RATINGS.map((item, i) => {
          const slot = i + 1;
          const isActive = slot <= display;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => handleClick(slot)}
              onMouseEnter={() => setHover(slot)}
              onMouseLeave={() => setHover(0)}
              className="group relative focus:outline-none"
              aria-label={`Rate ${slot}: ${item.label}`}
            >
              <span
                className={cn(
                  "relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl transition-all duration-300 ease-out",
                  isActive ? "scale-110" : "scale-100 group-hover:scale-105",
                )}
              >
                <span
                  className={cn(
                    "text-2xl md:text-3xl transition-all duration-300 ease-out select-none",
                    isActive
                      ? "grayscale-0 drop-shadow"
                      : "grayscale opacity-40 group-hover:opacity-70 group-hover:grayscale-[.3]",
                  )}
                >
                  {item.emoji}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="relative h-6 w-40">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
            display > 0 ? "opacity-0 blur-md scale-95" : "opacity-100 blur-0 scale-100",
          )}
        >
          <span className="text-sm font-medium text-muted">Tap to rate</span>
        </div>
        {RATINGS.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
              display === i + 1 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-105",
            )}
          >
            <span className="text-sm font-bold tracking-wide text-ink">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
