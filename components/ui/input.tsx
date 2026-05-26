import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full h-12 rounded-xl border border-border bg-white px-3.5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-150",
        "placeholder:text-muted",
        "focus:border-ink focus:shadow-[0_0_0_3px_rgba(5,5,5,.06)]",
        "disabled:opacity-60 disabled:bg-soft",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
