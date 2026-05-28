import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
 size?: number;
 color?: string | null;
 className?: string;
}

// Full-color: renders /mascot.png at the correct aspect (1024x663 → ~1.544:1)
// Single-color: same png used as a CSS mask, fill becomes `color` (or currentColor).
export function Mascot({ size = 36, color = null, className }: Props) {
 const aspect = 1024 / 663;
 const h = size;
 const w = h * aspect;

 if (color) {
  return (
   <span
    aria-hidden
    className={cn("m-mascot-mask inline-block", className)}
    style={{ width: w, height: h, color }}
   />
  );
 }
 return (
  <span
   className={cn("relative inline-block flex-shrink-0", className)}
   style={{ width: w, height: h }}
  >
   <Image
    src="/mascot.png"
    alt="Mealed"
    fill
    sizes={`${w}px`}
    style={{ objectFit: "contain" }}
    priority
   />
  </span>
 );
}

interface WordmarkProps {
 size?: number;
 /** Word color. The mascot always renders full-color so the eyes show through. */
 color?: string;
 /** Render the mascot as a single-color silhouette (no eyes) for dark backgrounds. */
 monochrome?: string | null;
 className?: string;
 hideWord?: boolean;
}

/**
 * Wordmark for Mealed. Mascot icon + italic Fraunces "Mealed" with the WONK
 * axis enabled for distinctive curly glyphs. Restored from the old UI per
 * user preference — Geist body type stays, but the mark itself reads editorial.
 */
export function Wordmark({
 size = 22,
 color = "var(--m-ink)",
 monochrome = null,
 className,
 hideWord = false,
}: WordmarkProps) {
 return (
  <span
   className={cn("inline-flex items-center", className)}
   style={{ gap: size * 0.3 }}
  >
   <Mascot size={size * 1.05} color={monochrome} />
   {!hideWord && (
    <span
     className="leading-none"
     style={{
      fontSize: size * 1.4,
      color,
      fontFamily: "var(--m-font-wordmark), 'Fraunces', serif",
      fontWeight: 700,
      fontStyle: "italic",
      letterSpacing: "-0.045em",
      // WONK = alternate quirky glyphs, SOFT = rounded terminals,
      // opsz = display optical size.
      fontVariationSettings: '"SOFT" 100, "opsz" 144, "WONK" 1',
     }}
    >
     Mealed
    </span>
   )}
  </span>
 );
}
