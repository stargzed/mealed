"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { SEED_CHEFS } from "@/lib/seed";

interface Stat {
  value: string;
  label: string;
  trendUp?: boolean;
  hidden?: string; // chef id used as the "stat reveal" mascot
}

const STATS: Stat[] = [
  { value: "30 min", label: "saved per week on cooking", trendUp: false, hidden: "maya" },
  { value: "$60", label: "saved vs. takeout per week", trendUp: false, hidden: "lina" },
  { value: "4.9★", label: "average chef rating", trendUp: true, hidden: "andre" },
  { value: "240+", label: "verified chefs in LA", trendUp: true, hidden: "rosa" },
];

const QUOTES = {
  maya: {
    quote:
      "Chef Maya hits my macros every week. Best meal prep I've ever ordered.",
    name: "Emma R., Echo Park",
  },
  lina: {
    quote:
      "Lina customized everything to my allergies before the first order. Game-changer.",
    name: "Mia B., Silver Lake",
  },
  andre: {
    quote: "Andre's family taco kit fed 4 adults. Better than any LA taqueria.",
    name: "Ricky H., Highland Park",
  },
  rosa: {
    quote: "Rosa's pernil is straight out of my abuela's kitchen.",
    name: "Sam K., Boyle Heights",
  },
} as const;

const TILE_REVEAL_STAGGER_MS = 220;
const CYCLE_INTERVAL_MS = 6000;

export function TestimonialHover() {
  const chefMap = Object.fromEntries(SEED_CHEFS.map((c) => [c.id, c]));
  const rowRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0); // 0..STATS.length
  const [showingQuotes, setShowingQuotes] = useState(false);

  // IntersectionObserver — start the reveal when the stat row scrolls into view.
  useEffect(() => {
    const node = rowRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShowingQuotes(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Stagger the reveal of each tile.
  useEffect(() => {
    if (!showingQuotes) return;
    if (revealedCount >= STATS.length) return;
    const t = setTimeout(
      () => setRevealedCount((n) => n + 1),
      revealedCount === 0 ? 250 : TILE_REVEAL_STAGGER_MS,
    );
    return () => clearTimeout(t);
  }, [showingQuotes, revealedCount]);

  // Once all are revealed, slowly toggle between stat <-> quote every 6s
  // so a sticky user sees both. Reduced motion users skip the cycle.
  useEffect(() => {
    if (revealedCount < STATS.length) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;
    const t = setInterval(() => {
      setShowingQuotes((q) => !q);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [revealedCount]);

  return (
    <section
      id="testimonials"
      className="bg-soft py-16 md:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white text-ink px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold border border-border shadow-soft">
            <span className="m-vdot" /> Real eaters · real chefs
          </div>
        </div>

        <div className="text-center max-w-screen-xl mx-auto relative text-ink">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tightest leading-tight">
            We make it easy for
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block mx-2 align-middle relative">
                    <span className="block sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 rounded-full border-2 border-white shadow overflow-hidden">
                      <ChefAvatar chef={chefMap.maya} size={48} className="!w-full !h-full" />
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-ink p-4 rounded-xl shadow-lg border border-border z-50"
                >
                  <p className="mb-2 text-sm">"{QUOTES.maya.quote}"</p>
                  <p className="font-bold text-sm">{QUOTES.maya.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            home cooks
          </h2>

          <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tightest leading-tight mt-2">
            and their
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block mx-2 align-middle relative">
                    <span className="block sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 rounded-full border-2 border-white shadow overflow-hidden">
                      <ChefAvatar chef={chefMap.lina} size={56} className="!w-full !h-full" />
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-ink p-4 rounded-xl shadow-lg border border-border z-50"
                >
                  <p className="mb-2 text-sm">"{QUOTES.lina.quote}"</p>
                  <p className="font-bold text-sm">{QUOTES.lina.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            neighbors to share food and
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tightest leading-tight text-ink mt-2">
            build trust through every meal.
          </h2>
        </div>

        <div
          ref={rowRef}
          className="grid sm:grid-cols-4 grid-cols-2 gap-6 sm:gap-8 bg-white mt-10 w-full mx-auto px-6 sm:px-8 py-7 rounded-2xl border border-border"
        >
          {STATS.map((stat, index) => {
            const chef = stat.hidden ? chefMap[stat.hidden] : null;
            const quote = stat.hidden ? QUOTES[stat.hidden as keyof typeof QUOTES] : null;
            // A tile is "flipped" to its quote when:
            //   - it's been revealed by the stagger AND
            //   - we're currently in the "quotes" cycle phase.
            // On hover the tile also flips (peek behavior) regardless of cycle.
            const revealed = index < revealedCount;
            const flipped = revealed && showingQuotes;
            return (
              <div
                key={stat.label}
                className="flex-1 flex gap-4 sm:pl-8 relative min-h-[68px]"
              >
                {index !== 0 && (
                  <div className="hidden sm:block w-px h-10 border-l border-dashed border-border absolute left-0 top-1" />
                )}
                <div
                  className="w-full h-full group relative"
                  data-flipped={flipped ? "true" : undefined}
                >
                  {/* Stat */}
                  <div
                    className={`text-center transition-all duration-500 ease-out absolute inset-0 flex flex-col items-center justify-center group-hover:opacity-0 group-hover:-translate-y-2 ${
                      flipped
                        ? "opacity-0 -translate-y-2"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      {stat.trendUp ? (
                        <ArrowUp size={14} className="text-accent" />
                      ) : (
                        <ArrowDown size={14} className="text-ink" />
                      )}
                      <span className="m-display text-2xl md:text-3xl">{stat.value}</span>
                    </div>
                    <p className="text-xs text-muted mt-1.5">{stat.label}</p>
                  </div>

                  {/* Quote */}
                  {chef && quote && (
                    <div
                      className={`absolute inset-0 flex items-center gap-2.5 transition-all duration-500 ease-out text-left group-hover:opacity-100 group-hover:translate-y-0 ${
                        flipped
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <ChefAvatar chef={chef} size={36} />
                      <div className="text-[11px] leading-snug">
                        <div className="text-sub italic">"{quote.quote.slice(0, 60)}…"</div>
                        <div className="font-bold text-ink mt-1">{quote.name}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
