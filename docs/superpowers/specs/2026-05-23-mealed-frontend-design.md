# Mealed — Frontend-Only Slice Design

**Date:** 2026-05-23
**Scope:** Full interactive frontend for Mealed (marketing + consumer + chef + admin) with no real backend. All data flows through Next.js API routes that return typed seed data; the frontend makes real `fetch()` calls so the backend swap is a route-handler change, not a frontend change.

## Decisions locked in brainstorming

| Topic | Choice |
| --- | --- |
| Framework | Next.js 14 App Router + TypeScript |
| Styling | Tailwind + shadcn/ui + CSS custom properties ported from `tokens.css` |
| Forms | React Hook Form + Zod |
| Client state | zustand + `persist` middleware (localStorage) for cart, favorites, signed-in user, "chef's own listings", "placed orders" |
| Data layer | `lib/api/*.ts` thin clients → `fetch('/api/...')` → Next.js route handlers in `app/api/*` returning seed data |
| Auth | Mock sign-in form (any creds work). Floating dev role switcher toggles Logged-out / Consumer / Chef / Admin. Role gating real (consumer can't see `/chef/*` etc). |
| Payments | Checkout UI real; "Place order" fake-succeeds → creates order in localStorage → confirmation page. Stripe wiring deferred. |
| Uploads | Upload UI real; files turn into preview blobs + filename in state. Real upload deferred. |
| Logo | Smiley-fork mascot (provided PNG). Copied into `public/mascot.png` and used as `<Image>` in headers + as `mask-image` for single-color silhouettes. |
| Brand colors | Neutral whites/grays + single accent `#00B86B` (Mealed green). Black pill buttons. Plus Jakarta Sans. |

## Architecture

```
mealed website/
├── app/
│   ├── (marketing)/          → marketing layout (top nav, footer)
│   │   ├── page.tsx              → /
│   │   ├── about/page.tsx
│   │   ├── safety/page.tsx
│   │   ├── become-a-chef/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── press/page.tsx
│   │   ├── help/page.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (consumer)/           → consumer app layout (app header + mobile bottom nav)
│   │   ├── home/page.tsx
│   │   ├── browse/page.tsx
│   │   ├── search/page.tsx
│   │   ├── chefs/[chefId]/page.tsx
│   │   ├── meals/[mealId]/page.tsx
│   │   ├── categories/[category]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── orders/[orderId]/page.tsx
│   │   ├── orders/[orderId]/confirmation/page.tsx
│   │   ├── favorites/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── custom-request/[chefId]/page.tsx
│   │   ├── messages/page.tsx
│   │   └── messages/[threadId]/page.tsx
│   ├── chef/                 → chef panel (gated to role=chef)
│   │   ├── onboarding/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── meals/page.tsx
│   │   ├── meals/new/page.tsx
│   │   ├── menu/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── custom-requests/page.tsx
│   │   ├── messages/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── earnings/page.tsx
│   │   ├── payouts/page.tsx
│   │   ├── verification/page.tsx
│   │   └── settings/page.tsx
│   ├── admin/                → admin panel (gated to role=admin)
│   │   ├── dashboard/page.tsx
│   │   ├── chefs/page.tsx
│   │   ├── verification/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── users/page.tsx
│   │   ├── reports/page.tsx
│   │   └── revenue/page.tsx
│   ├── api/                  → mock backend (route handlers reading seed)
│   │   ├── chefs/route.ts
│   │   ├── chefs/[chefId]/route.ts
│   │   ├── meals/route.ts
│   │   ├── meals/[mealId]/route.ts
│   │   ├── orders/route.ts
│   │   ├── orders/[orderId]/route.ts
│   │   ├── custom-requests/route.ts
│   │   ├── reviews/route.ts
│   │   ├── search/route.ts
│   │   ├── messages/route.ts
│   │   └── admin/...
│   ├── layout.tsx            → root, fonts, role-switcher portal, toaster
│   └── globals.css           → tokens + Tailwind
├── components/
│   ├── ui/                       → shadcn primitives (button, card, input, …)
│   ├── brand/                    → Mascot, Wordmark, MealImage, ChefAvatar
│   ├── layout/                   → MarketingHeader, AppHeader, Footer, MobileBottomNav, RoleSwitcher
│   ├── marketplace/              → MealCard, ChefCard, CategoryChip, RowHeader, HScroll, SearchBar, FilterDrawer
│   ├── orders/                   → OrderCard, OrderStatusBadge, FeeBreakdown, OrderConfirmationCard
│   ├── chef/                     → DashboardStatCard, MenuRow, KitchenScanUpload
│   ├── admin/                    → AdminTable, VerificationReviewCard
│   ├── empty-states/             → EmptyState (one component, themed)
│   └── states/                   → LoadingSkeleton, ErrorState
├── lib/
│   ├── api/                      → chefs.ts, meals.ts, orders.ts, …  (real fetch wrappers)
│   ├── auth/                     → store.ts (zustand), guards.tsx, mock-users.ts
│   ├── cart/                     → store.ts (zustand+persist)
│   ├── favorites/                → store.ts
│   ├── seed/                     → chefs.ts, meals.ts, palettes.ts, reviews.ts (ported from data.js)
│   ├── fees.ts                   → FEE_CONFIG + computeFees(...) per README
│   ├── types.ts                  → all DB-aligned TS types
│   ├── utils.ts                  → cn(), formatPrice, generatePickupCode, …
│   └── validation/               → Zod schemas per form
└── public/
    └── mascot.png                → copied from provided UI assets
```

### Component reuse from existing HTML mockup

Direct ports (visual fidelity matters here):
- `MealCard`, `ChefHeroCard`, `Rating`, `VerifiedTag`, `CategoryChip`, `RowHeader`, `HScroll`, `BottomNav`, `MobileHeader`, `Confetti`, `Mascot`, `Wordmark`, `MealImage` (renders Unsplash photo with food-palette gradient fallback).

### State

- **Auth** — zustand `useAuth` store. Shape: `{ user: { id, name, email, role } | null, signIn, signOut, setRole }`. Persisted.
- **Cart** — zustand `useCart`. `addItem`, `removeItem`, `setQty`, `clear`. Persisted.
- **Favorites** — zustand `useFavorites`. Sets for `meals` and `chefs`. Persisted.
- **Orders** — placed orders stored in `useOrders` (persisted). `/orders` and `/orders/[id]` pull from both API seed (history) + local store (user-placed).
- **Chef-own data** — `useChefDraft` for meals chefs create during the session (persisted, scoped by chefId).

### Routing / role gating

- `lib/auth/guards.tsx` exports `<RequireRole role="chef|admin|consumer">` component that redirects to `/login` if no user, or to `/home` if role mismatch.
- `app/chef/layout.tsx` wraps its tree in `<RequireRole role="chef">`.
- `app/admin/layout.tsx` wraps in `<RequireRole role="admin">`.

### Dev role switcher

- Floating pill bottom-right, visible only when `NEXT_PUBLIC_DEV_ROLE_SWITCHER=true` (default true in dev). Dropdown: Logged out / Consumer (Sarah) / Chef Maya / Admin. Click → swaps user in store + routes appropriately.

### Fee logic

Implemented per README in `lib/fees.ts` — `computeOrderFees(subtotal, deliveryFee)` and `computeCustomQuoteFees(subtotal, deliveryFee)`. Returns the full FeeBreakdown shape.

### Loading / empty / error states

Every page that fetches data has three React Suspense/`error.tsx`/empty-state branches. Suspense fallbacks use `LoadingSkeleton`. `error.tsx` shows `ErrorState`. Empty branch shows `EmptyState`.

## Build order (this session)

1. Scaffold (package.json, tsconfig, Tailwind, globals, fonts, mascot, shadcn primitives)
2. Types + seed + service layer + API route handlers
3. Auth store + role switcher + guards
4. Layout shells (marketing header, app header, footer, mobile bottom nav)
5. Marketing pages
6. Consumer pages
7. Chef pages
8. Admin pages
9. PROGRESS.md, npm install, lint/build

## Out of scope (explicitly deferred)

- Real Postgres / Prisma schema
- Real Clerk/Supabase auth
- Real Stripe / Stripe Connect integration
- Real file uploads (UploadThing / S3)
- Real email (Resend)
- Real maps / location
- WebSocket-based real-time messaging
- SEO sitemap + RSS

These get backend slices later. The frontend leaves clean integration points (`lib/api/*.ts`, `app/api/*` handlers, `.env.example`) so the swap is mechanical.
