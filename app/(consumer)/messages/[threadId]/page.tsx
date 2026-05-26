"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { SEED_MESSAGES, SEED_THREADS } from "@/lib/seed";
import { EmptyState } from "@/components/states/empty-state";
import { Button } from "@/components/ui/button";
import { cn, formatRelative } from "@/lib/utils";
import type { Message } from "@/lib/types";

export default function MessageThreadPage() {
  const params = useParams<{ threadId: string }>();
  const thread = SEED_THREADS.find((t) => t.id === params.threadId);
  const [composer, setComposer] = useState("");
  const [extra, setExtra] = useState<Message[]>([]);

  if (!thread) {
    return (
      <EmptyState
        title="Thread not found"
        action={
          <Link href="/messages" className="bg-ink text-white h-10 px-4 rounded-full font-bold text-sm">
            Back
          </Link>
        }
        className="m-6"
      />
    );
  }

  const messages = [
    ...SEED_MESSAGES.filter((m) => m.threadId === thread.id),
    ...extra,
  ];

  const send = () => {
    if (!composer.trim()) return;
    setExtra((m) => [
      ...m,
      {
        id: `local-${Date.now()}`,
        threadId: thread.id,
        senderId: thread.consumerId,
        body: composer.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setComposer("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-92px)] max-w-3xl mx-auto">
      <header className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-divider">
        <Link href="/messages" className="w-9 h-9 rounded-full border border-border flex items-center justify-center">
          <ArrowLeft size={16} />
        </Link>
        <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-bold text-sm">
          {thread.chef?.initials}
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm">{thread.chef?.name}</div>
          <div className="text-[11px] text-muted">Usually replies in 2 hours</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === thread.consumerId;
          return (
            <div
              key={msg.id}
              className={cn(
                "max-w-[80%] md:max-w-[68%] rounded-2xl px-4 py-2.5 text-sm",
                isMe
                  ? "ml-auto bg-ink text-white"
                  : "mr-auto bg-soft text-ink",
              )}
            >
              {msg.body}
              <div className={cn("text-[10px] mt-1", isMe ? "text-white/60" : "text-muted")}>
                {formatRelative(msg.createdAt)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-divider p-3 md:p-4 flex gap-2 bg-white">
        <input
          type="text"
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message…"
          className="flex-1 h-11 rounded-full bg-soft border border-border px-4 outline-none focus:border-ink"
        />
        <Button size="sm" className="!h-11 !w-11 !p-0" onClick={send}>
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
