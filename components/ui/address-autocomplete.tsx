"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlacePrediction {
  id: string;
  label: string;
  secondary?: string;
  lat?: number;
  lng?: number;
  full: string;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSelect?: (place: PlacePrediction) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Render the input with the popover's design-system styling. */
  variant?: "input" | "bare";
  /** Auto-focus on mount. */
  autoFocus?: boolean;
  id?: string;
  name?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Search address",
  className,
  inputClassName,
  variant = "input",
  autoFocus,
  id,
  name,
}: Props) {
  const [open, setOpen] = useState(false);
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Debounced fetch
  useEffect(() => {
    if (value.trim().length < 2) {
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
          `/api/places/autocomplete?q=${encodeURIComponent(value)}`,
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
  }, [value]);

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

  const pick = useCallback(
    (p: PlacePrediction) => {
      onChange(p.full);
      onSelect?.(p);
      setPredictions([]);
      setOpen(false);
      setActiveIdx(-1);
    },
    [onChange, onSelect],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || predictions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % predictions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? predictions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      pick(predictions[activeIdx]);
    }
  };

  const inputBase =
    variant === "input"
      ? "w-full h-12 rounded-xl border border-border bg-white pl-10 pr-9 text-[15px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-ink focus:shadow-[0_0_0_3px_rgba(5,5,5,.06)]"
      : "w-full bg-transparent outline-none text-sm placeholder:text-muted";

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      {variant === "input" && (
        <MapPin
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
      )}
      <input
        id={id}
        name={name}
        type="text"
        autoComplete="street-address"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIdx(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(inputBase, inputClassName)}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />
      {value && variant === "input" && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            setPredictions([]);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-soft flex items-center justify-center text-muted"
          aria-label="Clear address"
        >
          <X size={14} />
        </button>
      )}
      {loading && variant === "input" && (
        <Loader2
          size={14}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-muted animate-spin"
        />
      )}

      {open && (predictions.length > 0 || loading || value.trim().length >= 2) && (
        <div className="absolute z-40 mt-1.5 left-0 right-0 bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
          {predictions.length > 0 ? (
            <ul role="listbox" className="py-1 max-h-72 overflow-y-auto">
              {predictions.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => pick(p)}
                    role="option"
                    aria-selected={i === activeIdx}
                    className={cn(
                      "w-full text-left px-3.5 py-2.5 flex items-start gap-3 transition",
                      i === activeIdx ? "bg-soft" : "hover:bg-soft",
                    )}
                  >
                    <MapPin
                      size={14}
                      className="text-muted shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold truncate">{p.label}</div>
                      {p.secondary && (
                        <div className="text-xs text-muted truncate">
                          {p.secondary}
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : loading ? (
            <div className="px-4 py-3 text-sm text-muted inline-flex items-center gap-2">
              <Loader2 size={13} className="animate-spin" /> Looking up addresses…
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-muted">
              No matches. Try a different spelling.
            </div>
          )}
          <div className="px-4 py-2 border-t border-divider text-[10px] text-muted">
            Suggestions powered by{" "}
            {process.env.NEXT_PUBLIC_PLACES_PROVIDER === "google"
              ? "Google Places"
              : "OpenStreetMap"}
          </div>
        </div>
      )}
    </div>
  );
}
