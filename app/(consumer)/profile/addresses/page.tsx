"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Check, Home, MapPin, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AddressAutocomplete,
  type PlacePrediction,
} from "@/components/ui/address-autocomplete";
import { useAddresses, type SavedAddress } from "@/lib/addresses/store";
import { useLocation } from "@/lib/location/store";
import { cn } from "@/lib/utils";

const LABELS = [
  { label: "Home", Icon: Home },
  { label: "Work", Icon: Briefcase },
  { label: "Other", Icon: MapPin },
] as const;

export default function AddressesPage() {
  const [hydrated, setHydrated] = useState(false);
  const addresses = useAddresses((s) => s.addresses);
  const add = useAddresses((s) => s.add);
  const remove = useAddresses((s) => s.remove);
  const setDefault = useAddresses((s) => s.setDefault);
  const setLocation = useLocation((s) => s.setLocation);

  const [adding, setAdding] = useState(false);
  const [pickedLabel, setPickedLabel] = useState<"Home" | "Work" | "Other">(
    "Home",
  );
  const [draft, setDraft] = useState("");
  const [picked, setPicked] = useState<PlacePrediction | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  const startAdding = () => {
    setAdding(true);
    setDraft("");
    setPicked(null);
    setNotes("");
    setPickedLabel("Home");
  };

  const cancel = () => {
    setAdding(false);
    setDraft("");
    setPicked(null);
    setNotes("");
  };

  const save = () => {
    if (!picked) {
      toast.error("Pick an address from the suggestions");
      return;
    }
    const next = add({
      label: pickedLabel,
      primary: picked.label,
      secondary: picked.secondary ?? "",
      full: picked.full,
      lat: picked.lat,
      lng: picked.lng,
      notes: notes.trim() || undefined,
    });
    // Also push it as the active location so /home / browse use it.
    setLocation({
      label: next.primary,
      full: next.full,
      lat: next.lat,
      lng: next.lng,
    });
    toast.success(`Added ${pickedLabel} address`);
    cancel();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <Link href="/profile" className="text-xs text-muted hover:text-ink">
        ← Profile
      </Link>
      <h1 className="m-display text-3xl md:text-4xl mt-2">Addresses</h1>
      <p className="text-sub text-sm mt-2">
        Your saved delivery addresses. The default is used at checkout.
      </p>

      <div className="mt-6 space-y-3">
        {addresses.length === 0 && !adding ? (
          <div className="bg-white border border-dashed border-border rounded-2xl p-8 text-center">
            <MapPin size={20} className="mx-auto text-muted mb-3" />
            <div className="font-bold">No saved addresses yet</div>
            <p className="text-sub text-sm mt-1">
              Add an address so checkout fills automatically.
            </p>
          </div>
        ) : (
          addresses.map((a) => (
            <AddressRow
              key={a.id}
              addr={a}
              onRemove={() => {
                remove(a.id);
                toast(`Removed ${a.label}`);
              }}
              onSetDefault={() => {
                setDefault(a.id);
                setLocation({
                  label: a.primary,
                  full: a.full,
                  lat: a.lat,
                  lng: a.lng,
                });
                toast.success(`${a.label} is now your default`);
              }}
            />
          ))
        )}
      </div>

      {!adding ? (
        <Button
          variant="secondary"
          block
          className="mt-5"
          onClick={startAdding}
        >
          <Plus size={15} /> Add an address
        </Button>
      ) : (
        <div className="bg-white border border-border rounded-2xl p-6 mt-5 space-y-4">
          <h2 className="font-bold">Add an address</h2>

          <div>
            <Label>Label</Label>
            <div className="flex gap-2 mt-2">
              {LABELS.map(({ label, Icon }) => (
                <button
                  key={label}
                  onClick={() => setPickedLabel(label)}
                  className={cn(
                    "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-bold border transition",
                    pickedLabel === label
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink border-border hover:bg-soft",
                  )}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="addr">Address</Label>
            <AddressAutocomplete
              id="addr"
              value={draft}
              onChange={(v) => {
                setDraft(v);
                if (picked && v !== picked.full) setPicked(null);
              }}
              onSelect={(p) => {
                setPicked(p);
                setDraft(p.full);
              }}
              placeholder="Start typing your address…"
              className="mt-1.5"
              autoFocus
            />
            {picked && (
              <p className="text-xs text-accent-deep mt-1.5 inline-flex items-center gap-1">
                <Check size={12} /> {picked.label}, {picked.secondary}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Delivery notes (optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Gate code, apartment, where to leave it…"
              className="mt-1.5"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button type="button" className="flex-1" onClick={save}>
              Save address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddressRow({
  addr,
  onRemove,
  onSetDefault,
}: {
  addr: SavedAddress;
  onRemove: () => void;
  onSetDefault: () => void;
}) {
  const labelDef = LABELS.find((l) => l.label === addr.label) ?? LABELS[2];
  const Icon = labelDef.Icon;
  return (
    <div className="bg-white border border-border rounded-2xl p-4 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-soft flex items-center justify-center shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{addr.label}</span>
          {addr.isDefault && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-deep bg-accent-soft px-1.5 py-0.5 rounded">
              Default
            </span>
          )}
        </div>
        <div className="text-sm mt-0.5">{addr.primary}</div>
        <div className="text-xs text-muted mt-0.5">{addr.secondary}</div>
        {addr.notes && (
          <div className="text-xs text-sub mt-1 italic">"{addr.notes}"</div>
        )}
      </div>
      <div className="flex items-center gap-1">
        {!addr.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-xs font-semibold text-ink hover:bg-soft px-2 py-1.5 rounded-lg inline-flex items-center gap-1"
          >
            <Check size={12} /> Default
          </button>
        )}
        <button
          onClick={onRemove}
          className="w-9 h-9 rounded-full text-muted hover:text-tomato hover:bg-tomato-soft flex items-center justify-center"
          aria-label="Remove address"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
