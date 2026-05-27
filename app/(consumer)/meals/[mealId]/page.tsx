"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  ChefHat,
  Clock,
  Flame,
  Heart,
  MapPin,
  Minus,
  Package,
  Plus,
  Star,
  Store,
  Truck,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";
import { SEED_MEALS, SEED_REVIEWS, chefMap } from "@/lib/seed";
import { MealImage } from "@/components/brand/meal-image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { PillToggle } from "@/components/ui/pill-toggle";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { MealCard } from "@/components/marketplace/meal-card";
import { useCart } from "@/lib/cart/store";
import { useAppDownload } from "@/lib/app-download-store";
import { useFavorites } from "@/lib/favorites/store";
import { EmptyState } from "@/components/states/empty-state";
import { formatPrice, cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MealDetailPage() {
  const params = useParams<{ mealId: string }>();
  const router = useRouter();
  const meal = SEED_MEALS.find((m) => m.id === params.mealId);
  const chef = meal ? chefMap[meal.chefId] : null;
  const related = useMemo(
    () =>
      meal
        ? SEED_MEALS.filter((m) => m.chefId === meal.chefId && m.id !== meal.id).slice(0, 4)
        : [],
    [meal],
  );
  const reviews = useMemo(
    () => (meal ? SEED_REVIEWS.filter((r) => r.mealId === meal.id) : []),
    [meal],
  );

  const presets = useMemo(() => {
    if (!meal) return [];
    const base = [
      { count: 1, price: meal.price, label: "Single", subtitle: "Try it once" },
      { count: 3, price: meal.price * 3, label: "3-pack", subtitle: "A few days" },
      { count: 5, price: meal.bundle?.count === 5 ? meal.bundle.price : meal.price * 5, label: "Workweek", subtitle: "5 meals", badge: meal.bundle?.count === 5 ? "Best value" : undefined },
      { count: 10, price: meal.bundle?.count === 10 ? meal.bundle.price : meal.price * 10, label: "Big prep", subtitle: "10 meals" },
    ];
    return base;
  }, [meal]);

  const [qty, setQty] = useState(meal?.bundle?.count ?? 1);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">(
    meal?.pickupAvailable ? "pickup" : "delivery",
  );
  const addItem = useCart((s) => s.addItem);
  const showAppDownload = useAppDownload((s) => s.show);
  const isFav = useFavorites((s) => (meal ? s.meals.includes(meal.id) : false));
  const toggleFav = useFavorites((s) => s.toggleMeal);

  if (!meal || !chef) {
    return (
      <EmptyState
        title="Meal not found"
        description="That meal may have been removed."
        className="m-6"
        action={
          <button
            onClick={() => router.push("/browse")}
            className={buttonVariants({})}
          >
            Back to browse
          </button>
        }
      />
    );
  }

  const unit = meal.price;
  const subtotal = qty * unit;
  // Use the bundle's pre-priced amount when it matches.
  const finalPrice =
    meal.bundle && qty === meal.bundle.count ? meal.bundle.price : subtotal;
  const savings = subtotal - finalPrice;
  const savingsPct = savings > 0 ? Math.round((savings / subtotal) * 100) : 0;

  const handleAdd = () => {
    // Ordering happens in the mobile app — funnel visitors there instead of
    // mutating the (now-orphaned) cart store on the web.
    void addItem;
    showAppDownload(
      `Order ${qty > 1 ? `${qty} × ` : ""}${meal.name} from the Mealed app.`,
    );
  };

  const fulfillmentOptions: Array<{ value: "pickup" | "delivery"; label: string; icon: React.ReactNode; disabled?: boolean }> = [];
  if (chef.pickupEnabled) {
    fulfillmentOptions.push({ value: "pickup", label: "Pickup", icon: <Store size={14} /> });
  }
  if (chef.deliveryEnabled) {
    fulfillmentOptions.push({ value: "delivery", label: "Delivery", icon: <Truck size={14} /> });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <div className="text-xs text-muted mb-3">
        <Link href="/browse" className="hover:text-ink">Browse</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/chefs/${chef.id}`} className="hover:text-ink">{chef.displayName}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-sub">{meal.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 md:gap-10">
        {/* Image + chef */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-[var(--m-radius-lg)] overflow-hidden bg-soft shadow-lg group">
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <MealImage meal={meal} label={false} />
            </div>
            <button
              onClick={() => toggleFav(meal.id)}
              className={cn(
                "absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95",
                isFav ? "text-tomato" : "text-ink hover:text-tomato",
              )}
              aria-label="Favorite"
            >
              <Heart size={18} fill={isFav ? "currentColor" : "none"} />
            </button>
            {meal.tags.includes("High-Protein") && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/95 backdrop-blur text-ink text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow">
                <Flame size={11} /> High-protein
              </span>
            )}
          </div>

          {/* Chef strip */}
          <Link
            href={`/chefs/${chef.id}`}
            className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:bg-soft transition"
          >
            <ChefAvatar chef={chef} size={44} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">{chef.displayName}</span>
                {chef.verified && <span className="m-vdot" />}
              </div>
              <div className="text-xs text-muted flex items-center gap-2 mt-0.5">
                <Rating value={chef.rating} count={chef.reviewCount} small />
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={11} /> {chef.neighborhood}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-ink hidden sm:inline">View profile →</span>
          </Link>
        </div>

        {/* Details + purchase */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {meal.tags.slice(0, 3).map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
          <h1 className="m-display text-3xl md:text-4xl leading-tight">{meal.name}</h1>
          <div className="flex items-center gap-3 mt-3 text-sm">
            <Rating value={meal.rating} count={meal.reviewCount} />
            {meal.allergens.length > 0 && (
              <>
                <span className="text-muted">·</span>
                <span className="text-muted">
                  Contains {meal.allergens.join(", ").toLowerCase()}
                </span>
              </>
            )}
          </div>

          {meal.description && (
            <p className="text-sub mt-5 leading-relaxed">{meal.description}</p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            <InfoTile Icon={Utensils} label="Portion" value={meal.portionSize ?? "1 entrée"} />
            <InfoTile
              Icon={Clock}
              label="Prep time"
              value={meal.tags.includes("Family Meals") ? "Heat & serve · 12 min" : "Heat & serve · 4 min"}
            />
            <InfoTile
              Icon={Package}
              label="Stays fresh"
              value="4 days refrigerated"
            />
            <InfoTile
              Icon={CalendarDays}
              label="Available"
              value="Sun, Mon, Wed pickups"
            />
          </div>

          {/* Macros */}
          {meal.macros && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                ["Calories", `${meal.macros.cal}`],
                ["Protein", `${meal.macros.p}g`],
                ["Carbs", `${meal.macros.c}g`],
                ["Fat", `${meal.macros.f}g`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-soft rounded-xl px-3 py-3 text-center"
                >
                  <div className="m-display text-lg leading-none">{value}</div>
                  <div className="text-[10px] text-muted uppercase font-bold tracking-wider mt-1.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Allergen call-out */}
          {meal.allergens.length > 0 && (
            <div className="mt-4 p-3.5 rounded-xl bg-warn-soft border border-warn/20 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-warn shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-warn">
                  Contains allergens
                </div>
                <div className="text-sm text-warn mt-0.5">
                  {meal.allergens.join(" · ")}
                </div>
              </div>
            </div>
          )}

          {/* Bundle presets */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
                How many meals?
              </div>
              {savings > 0 && (
                <span className="text-[11px] font-bold text-accent-deep tabular-nums">
                  Save {savingsPct}%
                </span>
              )}
            </div>
            <div
              className="grid grid-cols-4 rounded-2xl border border-border bg-white overflow-hidden"
              role="radiogroup"
              aria-label="Bundle size"
            >
              {presets.map((p, i) => {
                const active = qty === p.count;
                const isBest = Boolean(p.badge);
                return (
                  <button
                    key={p.count}
                    onClick={() => setQty(p.count)}
                    role="radio"
                    aria-checked={active}
                    className={cn(
                      "relative px-2 py-3 text-center transition-all duration-150",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-inset",
                      i > 0 && "border-l border-divider",
                      active
                        ? "bg-ink text-white"
                        : "bg-white text-ink hover:bg-soft",
                    )}
                  >
                    {isBest && (
                      <Star
                        size={11}
                        fill="currentColor"
                        strokeWidth={0}
                        className={cn(
                          "absolute top-2 right-2",
                          active ? "text-accent" : "text-accent",
                        )}
                        aria-label="Best value"
                      />
                    )}
                    <div
                      className={cn(
                        "m-display text-2xl leading-none tabular-nums",
                        active ? "text-white" : "text-ink",
                      )}
                    >
                      {p.count}
                    </div>
                    <div
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider mt-1.5",
                        active ? "text-white/70" : "text-muted",
                      )}
                    >
                      {p.count === 1 ? "Meal" : "Meals"}
                    </div>
                    <div
                      className={cn(
                        "text-xs font-semibold mt-1 tabular-nums",
                        active ? "text-white/90" : "text-sub",
                      )}
                    >
                      {formatPrice(p.price)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fine quantity stepper */}
            <div className="mt-3 flex items-center justify-between bg-soft rounded-full px-3 py-1.5">
              <div className="text-xs text-sub pl-1">Custom amount</div>
              <div className="inline-flex items-center bg-white rounded-full border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-soft rounded-l-full"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 font-bold tabular-nums w-10 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-soft rounded-r-full"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Fulfillment */}
          {fulfillmentOptions.length > 1 && (
            <div className="mt-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
                How do you want it?
              </div>
              <PillToggle
                value={fulfillment}
                onChange={setFulfillment}
                options={fulfillmentOptions}
                size="md"
                block
                ariaLabel="Pickup or delivery"
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-5">
            <Button size="lg" block onClick={handleAdd} className="!h-14 !text-base">
              Order in the app · {formatPrice(finalPrice)}
            </Button>
            <p className="text-[11px] text-muted text-center mt-2.5">
              Ordering, pickup, and delivery live in the Mealed mobile app.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="m-display text-2xl mb-5">
            More from {chef.displayName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((m) => (
              <MealCard key={m.id} meal={m} chef={chef} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="m-display text-2xl">Dish reviews</h2>
          <Rating value={meal.rating} count={meal.reviewCount} />
        </div>
        {reviews.length === 0 ? (
          <EmptyState
            title="No reviews on this dish yet"
            description="Be the first to try it."
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="border border-border rounded-2xl bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm">{r.reviewerName}</div>
                  <Rating value={r.rating} small />
                </div>
                <p className="text-sm text-sub mt-3 leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function InfoTile({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-3 flex items-start gap-2.5">
      <span className="w-7 h-7 rounded-lg bg-soft flex items-center justify-center shrink-0">
        <Icon size={14} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
          {label}
        </div>
        <div className="text-xs font-semibold mt-0.5 leading-tight">
          {value}
        </div>
      </div>
    </div>
  );
}
