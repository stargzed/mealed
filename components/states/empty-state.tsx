import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-14 px-6 rounded-[var(--m-radius-lg)] bg-surface border border-border",
        className,
      )}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center mb-4 text-muted">
          {icon}
        </div>
      )}
      <h3 className="font-display font-extrabold text-xl tracking-tightest">{title}</h3>
      {description && (
        <p className="text-sm text-sub mt-2 max-w-md">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
