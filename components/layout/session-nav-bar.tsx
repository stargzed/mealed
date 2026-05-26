"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  HelpCircle,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Mascot } from "@/components/brand/mascot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth/store";
import { cn } from "@/lib/utils";

export interface SessionNavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number | string; className?: string }>;
  badge?: string;
  group?: string;
}

interface Props {
  items: SessionNavItem[];
  brand: string; // "Chef panel" | "Admin"
  brandHref: string;
}

const sidebarVariants = {
  open: { width: "15rem" },
  closed: { width: "3.05rem" },
};
const labelVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: -10, opacity: 0 },
};

export function SessionNavBar({ items, brand, brandHref }: Props) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);

  // Group items by their `group` (preserved order within group).
  const groups: Record<string, SessionNavItem[]> = {};
  for (const it of items) {
    const g = it.group ?? "default";
    groups[g] ??= [];
    groups[g].push(it);
  }
  const groupKeys = Object.keys(groups);

  return (
    <motion.aside
      className="hidden md:flex shrink-0 sticky top-0 h-screen border-r border-divider bg-white z-30 flex-col"
      initial={collapsed ? "closed" : "open"}
      animate={collapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Top: brand */}
      <div className="h-[54px] border-b border-divider flex items-center px-3 shrink-0">
        <Link href={brandHref} className="flex items-center gap-2.5 min-w-0">
          <Mascot size={26} />
          <motion.span
            variants={labelVariants}
            className="font-bold text-sm whitespace-nowrap"
          >
            {brand}
          </motion.span>
        </Link>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-1">
          {groupKeys.map((g, gi) => (
            <div key={g} className="contents">
              {gi > 0 && <Separator className="my-2" />}
              {groups[g].map((it) => {
                const active =
                  pathname === it.href || pathname.startsWith(it.href + "/");
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    title={collapsed ? it.label : undefined}
                    className={cn(
                      "flex h-8 items-center gap-2.5 rounded-lg px-2 text-sm font-semibold transition whitespace-nowrap",
                      active
                        ? "bg-ink text-white"
                        : "text-sub hover:bg-soft hover:text-ink",
                    )}
                  >
                    <it.Icon size={16} className="shrink-0" />
                    <motion.span
                      variants={labelVariants}
                      className="flex items-center gap-2"
                    >
                      {it.label}
                      {it.badge && (
                        <span
                          className={cn(
                            "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                            active
                              ? "bg-white/20 text-white"
                              : "bg-accent-soft text-accent-deep",
                          )}
                        >
                          {it.badge}
                        </span>
                      )}
                    </motion.span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom: settings + account */}
      <div className="border-t border-divider p-2 flex flex-col gap-1">
        <Link
          href="/help"
          className="flex h-8 items-center gap-2.5 rounded-lg px-2 text-sm font-semibold text-sub hover:bg-soft hover:text-ink whitespace-nowrap"
        >
          <HelpCircle size={16} className="shrink-0" />
          <motion.span variants={labelVariants}>Help</motion.span>
        </Link>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex h-9 items-center gap-2.5 rounded-lg px-2 text-sm font-semibold hover:bg-soft text-left">
            <span className="w-6 h-6 rounded-full bg-ink text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {user
                ? user.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")
                : "?"}
            </span>
            <motion.span
              variants={labelVariants}
              className="flex w-full items-center gap-2"
            >
              <span className="truncate flex-1">
                {user?.name ?? "Account"}
              </span>
              <ChevronsUpDown size={12} className="text-muted shrink-0" />
            </motion.span>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={6} align="start" className="w-56">
            {user && (
              <>
                <div className="px-2 py-2 text-xs">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-muted truncate">{user.email}</div>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/profile">
                <span className="inline-flex items-center gap-2">
                  <UserCircle size={14} /> Profile
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/profile/notifications">
                <span className="inline-flex items-center gap-2">
                  <Settings size={14} /> Settings
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut();
                toast.success("Signed out");
                router.push("/");
              }}
              className="cursor-pointer text-tomato"
            >
              <span className="inline-flex items-center gap-2">
                <LogOut size={14} /> Sign out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.aside>
  );
}
