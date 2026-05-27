import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import { Wordmark } from "@/components/brand/mascot";

const SOCIALS: Array<[typeof Instagram, string, string]> = [
  [Instagram, "Instagram", "https://instagram.com/mealed"],
  [Twitter, "Twitter / X", "https://twitter.com/mealed"],
];

/**
 * Minimal marketing footer. The old multi-column link grid + newsletter was
 * tied to the full marketplace; with the site reduced to a landing/funnel
 * experience we keep only brand, socials, and legal links.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <Wordmark size={22} color="#FFFFFF" monochrome="#FFFFFF" />
            <span className="hidden md:inline-block w-px h-5 bg-white/15" aria-hidden />
            <p className="text-[13px] text-white/55 max-w-md leading-relaxed">
              Home-cooked meal prep from trusted local chefs. The full Mealed
              experience lives in the app.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {SOCIALS.map(([Icon, label, href]) => (
              <Link
                key={label}
                href={href}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label={label}
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} Mealed, Inc. Cooked with care in Los Angeles.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/45">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/safety" className="hover:text-white transition">
              Trust &amp; safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
