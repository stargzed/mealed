"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChefHat,
  CheckCheck,
  MessageCircle,
  Receipt,
  Star,
  Trash2,
} from "lucide-react";
import {
  useNotifications,
  type AppNotification,
  type NotificationType,
} from "@/lib/notifications/store";
import { cn, formatRelative } from "@/lib/utils";

interface Props {
  size?: "sm" | "md";
}

const TYPE_ICON: Record<NotificationType, typeof Receipt> = {
  order: Receipt,
  message: MessageCircle,
  custom_request: ChefHat,
  review: Star,
  system: Bell,
};

export function NotificationsBell({ size = "md" }: Props) {
  const router = useRouter();
  const items = useNotifications((s) => s.items);
  const markRead = useNotifications((s) => s.markRead);
  const markAllRead = useNotifications((s) => s.markAllRead);
  const clear = useNotifications((s) => s.clear);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

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

  const unread = mounted ? items.filter((n) => !n.readAt).length : 0;
  const dim = size === "sm" ? "w-9 h-9" : "w-10 h-10";
  const iconSize = size === "sm" ? 17 : 17;

  const onItemClick = (n: AppNotification) => {
    markRead(n.id);
    setOpen(false);
    if (n.href) router.push(n.href);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          dim,
          "rounded-full border border-border bg-white flex items-center justify-center hover:bg-soft transition relative",
        )}
        aria-label="Notifications"
      >
        <Bell size={iconSize} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-tomato text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && mounted && (
        <div className="absolute right-0 z-40 mt-2 w-[360px] max-w-[calc(100vw-32px)] bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-divider flex items-center justify-between">
            <div>
              <div className="m-display text-lg tracking-tightest">
                Notifications
              </div>
              <div className="text-xs text-muted">
                {unread === 0 ? "All caught up" : `${unread} unread`}
              </div>
            </div>
            {items.length > 0 && (
              <button
                onClick={markAllRead}
                disabled={unread === 0}
                className="text-xs font-semibold text-sub hover:text-ink inline-flex items-center gap-1 disabled:opacity-40"
              >
                <CheckCheck size={13} /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-muted">
                You're all caught up.
              </div>
            ) : (
              <ul>
                {items.map((n) => {
                  const Icon = TYPE_ICON[n.type] ?? Bell;
                  const unreadDot = !n.readAt;
                  return (
                    <li key={n.id} className="border-b border-divider last:border-0">
                      <button
                        onClick={() => onItemClick(n)}
                        className={cn(
                          "w-full text-left px-5 py-3 flex items-start gap-3 transition hover:bg-soft",
                          unreadDot && "bg-accent-soft/30",
                        )}
                      >
                        <span
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                            unreadDot
                              ? "bg-accent text-white"
                              : "bg-soft text-muted",
                          )}
                        >
                          <Icon size={15} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="text-sm font-bold truncate">
                              {n.title}
                            </div>
                            <div className="text-[11px] text-muted shrink-0">
                              {formatRelative(n.createdAt)}
                            </div>
                          </div>
                          <div className="text-sm text-sub mt-0.5 line-clamp-2 leading-relaxed">
                            {n.body}
                          </div>
                        </div>
                        {unreadDot && (
                          <span
                            className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2"
                            aria-label="Unread"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="px-5 py-3 border-t border-divider flex items-center justify-between">
            <Link
              href="/profile/notifications"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-ink hover:underline"
            >
              Notification settings
            </Link>
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-xs text-muted hover:text-tomato inline-flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
