export const metadata = { title: "Terms of service" };

const SECTIONS = [
 {
  title: "1. Who we are",
  body:
   "Mealed, Inc. (\"Mealed\", \"we\") is a Delaware corporation operating a marketplace that connects consumers with verified local chefs.",
 },
 {
  title: "2. The marketplace",
  body:
   "Mealed is a platform. The chefs you order from are independent businesses, not Mealed employees. They set their own menus, prices, and availability. We vet them (ID, kitchen scan, sink-visible, food handler) but we don't manage their kitchens day to day.",
 },
 {
  title: "3. Orders, payments, fees",
  body:
   "Orders are billed at checkout. The consumer service fee (6%) and Mealed protection fee (5% with a $2.99 minimum) are non-refundable except where stated under Section 7. Chefs are paid via Stripe Connect 24 hours after a completed order, less a 7% platform commission.",
 },
 {
  title: "4. Allergens",
  body:
   "Chefs are required to list every allergen accurately. If you have a severe allergy, message the chef before ordering and confirm. Mealed will refund the full order (including fees) if a chef misrepresents allergens, reported within 24 hours.",
 },
 {
  title: "5. Cancellation",
  body:
   "Cancel for a full refund any time before the chef marks the order as Preparing. Once preparing, fees are non-refundable unless covered by the protection clause.",
 },
 {
  title: "6. Conduct",
  body:
   "Don't harass chefs, consumers, or Mealed staff. Don't post fake reviews. Don't try to bypass Mealed to pay or collect off-platform both parties lose protection.",
 },
 {
  title: "7. Mealed protection",
  body:
   "The protection fee covers refunds for: undercooked meals reported within 24 hours, foreign objects in food, allergen mislabeling, meals not delivered/picked up by the agreed time, and visible food-safety violations on chef intake.",
 },
 {
  title: "8. Disputes",
  body:
   "Any dispute is governed by California law and resolved in Los Angeles County courts or, where applicable, by binding arbitration under JAMS rules.",
 },
 {
  title: "9. Termination",
  body:
   "We can suspend or terminate any account for a credible threat to food safety or repeated terms violations. You can delete your account any time from Profile → Settings.",
 },
];

export default function TermsPage() {
 return (
  <div className="max-w-3xl mx-auto px-5 md:px-12 py-16 md:py-24">
   <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
    Terms of service
   </div>
   <h1 className="m-display text-4xl md:text-6xl">The rules of the kitchen.</h1>
   <p className="text-sub mt-3">Last updated: May 23, 2026</p>

   <div className="mt-12 space-y-8 text-sub leading-relaxed">
    {SECTIONS.map((s) => (
     <section key={s.title}>
      <h2 className="font-bold text-ink text-lg mb-2">{s.title}</h2>
      <p>{s.body}</p>
     </section>
    ))}
   </div>

   <p className="text-xs text-muted mt-14">
    Questions? Write to{" "}
    <a href="mailto:legal@mealed.app" className="underline underline-offset-4">
     legal@mealed.app
    </a>
    .
   </p>
  </div>
 );
}
