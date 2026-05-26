import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full min-h-[88px] rounded-xl border border-border bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted",
      "focus:border-ink focus:shadow-[0_0_0_3px_rgba(5,5,5,.06)]",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
