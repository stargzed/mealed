"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "../types";
import { DEMO_USER_BY_ROLE } from "../seed/users";

interface AuthState {
  user: User | null;
  signIn: (role: UserRole, overrides?: Partial<User>) => User;
  signOut: () => void;
  setRole: (role: UserRole | null) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (role, overrides) => {
        const base = DEMO_USER_BY_ROLE[role];
        const user: User = { ...base, ...overrides };
        set({ user });
        return user;
      },
      signOut: () => set({ user: null }),
      setRole: (role) => {
        if (role == null) {
          set({ user: null });
          return;
        }
        const base = DEMO_USER_BY_ROLE[role];
        set({ user: base });
      },
    }),
    { name: "mealed.auth" },
  ),
);

export function useCurrentUser() {
  return useAuth((s) => s.user);
}
