"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SEED_THREADS } from "@/lib/seed";
import { EmptyState } from "@/components/states/empty-state";
import { Badge } from "@/components/ui/badge";
import { formatRelative } from "@/lib/utils";

export default function MessagesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <h1 className="m-display text-3xl md:text-4xl mb-6">Messages</h1>

      {SEED_THREADS.length === 0 ? (
        <EmptyState
          icon={<MessageCircle size={20} />}
          title="No messages yet"
          description="Start a conversation with a chef from their profile."
        />
      ) : (
        <div className="border border-border rounded-2xl bg-white divide-y divide-divider overflow-hidden">
          {SEED_THREADS.map((t) => (
            <Link
              key={t.id}
              href={`/messages/${t.id}`}
              className="flex items-start gap-3 p-4 hover:bg-soft transition"
            >
              <div className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center font-bold text-sm">
                {t.chef?.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-sm">{t.chef?.name}</div>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
