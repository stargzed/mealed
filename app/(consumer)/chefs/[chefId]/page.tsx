"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, MapPin, MessageCircle, Sparkles, Truck } from "lucide-react";
import { SEED_MEALS, SEED_REVIEWS, chefMap } from "@/lib/seed";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MealCard } from "@/components/marketplace/meal-card";
import { VerifiedTag } from "@/components/marketplace/verified-tag";
import { EmptyState } from "@/components/states/empty-state";
import { useFavorites } from "@/lib/favorites/store";
import { cn } from "@/lib/utils";

export default function ChefProfilePage() {
  const params = useParams<{ chefId: string }>();
  const router = useRouter();
  const chef = chefMap[params.chefId];
  const toggleChef = useFavorites((s) => s.toggleChef);
  const isFav = useFavorites((s) => s.chefs.includes(params.chefId ?? ""));

  const meals = useMemo(
    () => SEED_MEALS.filter((m) => m.chefId === params.chefId),
    [params.chefId],
  );
  const reviews = useMemo(
    () => SEED_REVIEWS.filter((r) => r.chefId === params.chefId),
    [params.chefId],
  );

  if (!chef) {
    return (
      <EmptyState
        title="Chef not found"
        description="That chef may have been removed."
        action={
          <button onClick={() => router.push("/browse")} className={buttonVariants({})}>
            Back to browse
          </button>
        }
        className="m-6"
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-5 md:py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <ChefAvatar chef={chef} size={96} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="m-display text-3xl md:text-4xl">{chef.displayName}</h1>
            {chef.verified && <VerifiedTag />}
          </div>
          <div className="text-sub mt-2">{chef.specialty}</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
            <Rating value={chef.rating} count={chef.reviewCount} />
            <span className="inline-flex items-center gap-1.5 text-muted">
              <MapPin size={14} /> {chef.neighborhood}
            </span>
            {chef.deliveryEnabled && (
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Truck size={14} /> Delivers
              </span>
            )}
            {chef.customRequestsEnabled && (
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Sparkles size={14} /> Custom requests
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {chef.badges.map((b) => (
              <Badge key={b} variant="outline">
                {b}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto md:items-end">
          <div className="flex gap-2">
            <Link
              href={`/messages?chef=${chef.id}`}
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              <MessageCircle size={14} /> Message
            </Link>
            {chef.customRequestsEnabled && (
              <Link
                href={`/custom-request/${chef.id}`}
                className={buttonVariants({ size: "sm" })}
              >
                Custom request
              </Link>
            )}
            <button
              onClick={() => toggleChef(chef.id)}
              className={cn(
                "w-9 h-9 rounded-full border flex items-center justify-center",
                isFav
                  ? "bg-tomato/10 text-tomato border-tomato/30"
                  : "bg-white border-border text-ink hover:bg-soft",
              )}
              aria-label={isFav ? "Unfavorite" : "Favorite"}
            >
              <Heart size={15} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      {chef.bio && (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
            About
          </h2>
          <p className="text-base text-sub leading-relaxed">{chef.bio}</p>
        </section>
      )}

      {/* Menu */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="m-display text-2xl">This week's menu</h2>
          <span className="text-xs text-muted">{meals.length} meals</span>
        </div>
        {meals.length === 0 ? (
          <EmptyState
            title="No meals listed this week"
            description="Check back soon — this chef is preparing their next menu drop."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} chef={chef} />
            ))}
          </div>
        )}
      </section>

      {/* Reviews */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="m-display text-2xl">Reviews</h2>
          <Rating value={chef.rating} count={chef.reviewCount} />
        </div>
        {reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="Be the first to order and leave a review."
          />
        ) : (
          <div className="space-y-4">
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
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {r.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
