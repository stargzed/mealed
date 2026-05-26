import { NextResponse } from "next/server";

// Mock create endpoint — accepts a custom request body and returns a stub
// with a generated id. Persistence happens client-side via zustand.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = `cr-${Math.random().toString(36).slice(2, 9)}`;
  const now = new Date().toISOString();
  return NextResponse.json({
    request: {
      id,
      status: "pending",
      createdAt: now,
      updatedAt: now,
      ...body,
    },
  });
}

export async function GET() {
  return NextResponse.json({ requests: [] });
}
