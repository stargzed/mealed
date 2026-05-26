"use client";

import NumberFlow, { type Format } from "@number-flow/react";

interface Props {
  value: number;
  format?: Format;
  prefix?: string;
  suffix?: string;
  className?: string;
}

// Animated count-up using NumberFlow. Use a single value prop and the
// component takes care of digit-by-digit flipping when it changes.
export function AnimatedNumber({ value, format, prefix, suffix, className }: Props) {
  return (
    <span className={className}>
      {prefix}
      <NumberFlow value={value} format={format} />
      {suffix}
    </span>
  );
}
