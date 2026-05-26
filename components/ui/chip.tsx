import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

// A site-wide filter pill. Inactive sits flush in the page with a soft fill,
// no border noise; active is an ink-filled pill with a small lift. Both have a
// subtle press-down on click.
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type={props.type ?? "button"}
      data-active={active ? "true" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap select-none",
        "transition-all duration-150 ease-out active:scale-[.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
        !active && "bg-soft text-sub hover:bg-border/60 hover:text-ink",
        active && "bg-ink text-white shadow-soft hover:bg-dark",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "flex items-center transition-colors",
            active ? "text-white" : "text-muted",
          )}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  ),
);
Chip.displayName = "Chip";
