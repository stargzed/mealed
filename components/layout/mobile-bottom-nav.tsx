"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Receipt, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Home", href: "/home", Icon: Home, match: (p: string) => p === "/home" },
  { label: "Browse", href: "/browse", Icon: Search, match: (p: string) => p.startsWith("/browse") || p.startsWith("/search") },
  { label: "Orders", href: "/orders", Icon: Receipt, match: (p: string) => p.startsWith("/orders") },
  { label: "Favorites", href: "/favorites", Icon: Heart, match: (p: string) => p.startsWith("/favorites") },
  { label: "Profile", href: "/profile", Icon: User, match: (p: string) => p.startsWith("/profile") },
];

export function MobileBottomNav() {
  const pathname = usePathname() ?? "";
  return (
    <nav className="md:hidden sticky bottom-0 bg-white border-t border-border grid grid-cols-5 pb-[env(safe-area-inset-bottom)] pt-2 z-30">
      {ITEMS.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 pb-2.5 text-[10px] font-semibold transition-colors",
              active ? "text-ink" : "text-muted",
            )}
          >
            <item.Icon size={22} strokeWidth={active ? 2 : 1.6} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
