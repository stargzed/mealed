import Link from "next/link";
import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import { Wordmark } from "@/components/brand/mascot";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const SECTIONS = [
  {
    title: "Eat",
    links: [
      ["Browse meals", "/browse"],
      ["How it works", "/how-it-works"],
      ["Custom meal prep", "/about#custom"],
      ["Mealed for offices", "/about#offices"],
      ["Gift cards", "/about#gifts"],
    ],
  },
  {
    title: "Cook",
    links: [
      ["Become a chef", "/become-a-chef"],
      ["Chef earnings", "/become-a-chef#earnings"],
      ["Chef resources", "/help"],
      ["Chef login", "/login"],
    ],
  },
  {
    title: "Trust & safety",
    links: [
      ["Verified chefs", "/safety"],
      ["Protection fee", "/safety"],
      ["Report an issue", "/help"],
      ["Allergen guide", "/safety"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Mealed", "/about"],
      ["Careers", "/careers"],
      ["Press", "/press"],
      ["Help center", "/help"],
    ],
  },
] as const;

const SOCIALS: Array<[typeof Github, string, string]> = [
  [Instagram, "Instagram", "https://instagram.com/mealed"],
  [Twitter, "Twitter / X", "https://twitter.com/mealed"],
  [Youtube, "YouTube", "https://youtube.com/@mealed"],
  [Github, "GitHub", "https://github.com/mealed"],
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-16 pb-10">
        {/* Top: logo + newsletter */}
        <div className="grid md:grid-cols-[1fr_360px] gap-10 pb-12 border-b border-white/10">
          <div>
            <Wordmark size={28} color="#FFFFFF" monochrome="#FFFFFF" />
            <p className="text-sm text-white/60 mt-4 max-w-md leading-relaxed">
              Home-cooked meal prep from trusted local chefs. Now in Los Angeles.
              Built for eaters who want real food and cooks who want to be paid fairly.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIALS.map(([Icon, label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
                  aria-label={label}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:pl-8 md:border-l md:border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2">
              Get the menu drop
            </div>
            <div className="text-lg font-bold leading-tight mb-4">
              New chefs, weekly menus, in your inbox every Thursday.
            </div>
            <NewsletterForm />
            <p className="text-[11px] text-white/40 mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-4">
                {section.title}
              </div>
              <ul className="space-y-3">
                {section.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/80 hover:text-white transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Mealed, Inc. Cooked with care in Los Angeles.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/safety" className="hover:text-white transition">
              Trust & safety
            </Link>
            <Link href="/about" className="hover:text-white transition">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
