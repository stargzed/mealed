"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Camera, Check, FileText, ShieldCheck, X } from "lucide-react";
import { SEED_CHEFS } from "@/lib/seed";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/states/empty-state";

export default function AdminVerificationPage() {
 const queue = SEED_CHEFS.filter((c) => c.verificationStatus === "in_review");
 const [selectedId, setSelectedId] = useState<string | null>(queue[0]?.id ?? null);
 const [note, setNote] = useState("");

 const selected = queue.find((c) => c.id === selectedId);

 if (queue.length === 0) {
  return (
   <EmptyState
    title="No pending verifications"
    description="All current chef applications have been reviewed."
   />
  );
 }

 const decide = (verdict: "approve" | "reject") => {
  if (!selected) return;
  toast.success(
   verdict === "approve"
    ? `${selected.displayName} approved`
    : `${selected.displayName} rejected they'll be notified.`,
  );
  setNote("");
 };

 return (
  <div className="max-w-6xl">
   <header className="mb-6 flex items-center gap-2">
    <ShieldCheck size={20} className="text-accent-deep" />
    <h1 className="m-display text-3xl">Verification queue</h1>
    <Badge variant="warn" className="ml-2">
     {queue.length} pending
    </Badge>
   </header>

   <div className="grid lg:grid-cols-[280px_1fr] gap-6">
    <aside className="bg-white border border-border rounded-2xl divide-y divide-divider overflow-hidden">
     {queue.map((chef) => (
      <button
       key={chef.id}
       onClick={() => setSelectedId(chef.id)}
       className={`w-full text-left p-4 transition ${
        selectedId === chef.id ? "bg-soft" : "hover:bg-soft"
       }`}
      >
       <div className="flex items-center gap-3">
        <ChefAvatar chef={chef} size={36} />
        <div className="min-w-0">
         <div className="font-bold text-sm truncate">
          {chef.displayName}
         </div>
         <div className="text-xs text-muted truncate">
          {chef.location}
         </div>
        </div>
       </div>
      </button>
     ))}
    </aside>

    {selected && (
     <main className="bg-white border border-border rounded-2xl p-6">
      <div className="flex items-start gap-4">
       <ChefAvatar chef={selected} size={64} />
       <div>
        <h2 className="m-display text-2xl">{selected.displayName}</h2>
        <div className="text-sm text-muted mt-1">{selected.specialty}</div>
        <div className="text-sm text-muted">{selected.location}</div>
       </div>
      </div>

      {selected.bio && (
       <section className="mt-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
         Bio
        </div>
        <p className="text-sm text-sub leading-relaxed">{selected.bio}</p>
       </section>
      )}

      <section className="mt-5">
       <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
        Submitted documents
       </div>
       <div className="grid sm:grid-cols-3 gap-3">
        <DocCard Icon={ShieldCheck} label="Government ID" />
        <DocCard Icon={Camera} label="Kitchen scan video" />
        <DocCard Icon={FileText} label="Food handler permit" />
       </div>
       <label className="mt-4 inline-flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked className="accent-ink" />
        Sink visible in prep area
       </label>
      </section>

      <section className="mt-6">
       <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
        Reviewer notes
       </div>
       <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Anything to flag for the next reviewer?"
       />
      </section>

      <div className="flex justify-end gap-2 mt-6">
       <Button variant="secondary" onClick={() => decide("reject")}>
        <X size={14} /> Reject
       </Button>
       <Button onClick={() => decide("approve")}>
        <Check size={14} /> Approve chef
       </Button>
      </div>
     </main>
    )}
   </div>
  </div>
 );
}

function DocCard({ Icon, label }: { Icon: React.ComponentType<{ size?: number | string }>; label: string }) {
 return (
  <div className="bg-soft border border-border rounded-xl p-4 flex items-center gap-3">
   <span className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center">
    <Icon size={16} />
   </span>
   <div>
    <div className="text-sm font-bold">{label}</div>
    <div className="text-xs text-muted">Uploaded · 2 days ago</div>
   </div>
  </div>
 );
}
