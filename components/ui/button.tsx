import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold tracking-tight transition-all rounded-full active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-dark",
        secondary: "bg-white text-ink border border-border hover:bg-soft",
        accent: "bg-accent text-white hover:bg-accent-hover",
        outline: "bg-transparent text-ink border border-border hover:bg-soft",
        ghost: "bg-transparent text-ink hover:bg-soft",
        destructive: "bg-tomato text-white hover:opacity-90",
      },
      size: {
        default: "h-11 px-[18px] text-sm",
        sm: "h-9 px-[14px] text-[13px]",
        lg: "h-[52px] px-[22px] text-[15px]",
        icon: "h-10 w-10",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "default", size: "default", block: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, block }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
