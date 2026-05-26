// Generic fetch wrapper. Server components get an absolute URL via env;
// client components hit the relative path. When the backend lands, swap
// the implementations here — call sites don't change.

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
      : "";
  const res = await fetch(`${base}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    let detail = "";
    try {
      detail = JSON.stringify(await res.json());
    } catch {
      detail = res.statusText;
    }
    throw new Error(`API ${res.status}: ${detail}`);
  }
  return res.json() as Promise<T>;
}
