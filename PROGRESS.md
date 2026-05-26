# Mealed Frontend — Progress Report

**Built overnight 2026-05-22 → 2026-05-23.** Production build passes (`npm run build` → ✓ all 50 routes compile, no TS errors). Ready to run.

## How to run

```powershell
cd "C:\Users\saint\Documents\mealed website"
npm run dev
```

Open http://localhost:3000.

The floating black pill in the bottom-right corner is the **dev role switcher**. Click it to jump between Logged out / Consumer / Chef Maya / Admin — each role lands on the right page.

## What was built

### 1. Foundation
- Next.js 14 App Router + TypeScript + Tailwind + shadcn-style primitives
- Mealed design tokens ported from `tokens.css` → Tailwind theme + globals.css
- Plus Jakarta Sans + JetBrains Mono via `next/font/google`
- Smiley-fork mascot copied to `/public/mascot.png`, used as both `<Image>` (full color) and `mask-image` (single-color silhouette)
- ESLint, .gitignore, .env.example wired

### 2. State + service layer
- **API mock routes** (`app/api/*`) return typed seed data for chefs, meals, orders, search, reviews, messages, custom requests, admin stats. Frontend makes real `fetch('/api/...')` calls — swap a handler for a real DB later, no component changes.
- **Service layer** (`lib/api/*.ts`) — thin typed wrappers around fetch.
- **zustand stores** (`lib/{auth,cart,favorites,orders}/store.ts`) with `persist` middleware → localStorage. Cart, favorites, signed-in user, and placed orders survive refresh.
- **Domain types** (`lib/types.ts`) mirror the README's database models 1:1, so backend integration is mechanical.
- **Fee logic** (`lib/fees.ts`) — `computeOrderFees` and `computeCustomQuoteFees` implement the README's fee rules (12% commission, 6% service fee, 5% protection with $2.99 min, 15% custom request fee).

### 3. Layout shells
- `MarketingHeader`, `Footer` (used by all marketing routes)
- `AppHeader`, `MobileBottomNav` (used by all consumer routes; bottom nav hides on `md+`)
- `ChefSidebar`, `AdminSidebar`, `PanelHeader` (used by chef/admin)
- `RequireRole` guard wraps `/chef/*` and `/admin/*` — bounces to `/login` if signed out, `/home` if wrong role.

### 4. Marketing pages (10)
- `/` — Landing hero, trust strip, how-it-works, popular meals, featured chefs, savings comparison, chef CTA, final CTA
- `/about`, `/safety`, `/become-a-chef`, `/how-it-works`, `/careers`, `/press`, `/help`
- `/login`, `/signup` — React Hook Form + Zod, wired to auth store. Sign in with `chef@…` → chef panel, `admin@…` → admin panel, anything else → consumer.

### 5. Consumer pages (16)
- `/home` — categories, hero card, popular near you, verified chefs, high-protein, healthy, custom requests strip
- `/browse` — meal/chef toggle, category chips, pickup/delivery toggle, verified filter, empty state
- `/search` — live search across meals + chefs + tags
- `/categories/[category]` — meals filtered by tag
- `/chefs/[chefId]` — chef profile with menu, reviews, message + custom request buttons, favorite
- `/meals/[mealId]` — quantity, fulfillment, allergy warnings, macros, add to cart, related meals, reviews
- `/cart` — line items, qty controls, fee breakdown, single-chef-per-cart enforced
- `/checkout` — fulfillment, address/time, notes, allergy confirm, fake-success payment → confirmation
- `/orders` — active + past orders (combines API seed + placed orders from localStorage)
- `/orders/[orderId]` — status timeline, chef, delivery info, items, fee breakdown
- `/orders/[orderId]/confirmation` — success card with confetti, pickup code, track/message/back
- `/favorites` — saved meals + chefs from local store
- `/profile` — name, email, dietary preferences, allergies, meal goals, sign out
- `/custom-request/[chefId]` — full custom request form (goal, meals/week, budget, diets, allergies, proteins, foods to avoid, start date, notes) → POSTs to `/api/custom-requests`
- `/messages` — thread list
- `/messages/[threadId]` — chat view with composer (local state)

