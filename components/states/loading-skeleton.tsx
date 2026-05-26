import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-soft border border-divider rounded-[var(--m-radius)] animate-pulse",
        className,
      )}
    />
  );
}

export function MealCardSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="w-full aspect-[5/4] rounded-[var(--m-radius)]" />
      <div className="space-y-2 mt-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function ChefCardSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="w-full aspect-[3/2] rounded-[var(--m-radius)]" />
      <div className="flex items-center gap-3 mt-3">
        <Skeleton className="w-10 h-10 !rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
  );
}
