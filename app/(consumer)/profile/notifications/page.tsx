"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useNotificationPrefs,
  type Category,
  type Channel,
} from "@/lib/preferences/notifications-store";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<{ key: Category; title: string; desc: string }> = [
  {
    key: "orderUpdates",
    title: "Order updates",
    desc: "When a chef accepts, starts prepping, or marks your order ready.",
  },
  {
    key: "messages",
    title: "Chef messages",
    desc: "New messages from chefs you've ordered from or contacted.",
  },
  {
    key: "customRequests",
    title: "Custom request replies",
    desc: "Quotes and updates on custom meal-prep requests you've sent.",
  },
  {
    key: "reviews",
    title: "Reviews & receipts",
    desc: "Receipts, reminders to review meals, and weekly summaries.",
  },
  {
    key: "marketing",
    title: "Tips & offers",
    desc: "Occasional updates about new chefs, features, and promos.",
  },
];

const CHANNELS: Array<{ key: Channel; label: string; Icon: typeof Bell }> = [
  { key: "push", label: "Push", Icon: Smartphone },
  { key: "email", label: "Email", Icon: Mail },
  { key: "sms", label: "SMS", Icon: MessageSquare },
];

export default function NotificationPreferencesPage() {
  const [hydrated, setHydrated] = useState(false);
  const prefs = useNotificationPrefs((s) => s.prefs);
  const setPref = useNotificationPrefs((s) => s.setPref);
  const reset = useNotificationPrefs((s) => s.reset);

  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <Link href="/profile" className="text-xs text-muted hover:text-ink">
        ← Profile
      </Link>
      <div className="flex items-baseline justify-between mt-2 gap-4">
        <h1 className="m-display text-3xl md:text-4xl">Notifications</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            reset();
            toast.success("Restored default preferences");
          }}
        >
          Reset to default
        </Button>
      </div>
      <p className="text-sub text-sm mt-2">
        Pick how you want to hear from Mealed. We'll only message you about things
        you opt into.
      </p>

      <div className="bg-white border border-border rounded-2xl mt-7 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_repeat(3,80px)] gap-4 px-5 py-3 border-b border-divider text-[10px] font-bold uppercase tracking-wider text-muted">
          <div>Category</div>
          {CHANNELS.map((c) => (
            <div key={c.key} className="text-center">
              {c.label}
            </div>
          ))}
        </div>

        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className="px-5 py-4 border-b border-divider last:border-0"
          >
            <div className="md:grid md:grid-cols-[1fr_repeat(3,80px)] md:gap-4 md:items-center">
              <div>
                <div className="font-bold text-sm">{cat.title}</div>
                <div className="text-xs text-muted mt-0.5 leading-relaxed">
                  {cat.desc}
                </div>
              </div>
              <div className="flex gap-3 mt-3 md:mt-0 md:contents">
                {CHANNELS.map((c) => (
                  <div
                    key={c.key}
                    className="md:flex md:items-center md:justify-center"
                  >
                    <ToggleSwitch
                      ariaLabel={`${cat.title} via ${c.label}`}
                      labelOnMobile={c.label}
                      enabled={prefs[cat.key][c.key]}
                      onChange={(v) => setPref(cat.key, c.key, v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-muted mt-4 leading-relaxed">
        Push notifications require allowing notifications in your browser. SMS
        carrier rates may apply. We never sell your contact info.
      </p>
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onChange,
  ariaLabel,
  labelOnMobile,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
  labelOnMobile?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <span className="text-xs font-semibold md:hidden">{labelOnMobile}</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={ariaLabel}
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative w-11 h-6 rounded-full transition shrink-0",
          enabled ? "bg-accent" : "bg-soft border border-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
            enabled && "translate-x-5",
          )}
        />
      </button>
    </label>
  );
}
