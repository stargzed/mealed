"use client";

import { create } from "zustand";

interface State {
  open: boolean;
  /** Optional context line shown above the CTAs, e.g. "Want to order Crispy Tofu Bowl?". */
  context?: string;
  show: (context?: string) => void;
  close: () => void;
}

/**
 * Global store that controls the "Download the Mealed app" dialog. Any button
 * on the site that requires an account (cart, checkout, sign-in, custom request,
 * etc.) calls `useAppDownload.getState().show("optional context")` to open it.
 */
export const useAppDownload = create<State>((set) => ({
  open: false,
  context: undefined,
  show: (context) => set({ open: true, context }),
  close: () => set({ open: false, context: undefined }),
}));
