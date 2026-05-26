import { apiFetch } from "./client";
import type { Message, MessageThread } from "../types";

export async function getThreads(): Promise<MessageThread[]> {
  const { threads } = await apiFetch<{ threads: MessageThread[] }>(
    `/api/messages`,
  );
  return threads;
}

export async function getMessages(threadId: string): Promise<Message[]> {
  const { messages } = await apiFetch<{ messages: Message[] }>(
    `/api/messages?threadId=${encodeURIComponent(threadId)}`,
  );
  return messages;
}
