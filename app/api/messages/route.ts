import { NextResponse } from "next/server";
import { SEED_MESSAGES, SEED_THREADS } from "@/lib/seed";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("threadId");
  if (threadId) {
    const messages = SEED_MESSAGES.filter((m) => m.threadId === threadId);
    return NextResponse.json({ messages });
  }
  return NextResponse.json({ threads: SEED_THREADS });
}
