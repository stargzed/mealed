import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
}

export function DashboardStatCard({ label, value, hint, icon, trend, className }: Props) {
  return (
    <div className={cn("bg-white border border-border rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
          {label}
        </div>
        {icon && <div className="text-muted">{icon}</div>}
      </div>
      <div className="m-display text-3xl mt-2">{value}</div>
      {(hint || trend) && (
        <div className="flex items-center justify-between mt-2 text-xs">
          {hint && <span className="text-muted">{hint}</span>}
          {trend && <span className="text-accent-deep font-bold">{trend}</span>}
        </div>
      )}
    </div>
  );
}
