import Link from "next/link";
import { ArrowRight, Home, Search, ShieldQuestion } from "lucide-react";
import { Mascot } from "@/components/brand/mascot";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-16">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-yolk-soft border border-yolk/40 mb-8 rotate-[-6deg]">
          <Mascot size={56} />
        </div>

        <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
          404 · Page not found
        </div>
        <h1 className="m-display text-4xl md:text-5xl">
          Looks like we burned this one.
        </h1>
        <p className="text-sub mt-3 leading-relaxed">
          The page you were looking for doesn't exist, or moved. Try one of these
          and you'll be back to dinner in a tap.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            <Home size={15} /> Back home
          </Link>
          <Link
            href="/browse"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            <Search size={15} /> Browse meals
          </Link>
          <Link
            href="/help"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            <ShieldQuestion size={15} /> Get help
          </Link>
        </div>

        <div className="mt-10 bg-surface border border-border rounded-2xl p-5 text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2.5">
            Or jump straight to
          </div>
          <ul className="divide-y divide-divider -my-1.5">
            {[
              ["Become a chef", "/become-a-chef"],
              ["How Mealed works", "/how-it-works"],
              ["Trust & safety", "/safety"],
              ["Your orders", "/orders"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-between gap-3 py-2.5 group"
                >
                  <span className="text-sm font-semibold">{label}</span>
                  <ArrowRight
                    size={14}
                    className="text-muted group-hover:text-ink group-hover:translate-x-0.5 transition"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
