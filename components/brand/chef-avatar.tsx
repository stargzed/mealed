import type { ChefProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  chef: Pick<ChefProfile, "avatarGradient" | "initials">;
  size?: number;
  ring?: boolean;
  className?: string;
}

export function ChefAvatar({ chef, size = 44, ring = false, className }: Props) {
  const [c1, c2] = chef.avatarGradient;
  return (
    <div
      className={cn(
        "rounded-full text-white flex items-center justify-center flex-shrink-0 font-display font-bold",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        fontSize: size * 0.5,
        boxShadow: ring ? "0 0 0 3px #fff, 0 0 0 4px var(--m-border)" : undefined,
      }}
    >
      {chef.initials}
    </div>
  );
}