### 6. Chef panel (13) — gated to role=chef
- `/chef/onboarding` — 5-step wizard (basics, location, kitchen scan, credentials, review)
- `/chef/dashboard` — stat cards (payout, active orders, rating, menu items), active orders, custom request callout, unread messages, recent reviews
- `/chef/meals` — list with active/paused, edit/disable buttons
- `/chef/meals/new` — full create form with photos upload box, tags, allergens, macros
- `/chef/menu` — day-grid table for assigning meals to days of the week
- `/chef/orders` — status advance buttons (Accept → Start prepping → Mark ready → Mark completed)
- `/chef/custom-requests` — request inbox + quote form with live fee breakdown showing customer pays and chef receives
- `/chef/messages` — thread list (chef-side view)
- `/chef/reviews` — rating + 5-star stats, list with tags
- `/chef/earnings` — weekly table with gross / commission / payout
- `/chef/payouts` — Stripe Connect status panel, payout summary, recent payouts table
- `/chef/verification` — current verification status, checklist, re-upload entry point
- `/chef/settings` — profile, fulfillment toggles (pickup, delivery, custom requests), delivery radius + fee

### 7. Admin panel (7) — gated to role=admin
- `/admin/dashboard` — platform stats, verification queue preview, open reports, latest orders table
- `/admin/chefs` — chefs table with rating, status badge
- `/admin/verification` — review queue with selectable applications, doc previews, sink-visible confirm, approve/reject + reviewer notes
- `/admin/orders` — orders table with status, total, platform take
- `/admin/users` — users table with role badges
- `/admin/reports` — open + resolved issues
- `/admin/revenue` — stat cards (gross volume, chef commission, consumer service fees, protection fees) + platform take

### 8. Dev role switcher
Bottom-right floating pill. Click → switch role + route appropriately. Toggle off with `NEXT_PUBLIC_DEV_ROLE_SWITCHER=false`.

## What's deliberately deferred for the backend slice

- Real auth (currently mock; structure is provider-agnostic — drop in Clerk / NextAuth / Supabase)
- Real Postgres / Prisma schema (types in `lib/types.ts` are 1:1 with README models — generate Prisma schema from these)
- Real Stripe / Stripe Connect (checkout fake-succeeds; webhook handler + Payment Element are the swap point)
- Real file uploads (kitchen scans, credentials, meal photos — UI is wired, swap to UploadThing/S3)
- Real-time messaging (currently polled / local-state)
- Email (Resend wire-up)
- Maps (location selector is a static label)
- SEO sitemap.xml + robots.txt

`.env.example` lists every key for the integrations above.

## Things to know

- **Cart constraint:** one chef per cart. Adding a meal from a different chef shows a toast and resets the cart. This matches Uber Eats / DoorDash behavior and avoids cross-chef fulfillment headaches.
- **Mascot logo:** the original PNG, SVG (yellow bg), and transparent SVG are all in `/public`. Marketing uses the PNG via `next/image`; headers/footers use it as a single-color mask so it adopts `currentColor`.
- **Tailwind colors:** `text-ink`, `text-sub`, `text-muted`, `bg-soft`, `bg-surface`, `bg-accent`, `border-border` — all CSS-var-backed, never hardcoded hex outside `globals.css`.
- **Static vs dynamic routes:** marketing + most consumer/chef/admin pages are statically prerendered. Dynamic routes (`/chefs/[id]`, `/meals/[id]`, `/orders/[id]`, etc.) render on demand.

## Stats

- **45 routes** built (10 marketing + 16 consumer + 13 chef + 7 admin + 9 API)
- **Build:** all 50 static pages prerender successfully, no TS errors, no warnings.
- **First load JS shared:** 87.2 kB

## Next steps when you're ready for the backend slice

1. Stand up Postgres + Prisma → schema from `lib/types.ts`
2. Pick auth (Clerk easiest, NextAuth most flexible)
3. Swap `app/api/*/route.ts` handlers from seed → DB queries
4. Wire Stripe Payment Element on `/checkout` + webhook handler at `/api/webhooks/stripe`
5. Stripe Connect for chef payouts
6. UploadThing for `/chef/onboarding` and `/chef/meals/new` uploads

Each step is a contained change — the frontend doesn't move.
