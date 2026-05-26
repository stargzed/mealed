"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import type { PlacePrediction } from "@/components/ui/address-autocomplete";
import {
  QUICK_LOCATIONS,
  useLocation,
  type Location,
} from "@/lib/location/store";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "desktop" | "mobile";
}

export function LocationPicker({ variant = "desktop" }: Props) {
  const current = useLocation((s) => s.current);
  const recents = useLocation((s) => s.recents);
  const setLocation = useLocation((s) => s.setLocation);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => setMounted(true), []);

  // Debounced fetch
  useEffect(() => {
    if (q.trim().length < 2) {
      setPredictions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await fetch(
          `/api/places/autocomplete?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal },
        );
        const json = (await res.json()) as { predictions: PlacePrediction[] };
        setPredictions(json.predictions ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setPredictions([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the search input every time the panel opens.
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQ("");
      setPredictions([]);
    }
  }, [open]);

  const apply = useCallback(
    (loc: Location) => {
      setLocation(loc);
      setOpen(false);
      toast.success(`Set location to ${loc.label}`);
    },
    [setLocation],
  );

  if (!mounted) return null;

  const showQuickPicks = q.trim().length < 2;
  const showResults = q.trim().length >= 2;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      {variant === "desktop" ? (
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-soft text-sm"
        >
          <MapPin size={15} />
          <span className="font-semibold truncate max-w-[200px]">
            {current.label}
          </span>
          <ChevronDown
            size={14}
            className={cn("transition", open && "rotate-180")}
          />
        </button>
      ) : (
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-left"
        >
          <MapPin size={16} />
          <div>
            <div className="text-[10px] text-muted font-bold uppercase tracking-wider">
              Deliver to
            </div>
            <div className="flex items-center gap-1 font-bold text-sm">
              <span className="truncate max-w-[180px]">{current.label}</span>
              <ChevronDown
                size={14}
                className={cn("transition", open && "rotate-180")}
              />
            </div>
          </div>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "absolute z-40 mt-2 bg-white border border-border rounded-2xl shadow-lg overflow-hidden",
            "left-0 w-[420px] max-w-[calc(100vw-32px)]",
          )}
        >
          <div className="px-5 pt-5 pb-3">
            <h2 className="m-display text-2xl tracking-tightest">Addresses</h2>
          </div>

          {/* Search */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-3 h-12 px-4 rounded-full bg-soft border border-transparent focus-within:border-ink focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(5,5,5,.06)] transition">
              <Search size={17} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search address"
                className="flex-1 min-w-0 bg-transparent outline-none text-[15px] placeholder:text-muted"
                aria-label="Search address"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="text-sm font-semibold text-sub hover:text-ink shrink-0"
                >
                  Clear
                </button>
              )}
              {loading && (
                <Loader2 size={14} className="text-muted animate-spin shrink-0" />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto pb-2">
            {showResults && predictions.length > 0 && (
              <ul role="listbox">
                {predictions.map((p) => (
                  <li key={p.id}>
                    <PickRow
                      label={p.label}
                      secondary={p.secondary}
                      onClick={() =>
                        apply({
                          label: p.label,
                          full: p.full,
                          lat: p.lat,
                          lng: p.lng,
                        })
                      }
                    />
                  </li>
                ))}
              </ul>
            )}

            {showResults && !loading && predictions.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-muted">
                No matches for "{q}". Try a different spelling.
              </div>
            )}

            {showQuickPicks && recents.length > 0 && (
              <div>
                <SectionHeader>Recent</SectionHeader>
                {recents.map((loc) => (
                  <PickRow
                    key={`r-${loc.full}`}
                    label={loc.label}
                    secondary={loc.full.split(",").slice(1, 3).join(",").trim()}
                    onClick={() => apply(loc)}
                  />
                ))}
              </div>
            )}

            {showQuickPicks && (
              <div>
                <SectionHeader>Popular neighborhoods</SectionHeader>
                {QUICK_LOCATIONS.map((loc) => (
                  <PickRow
                    key={loc.label}
                    label={loc.label}
                    secondary="Los Angeles, CA"
                    active={loc.label === current.label}
                    onClick={() => apply(loc)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted">
      {children}
    </div>
  );
}

interface PickRowProps {
  label: string;
  secondary?: string;
  active?: boolean;
  onClick?: () => void;
}

function PickRow({ label, secondary, active, onClick }: PickRowProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-3 px-5 py-3 transition",
        active ? "bg-soft" : "hover:bg-soft",
      )}
    >
      <MapPin
        size={16}
        className={cn("shrink-0 mt-0.5", active ? "text-accent" : "text-muted")}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-bold leading-tight truncate">
          {label}
        </div>
        {secondary && (
          <div className="text-xs text-muted mt-0.5 truncate">{secondary}</div>
        )}
      </div>
    </button>
  );
}
