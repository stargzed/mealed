import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-[3px] rounded-md text-[11px] font-bold tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-soft text-ink",
        verified: "bg-accent-soft text-accent-deep",
        outline: "bg-white border border-border text-sub font-medium",
        warn: "bg-warn-soft text-warn",
        tomato: "bg-tomato-soft text-tomato",
        accent: "bg-accent text-white",
        dark: "bg-ink text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
