import { Camera, Check, FileCheck, Shield, ShieldCheck, Star } from "lucide-react";

export const metadata = { title: "Trust & safety" };

const STANDARDS = [
  {
    Icon: Shield,
    t: "ID verification",
    d: "Every chef passes a government-ID check before they can list a single meal.",
  },
  {
    Icon: Camera,
    t: "360° kitchen scan",
    d: "Chefs upload a video walkthrough of their prep kitchen. Reviewed by our team before approval.",
  },
  {
    Icon: Check,
    t: "Sink visible in prep",
    d: "We require a clearly visible handwashing sink in the prep area. Non-negotiable.",
  },
  {
    Icon: FileCheck,
    t: "Food handler credential",
    d: "ServSafe or local food handler permits encouraged. CFPM gets a badge.",
  },
  {
    Icon: Star,
    t: "Per-dish reviews",
    d: "Reviews aren't just for the chef — every meal gets rated by the people who ate it.",
  },
  {
    Icon: ShieldCheck,
    t: "Mealed protection fee",
    d: "A small protection fee on every order covers refunds for quality or safety issues.",
  },
];

export default function SafetyPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
          Trust & safety
        </div>
        <h1 className="m-display text-4xl md:text-6xl">
          Cooked by people you can trust.
        </h1>
        <p className="text-lg text-sub mt-5 max-w-2xl">
          Mealed isn't a free-for-all. Every chef on the platform is vetted, every
          kitchen is reviewed, and every dish gets rated by the people who ate it.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-14">
        {STANDARDS.map((s) => (
          <div key={s.t} className="bg-white border border-border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-accent-soft text-accent-deep flex items-center justify-center mb-4">
              <s.Icon size={18} />
            </div>
            <div className="font-bold text-lg">{s.t}</div>
            <div className="text-sm text-sub mt-2 leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="bg-ink text-white rounded-3xl p-8 md:p-12 mt-14">
        <h2 className="m-display text-3xl md:text-4xl">
          What if something's wrong with my order?
        </h2>
        <p className="text-white/70 mt-4 leading-relaxed max-w-2xl">
          Report any issue from the order page within 24 hours. The Mealed
          protection fee on every order goes straight to refunds for quality or
          safety issues — including foreign objects, undercooked items, allergen
          mistakes, and missing meals.
        </p>
      </div>
    </div>
  );
}
