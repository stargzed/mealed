import { cn } from "@/lib/utils";

// Press/outlet marquee infinite horizontal scroll of "As seen in" wordmarks.
// Pure CSS, two copies of the list animate left for a seamless loop.
const OUTLETS = [
 "LA Eater",
 "Forbes",
 "TechCrunch",
 "Bon Appétit",
 "Eater LA",
 "Time Out",
 "The Hollywood Reporter",
 "Food & Wine",
];

export function PressMarquee({ className }: { className?: string }) {
 return (
  <section
   className={cn(
    "relative w-full overflow-hidden border-y border-divider bg-white py-8",
    className,
   )}
   aria-label="Press coverage"
  >
   <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
   <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

   <div className="flex w-max animate-marquee gap-14 px-7">
    {[...OUTLETS, ...OUTLETS, ...OUTLETS].map((o, i) => (
     <span
      key={`${o}-${i}`}
      className="m-display text-2xl md:text-3xl text-muted/70 tracking-tightest whitespace-nowrap"
     >
      {o}
     </span>
    ))}
   </div>
  </section>
 );
}
