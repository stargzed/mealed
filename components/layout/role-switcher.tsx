"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/store";
import { cn } from "@/lib/utils";

const OPTIONS: Array<{ label: string; role: "consumer" | "chef" | "admin" | null; route?: string }> = [
  { label: "Logged out", role: null, route: "/" },
  { label: "Consumer", role: "consumer", route: "/home" },
  { label: "Chef (Maya)", role: "chef", route: "/chef/dashboard" },
  { label: "Admin", role: "admin", route: "/admin/dashboard" },
];

export function RoleSwitcher() {
  const enabled = process.env.NEXT_PUBLIC_DEV_ROLE_SWITCHER !== "false";
  const user = useAuth((s) => s.user);
  const setRole = useAuth((s) => s.setRole);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!enabled || !mounted) return null;

  const current = user ? user.role : null;
  const currentLabel = current
    ? user!.role[0].toUpperCase() + user!.role.slice(1)
    : "Logged out";

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      <div className="relative">
        {open && (
          <div className="absolute bottom-12 right-0 w-56 rounded-lg border border-border bg-white shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-divider">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Dev role switcher
              </div>
              <div className="text-xs text-sub mt-0.5">
                Switch between roles to preview every surface.
              </div>
            </div>
            {OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setRole(opt.role);
                  if (opt.route) router.push(opt.route);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-soft transition",
                  current === opt.role && "bg-soft font-semibold",
                )}
              >
                <span>{opt.label}</span>
                {current === opt.role && <span className="m-vdot" />}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 h-10 px-3 rounded-full bg-ink text-white text-xs font-bold shadow-lg hover:bg-dark transition"
        >
          <span className="m-vdot" />
          {currentLabel}
        </button>
      </div>
    </div>
  );
}
