import { Star } from "lucide-react";

interface Props {
  value: number | null;
  count?: number;
  small?: boolean;
}

// Brand star color — warm yellow that reads on white and inside cards.
export const STAR_COLOR = "#F5B400";

export function Rating({ value, count, small = false }: Props) {
  if (!value) {
    return (
      <span className={small ? "text-[11px] text-muted" : "text-[13px] text-muted"}>
        New
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${small ? "text-xs" : "text-[13px]"}`}
    >
      <Star
        size={small ? 12 : 14}
        fill={STAR_COLOR}
        stroke={STAR_COLOR}
        strokeWidth={1.5}
      />
      <span>{value.toFixed(2)}</span>
      {count != null && (
        <span className="text-muted font-medium">({count})</span>
      )}
    </span>
  );
}
