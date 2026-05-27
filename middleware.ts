import { NextResponse, type NextRequest } from "next/server";

/**
 * Marketing-only mode. Every transactional route (cart, checkout, profile,
 * orders, messages, login/signup, chef tools, admin) lives in the mobile app
 * visiting them on the web bounces back to the landing page. The rest of
 * the site (landing, /browse, meal/chef detail, marketing pages) is reachable
 * as normal.
 */
const BLOCKED_PREFIXES = [
 "/login",
 "/signup",
 "/cart",
 "/checkout",
 "/orders",
 "/profile",
 "/messages",
 "/favorites",
 "/custom-request",
 "/home",      // old consumer dashboard landing covers this
 "/browse",     // browsing is app-only
 "/search",
 "/categories",
 "/meals",      // meal detail
 "/chefs",      // chef profile detail
 "/chef",      // chef dashboard, menu builder, earnings, etc.
 "/admin",
];

export function middleware(req: NextRequest) {
 const { pathname } = req.nextUrl;
 if (BLOCKED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
 }
 return NextResponse.next();
}

export const config = {
 // Skip static assets and Next internals. Everything else funnels through.
 matcher: ["/((?!_next|api|.*\\.[\\w]+).*)"],
};
