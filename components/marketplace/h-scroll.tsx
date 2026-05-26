import * as React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number;
  gap?: number;
}

export function HScroll({ padding = 16, gap = 12, className, children, ...rest }: Props) {
  return (
    <div
      className={cn("m-noscroll-x flex", className)}
      style={{ gap, paddingLeft: padding, paddingRight: padding }}
      {...rest}
    >
      {children}
    </div>
  );
}
