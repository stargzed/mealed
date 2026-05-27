"use client";

import { AlertTriangle } from "lucide-react";
import { EmptyState } from "@/components/states/empty-state";
import { Badge } from "@/components/ui/badge";

const REPORTS = [
 {
  id: "rep-1",
  type: "Quality",
  chef: "Chef Andre",
  description: "Steak plate was undercooked on delivery yesterday.",
  status: "open" as const,
  createdAt: "2 hours ago",
 },
 {
  id: "rep-2",
  type: "Allergen",
  chef: "Chef Lina",
  description: "Order labeled vegan contained dairy yogurt refund issued.",
  status: "resolved" as const,
  createdAt: "yesterday",
 },
];

export default function AdminReportsPage() {
 if (REPORTS.length === 0) {
  return <EmptyState icon={<AlertTriangle size={20} />} title="No reports" />;
 }
 return (
  <div className="max-w-4xl">
   <header className="mb-6 flex items-center gap-2">
    <AlertTriangle size={20} className="text-tomato" />
    <h1 className="m-display text-3xl">Reports</h1>
   </header>

   <div className="space-y-3">
    {REPORTS.map((r) => (
     <article
      key={r.id}
      className="bg-white border border-border rounded-2xl p-5"
     >
      <div className="flex items-center justify-between gap-3">
       <div>
        <div className="font-bold">{r.type} · {r.chef}</div>
        <div className="text-xs text-muted">{r.createdAt}</div>
       </div>
       <Badge variant={r.status === "open" ? "tomato" : "verified"}>
        {r.status}
       </Badge>
      </div>
      <p className="text-sm text-sub mt-3 leading-relaxed">{r.description}</p>
     </article>
    ))}
   </div>
  </div>
 );
}
