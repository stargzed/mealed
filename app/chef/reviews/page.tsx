"use client";

import { SEED_REVIEWS, chefMap } from "@/lib/seed";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { EmptyState } from "@/components/states/empty-state";
import { Star } from "lucide-react";
import { DashboardStatCard } from "@/components/chef/dashboard-stat-card";

const CHEF_ID = "maya";

export default function ChefReviewsPage() {
  const reviews = SEED_REVIEWS.filter((r) => r.chefId === CHEF_ID);
  const chef = chefMap[CHEF_ID];
  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  return (
    <div className="max-w-4xl">
      <h1 className="m-display text-3xl mb-6">Reviews</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <DashboardStatCard
          label="Rating"
          value={chef?.rating?.toFixed(2) ?? "—"}
          hint={`${chef?.reviewCount ?? 0} total`}
          icon={<Star size={16} />}
        />
        <DashboardStatCard
          label="5-star reviews"
          value={String(fiveStars)}
          hint={`${Math.round((fiveStars / Math.max(reviews.length, 1)) * 100)}% of all`}
        />
        <DashboardStatCard
          label="Replies pending"
          value="0"
          hint="Nice, all caught up"
        />
      </div>

      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" />
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <article key={r.id} className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{r.reviewerName}</div>
                  <Rating value={r.rating} small />
                </div>
                <Badge variant="outline">{r.type === "meal" ? "Dish review" : "Chef review"}</Badge>
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
    </div>
  );
}
