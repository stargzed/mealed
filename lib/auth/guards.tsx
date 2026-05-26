"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserRole } from "../types";
import { useAuth } from "./store";

interface Props {
  role: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireRole({ role, children, fallback = null }: Props) {
  const user = useAuth((s) => s.user);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const allowed = Array.isArray(role) ? role : [role];
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!allowed.includes(user.role)) {
      router.replace("/home");
    }
  }, [hydrated, user, role, router]);

  if (!hydrated) return null;
  const allowed = Array.isArray(role) ? role : [role];
  if (!user || !allowed.includes(user.role)) return <>{fallback}</>;
  return <>{children}</>;
}
