"use client";

import { Check, ChevronRight, ShieldCheck, Upload } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { chefMap } from "@/lib/seed";

const CHEF_ID = "maya";

export default function ChefVerificationPage() {
  const chef = chefMap[CHEF_ID];

  return (
    <div className="max-w-3xl">
      <h1 className="m-display text-3xl mb-6">Verification</h1>

      <div className="bg-white border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full bg-accent-soft text-accent-deep flex items-center justify-center">
            <ShieldCheck size={20} />
          </span>
          <div>
            <div className="font-bold text-lg">Verified Chef</div>
            <div className="text-sm text-muted">
              Approved by Mealed Trust & Safety
            </div>
          </div>
          <Badge variant="verified" className="ml-auto">Active</Badge>
        </div>

        <div className="border-t border-divider mt-6 pt-6 space-y-3">
          {[
            { label: "ID verification", status: "Approved" },
            { label: "360° kitchen scan", status: "Approved" },
            { label: "Sink visible confirmation", status: "Approved" },
            { label: "Food handler credential", status: chef?.badges.includes("CFPM Certified") ? "CFPM" : "Pending" },
            { label: "Liability insurance", status: "Optional" },
          ].map((it) => (
            <div key={it.label} className="flex items-center justify-between text-sm">
              <span className="font-semibold">{it.label}</span>
              <span className="flex items-center gap-2 text-sub">
                {it.status === "Approved" ? (
                  <span className="text-accent inline-flex items-center gap-1">
                    <Check size={14} strokeWidth={3} /> {it.status}
                  </span>
                ) : (
                  it.status
                )}
                <ChevronRight size={14} className="text-muted" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 mt-4">
        <div className="font-bold">Upload new credential</div>
        <p className="text-sm text-sub mt-1">
          Add a food handler permit, business license, or kitchen inspection to
          earn additional badges.
        </p>
        <Link href="/chef/onboarding" className={buttonVariants({ variant: "secondary", className: "mt-4" })}>
          <Upload size={14} /> Upload document
        </Link>
      </div>
    </div>
  );
}
