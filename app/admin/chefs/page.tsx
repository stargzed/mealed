"use client";

import Link from "next/link";
import { SEED_CHEFS } from "@/lib/seed";
import { Badge } from "@/components/ui/badge";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { Rating } from "@/components/ui/rating";

export default function AdminChefsPage() {
  return (
    <div className="max-w-6xl">
      <header className="mb-6">
        <h1 className="m-display text-3xl">Chefs</h1>
        <p className="text-sub text-sm mt-1">{SEED_CHEFS.length} chefs total</p>
      </header>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Chef
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold hidden md:table-cell">
                Specialty
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold hidden md:table-cell">
                Rating
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Status
              </th>
              <th className="text-right px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {SEED_CHEFS.map((chef) => (
              <tr key={chef.id} className="border-b border-divider last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ChefAvatar chef={chef} size={36} />
                    <div>
                      <div className="font-bold">{chef.displayName}</div>
                      <div className="text-xs text-muted">{chef.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-sub">
                  {chef.specialty}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Rating value={chef.rating} count={chef.reviewCount} small />
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      chef.verificationStatus === "verified"
                        ? "verified"
                        : chef.verificationStatus === "in_review"
                        ? "warn"
                        : "outline"
                    }
                  >
                    {chef.verificationStatus.replace("_", " ")}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/chefs/${chef.id}`}
                    className="text-xs font-bold text-ink hover:underline"
                  >
                    View profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
