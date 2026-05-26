import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/payment/store";

interface Props {
  brand: PaymentMethod["brand"];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE = {
  sm: { w: 32, h: 22, fs: 9 },
  md: { w: 40, h: 28, fs: 11 },
  lg: { w: 56, h: 38, fs: 14 },
} as const;

// Minimal, type-only brand marks. Renders as a small "card chip" with the
// brand's recognizable wordmark/colors so users instantly identify their card.
export function CardBrandLogo({ brand, size = "md", className }: Props) {
  const s = SIZE[size];
  const base = cn(
    "inline-flex items-center justify-center rounded shrink-0 font-bold tracking-tight",
    className,
  );
  const style = { width: s.w, height: s.h, fontSize: s.fs };

  if (brand === "visa") {
    return (
      <span
        className={cn(base, "bg-[#1A1F71] text-white italic")}
        style={style}
        aria-label="Visa"
      >
        VISA
      </span>
    );
  }
  if (brand === "mastercard") {
    return (
      <span
        className={cn(base, "bg-white border border-border relative overflow-hidden")}
        style={style}
        aria-label="Mastercard"
      >
        <span
          className="absolute rounded-full bg-[#EB001B]"
          style={{ width: s.h * 0.7, height: s.h * 0.7, left: s.w * 0.2 }}
        />
        <span
          className="absolute rounded-full bg-[#F79E1B] mix-blend-multiply"
          style={{ width: s.h * 0.7, height: s.h * 0.7, right: s.w * 0.2 }}
        />
      </span>
    );
  }
  if (brand === "amex") {
    return (
      <span
        className={cn(base, "bg-[#006FCF] text-white")}
        style={style}
        aria-label="American Express"
      >
        AMEX
      </span>
    );
  }
  if (brand === "discover") {
    return (
      <span
        className={cn(base, "bg-white border border-border text-[#FF6000]")}
        style={style}
        aria-label="Discover"
      >
        DISC
      </span>
    );
  }
  return (
    <span
      className={cn(base, "bg-soft text-muted border border-border")}
      style={style}
      aria-label="Card"
    >
      CARD
    </span>
  );
}
