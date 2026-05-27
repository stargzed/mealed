import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Careers" };

const ROLES = [
 { team: "Engineering", title: "Senior Full-Stack Engineer", loc: "LA · Hybrid" },
 { team: "Engineering", title: "iOS Engineer", loc: "LA · Hybrid" },
 { team: "Trust & safety", title: "Chef Verification Lead", loc: "LA · On-site" },
 { team: "Operations", title: "Local Market Manager", loc: "LA · On-site" },
 { team: "Design", title: "Product Designer", loc: "LA · Hybrid" },
];

export default function CareersPage() {
 return (
  <div className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
   <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
    Careers
   </div>
   <h1 className="m-display text-4xl md:text-6xl">Build the future of local food.</h1>
   <p className="text-lg text-sub mt-5 max-w-2xl">
    Small team, hard problems. We're hiring for the roles below and looking
    for great people in general. Even if nothing matches, send us a note.
   </p>

   <div className="mt-12 divide-y divide-divider border border-border rounded-2xl bg-white overflow-hidden">
    {ROLES.map((r) => (
     <div key={r.title} className="flex items-center justify-between gap-4 p-5 hover:bg-soft transition">
      <div>
       <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {r.team}
       </div>
       <div className="font-bold text-lg mt-1">{r.title}</div>
       <div className="text-xs text-muted mt-1">{r.loc}</div>
      </div>
      <Link href="/help" className="text-sm font-bold inline-flex items-center gap-1">
       Apply <ArrowRight size={14} />
      </Link>
     </div>
    ))}
   </div>
  </div>
 );
}
