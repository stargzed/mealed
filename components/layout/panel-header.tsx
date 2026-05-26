"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/store";
import { Wordmark } from "@/components/brand/mascot";
import { NotificationsBell } from "@/components/layout/notifications-bell";
import { toast } from "sonner";

interface Props {
  subtitle?: string;
  showMobileBrand?: boolean;
}

export function PanelHeader({ subtitle, showMobileBrand = true }: Props) {
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-divider md:bg-surface md:border-divider">
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-3">
        {showMobileBrand && (
          <div className="md:hidden">
            <Link href="/">
              <Wordmark size={18} />
            </Link>
          </div>
        )}
        {subtitle && (
          <div className="hidden md:block text-[11px] font-bold uppercase tracking-wider text-muted">
            {subtitle}
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <NotificationsBell size="sm" />
          {user && (
            <button
              onClick={() => {
                signOut();
                toast.success("Signed out");
                router.push("/");
              }}
              className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full border border-border bg-white text-sm font-semibold hover:bg-soft"
            >
              <LogOut size={14} /> Sign out
            </button>
          )}
          {user && (
            <div className="w-9 h-9 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
              {user.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
