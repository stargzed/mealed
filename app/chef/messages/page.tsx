"use client";

import { SEED_THREADS } from "@/lib/seed";
import { EmptyState } from "@/components/states/empty-state";
import { Badge } from "@/components/ui/badge";
import { formatRelative } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export default function ChefMessagesPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="m-display text-3xl mb-6">Messages</h1>
      {SEED_THREADS.length === 0 ? (
        <EmptyState icon={<MessageCircle size={20} />} title="No messages yet" />
      ) : (
        <div className="border border-border rounded-2xl bg-white divide-y divide-divider overflow-hidden">
          {SEED_THREADS.map((t) => (
            <button
              key={t.id}
              className="w-full text-left flex items-start gap-3 p-4 hover:bg-soft transition"
            >
              <div className="w-11 h-11 rounded-full bg-soft border border-border flex items-center justify-center font-bold text-sm">
                {t.consumer?.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-sm">{t.consumer?.name}</div>
                  <div className="text-[11px] text-muted">
                    {t.lastMessage ? formatRelative(t.lastMessage.createdAt) : ""}
                  </div>
                </div>
                <div className="text-sm text-sub truncate mt-0.5">
                  {t.lastMessage?.body}
                </div>
              </div>
              {t.unread > 0 && (
                <Badge variant="accent" className="!h-5 !rounded-full">
                  {t.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
