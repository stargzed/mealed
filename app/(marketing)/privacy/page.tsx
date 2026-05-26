export const metadata = { title: "Privacy" };

const SECTIONS = [
  {
    title: "What we collect",
    body:
      "Your name, email, phone, delivery address, dietary preferences, allergies, order history, and payment metadata (we never see the full card number — Stripe holds it). For chefs, we additionally collect ID-verification data, kitchen-scan photos/videos, and food-handler credentials.",
  },
  {
    title: "Why we collect it",
    body:
      "To match you with chefs near you, warn you about allergens in meals you view, process orders and payouts, route deliveries, and resolve quality or safety issues if you report one.",
  },
  {
    title: "What we never do",
    body:
      "We do not sell your contact info, your dietary preferences, or your order history to third parties. We do not let chefs see your exact address until you place an order with them.",
  },
  {
    title: "Third parties",
    body:
      "Payments are processed by Stripe. Delivery may use Stuart, Onfleet, or local couriers as fulfillment partners. Maps are powered by Google Maps or Mapbox. Each is bound by their own data-processing agreements with Mealed.",
  },
  {
    title: "Your rights",
    body:
      "Access, export, or delete your data at any time from Profile → Settings, or by emailing privacy@mealed.app. California residents have additional CCPA rights, which we honor everywhere.",
  },
  {
    title: "Data retention",
    body:
      "Active accounts: kept while you use Mealed. Inactive accounts: order data anonymized after 24 months. Chef verification records: retained for 7 years per food-safety regulations.",
  },
  {
    title: "Children",
    body: "Mealed isn't for users under 13. We don't knowingly collect data from anyone younger.",
  },
  {
    title: "Changes",
    body:
      "If we change this policy, we'll email everyone with an active account at least 30 days before the change takes effect.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
        Privacy
      </div>
      <h1 className="m-display text-4xl md:text-6xl">Your data, plain English.</h1>
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
        <a href="mailto:privacy@mealed.app" className="underline underline-offset-4">
          privacy@mealed.app
        </a>
        .
      </p>
    </div>
  );
}
