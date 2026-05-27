import { ChefCtaButtons } from "@/components/marketing/chef-cta-buttons";
import { ChefFeatures } from "@/components/marketing/chef-features";
import { EarningsCalculator } from "@/components/marketing/earnings-calculator";

export const metadata = { title: "Become a chef" };

export default function BecomeAChefPage() {
 return (
  <div>
   {/* Hero */}
   <section className="max-w-7xl mx-auto px-5 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16 grid md:grid-cols-2 gap-12 items-center">
    <div>
     <div className="text-[11px] font-bold uppercase tracking-wider text-accent-deep mb-2">
      For chefs
     </div>
     <h1 className="m-display text-4xl md:text-6xl">
      Cook for your neighborhood.
     </h1>
     <p className="text-lg text-sub mt-5 max-w-[520px] leading-relaxed">
      Set your own menu. Choose pickup or delivery. Keep 88% of every order.
      Mealed handles checkout, taxes, and payouts.
     </p>
     <ChefCtaButtons />
    </div>

    <div id="earnings">
     <EarningsCalculator />
    </div>
   </section>

   {/* Trust strip what chefs say */}
   <section className="border-y border-divider bg-yolk-soft/30">
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-10 md:py-12">
     <div className="text-[11px] font-bold uppercase tracking-wider text-accent-deep mb-5">
      What chefs say
     </div>
     <div className="grid md:grid-cols-3 gap-5">
      {[
       {
        quote:
         "I went from cooking for my building to 18 regulars in three months. Mealed handled all the boring bits.",
        name: "Maya O.",
        role: "Plant-forward kitchen · Echo Park",
       },
       {
        quote:
         "Payouts hit my account 24 hours after delivery. No chasing invoices. No marketplace fee per item.",
        name: "Andre J.",
        role: "Caribbean weekly · Highland Park",
       },
       {
        quote:
         "Verification was quick and the kitchen-scan badge built trust fast. Customers actually mention it.",
        name: "Lina P.",
        role: "Gluten-free prep · Silver Lake",
       },
      ].map((t) => (
       <figure
        key={t.name}
        className="bg-white border border-border rounded-2xl p-5 shadow-soft"
       >
        <blockquote className="m-display text-[18px] leading-snug tracking-tight">
         "{t.quote}"
        </blockquote>
        <figcaption className="mt-4 pt-4 border-t border-divider">
         <div className="text-sm font-bold">{t.name}</div>
         <div className="text-xs text-muted">{t.role}</div>
        </figcaption>
       </figure>
      ))}
     </div>
    </div>
   </section>

   {/* Benefits editorial feature list */}
   <ChefFeatures />

   {/* Onboarding steps */}
   <section className="bg-surface border-y border-divider">
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-20">
     <h2 className="m-display text-3xl md:text-4xl mb-9">How onboarding works.</h2>
     <ol className="grid md:grid-cols-4 gap-4">
      {[
       { n: "01", t: "Apply", d: "Tell us about your cooking, your kitchen, and what you'd like to sell." },
       { n: "02", t: "Verify", d: "ID + kitchen scan + credentials. Usually under 48 hours." },
       { n: "03", t: "List your menu", d: "Photos, prices, weekly availability. You're in control." },
       { n: "04", t: "Start earning", d: "Orders roll in. Payouts in 24 hours after each completed order." },
      ].map((s) => (
       <li key={s.n} className="bg-white border border-border rounded-2xl p-5">
        <div className="text-[11px] font-bold text-accent-deep bg-accent-soft inline-flex px-1.5 py-0.5 rounded">
         {s.n}
        </div>
        <div className="mt-3 font-bold">{s.t}</div>
        <div className="mt-1 text-xs text-muted leading-relaxed">{s.d}</div>
       </li>
      ))}
     </ol>
     <div className="mt-10">
      <ChefCtaButtons centered />
     </div>
    </div>
   </section>
  </div>
 );
}
