export const metadata = { title: "Press" };

const COVERAGE = [
  {
    outlet: "LA Eater",
    title: "The home-cooked meal prep startup taking on the lunch routine.",
    date: "Apr 2026",
  },
  {
    outlet: "Eater LA",
    title: "Inside the kitchens of Mealed's verified chefs.",
    date: "Mar 2026",
  },
  {
    outlet: "Forbes",
    title: "Why 'Rover for cooks' might actually work this time.",
    date: "Feb 2026",
  },
  {
    outlet: "TechCrunch",
    title: "Mealed raises $4M seed for hyperlocal meal prep.",
    date: "Jan 2026",
  },
];

export default function PressPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
        Press
      </div>
      <h1 className="m-display text-4xl md:text-6xl">Coverage and contact.</h1>
      <p className="text-lg text-sub mt-5 max-w-2xl">
        For press inquiries, write to <a href="mailto:press@mealed.app" className="underline underline-offset-4">press@mealed.app</a>.
      </p>

      <div className="mt-12 space-y-3">
        {COVERAGE.map((c) => (
          <article key={c.title} className="bg-white border border-border rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {c.outlet} · {c.date}
              </div>
              <div className="font-bold text-lg mt-1">{c.title}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
