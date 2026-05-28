import { Mascot } from "@/components/brand/mascot";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="flex flex-col items-start gap-4">
        <Mascot size={56} />
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Our story
        </div>
        <h1 className="m-display text-4xl md:text-6xl">
          Meal prep, made local.
        </h1>
      </div>

      <div className="prose prose-neutral max-w-none mt-8 space-y-5 text-[17px] leading-relaxed text-sub">
        <p>
          Mealed started in a kitchen in Echo Park. Five chefs, one notebook, and
          the dawning realization that the best food in the neighborhood was being
          cooked by people whose names you'd never see on a menu.
        </p>
        <p>
          We built Mealed to change that. To make it as easy to order from the
          verified chef around the corner as it is to order delivery from a chain.
          And to make sure those chefs get paid fairly for what they do.
        </p>
        <p>
          Every chef on Mealed is ID-verified, kitchen-reviewed, and reviewed
          per-dish by real customers. We screen for food safety, we visit kitchens,
          and we don't let anyone cook for you who hasn't earned it.
        </p>
        <p>
          We're now serving Los Angeles, and we're hiring. If you cook, sign up.
          If you eat, order. Either way, welcome to Mealed.
        </p>
      </div>

    </div>
  );
}
