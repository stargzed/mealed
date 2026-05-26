import { SEED_CHEFS } from "@/lib/seed";

// Avatar-strip trust pill. Chef avatars stacked, "Trusted by X chefs" label.
// Uses the seed chefs' gradient/initials so it stays on brand.
export function TrustPill() {
  const featured = SEED_CHEFS.filter((c) => c.verified).slice(0, 5);
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-white p-1 shadow-soft">
      <div className="flex -space-x-1.5">
        {featured.map((c) => {
          const [a, b] = c.avatarGradient;
          return (
            <span
              key={c.id}
              className="inline-flex items-center justify-center w-6 h-6 rounded-full ring-1 ring-white text-[10px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
            >
              {c.initials}
            </span>
          );
        })}
      </div>
      <p className="px-2.5 text-xs text-sub">
        Trusted by{" "}
        <strong className="font-semibold text-ink">240+</strong> verified chefs in LA
      </p>
    </div>
  );
}
