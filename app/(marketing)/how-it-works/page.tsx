import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "How it works" };

const STEPS = [
  { n: "01", t: "Tell us your diet", d: "Allergies, goals, meals per week. Takes 90 seconds." },
  { n: "02", t: "Discover chefs", d: "Verified home chefs near you, ranked by dish ratings." },
  { n: "03", t: "Order weekly or custom", d: "Pick from this week's menu or request a personal plan." },
  { n: "04", t: "Pickup or delivery", d: "Depends on the chef. Track every order to the door." },
  { n: "05", t: "Review per dish", d: "Help future eaters. Rate the chef and each meal." },
];

const FAQ = [
  {
    q: "How much does Mealed cost?",
    a: "There's no subscription. You pay per meal — typically $9–$15 — plus a small consumer service fee (6%) and a protection fee. Delivery fees are set by each chef.",
  },
  {
    q: "Are chefs vetted?",
    a: "Every chef passes ID verification, a 360° kitchen scan, and a sink-visible check before they can list a single meal. Read the full list at /safety.",
  },
  {
    q: "What's a custom request?",
    a: "If a chef offers custom requests, you can submit a brief — goals, allergies, budget — and they'll reply with a personalized quote.",
  },
  {
    q: "When do I get paid as a chef?",
    a: "24 hours after a completed order, your payout becomes eligible. Stripe Connect handles the transfer.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
          How Mealed works
        </div>
        <h1 className="m-display text-4xl md:text-6xl">From craving to first meal in under a minute.</h1>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12">
        {STEPS.map((s) => (
          <li key={s.n} className="bg-white border border-border rounded-2xl p-5">
            <div className="text-[11px] font-bold text-accent-deep bg-accent-soft inline-flex px-1.5 py-0.5 rounded">
              {s.n}
            </div>
            <div className="mt-3 font-bold">{s.t}</div>
            <div className="mt-1 text-xs text-muted leading-relaxed">{s.d}</div>
          </li>
        ))}
      </ol>

      <div className="bg-surface border border-border rounded-3xl p-7 md:p-10 mt-14">
        <h2 className="m-display text-2xl md:text-3xl mb-6">Common questions.</h2>
        <div className="divide-y divide-divider">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer flex items-center justify-between font-semibold text-[15px]">
                <span>{item.q}</span>
                <span className="text-muted group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-sub text-sm mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-14">
        <Link href="/browse" className={buttonVariants({ size: "lg" })}>
          Find meals near me
        </Link>
        <Link href="/become-a-chef" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          Become a chef
        </Link>
      </div>
    </div>
  );
}
