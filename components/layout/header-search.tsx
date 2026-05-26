"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function HeaderSearch({ variant = "desktop", className }: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const sp = useSearchParams();
  const onSearchRoute = pathname === "/search";
  const initial = onSearchRoute ? sp?.get("q") ?? "" : "";
  const [value, setValue] = useState(initial);

  // When we land on /search (or the URL q-param changes externally — e.g. a
  // category chip click), sync the input value so the bar reflects truth.
  useEffect(() => {
    if (onSearchRoute) setValue(sp?.get("q") ?? "");
  }, [onSearchRoute, sp]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = value.trim();
    if (!q) {
      router.push("/search");
      return;
    }
    if (onSearchRoute) {
      router.replace(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const clear = () => {
    setValue("");
    if (onSearchRoute) router.replace("/search");
  };

  const placeholder =
    variant === "mobile"
      ? "Search meals, chefs, high-protein…"
      : "Search meals, chefs, high-protein, vegan…";
  const height = variant === "mobile" ? "h-11" : "h-11";

  return (
    <form
      onSubmit={submit}
      className={cn(
        height,
        "rounded-full bg-soft border border-border flex items-center gap-2 px-3 transition focus-within:bg-white focus-within:border-ink focus-within:shadow-[0_0_0_3px_rgba(5,5,5,.06)]",
        className,
      )}
      role="search"
    >
      <Search size={17} className="text-muted shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-muted"
        aria-label="Search Mealed"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="w-6 h-6 rounded-full hover:bg-border flex items-center justify-center text-muted shrink-0"
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      )}
      <button
        type="button"
        onClick={() => router.push("/browse")}
        className="w-7 h-7 rounded-full hover:bg-border flex items-center justify-center text-muted shrink-0"
        aria-label="Open filters"
      >
        <SlidersHorizontal size={15} />
      </button>
    </form>
  );
}
