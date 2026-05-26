# Mealed

Home-cooked meal prep marketplace — verified local chefs, weekly prep, pickup or delivery, custom plans.

> **Status:** Frontend complete and interactable. Backend integration points are typed and stubbed (`app/api/*` returns seed data); swap to a real DB/auth/payment provider without touching components.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (Mealed design tokens in `app/globals.css`)
- shadcn-style UI primitives (`components/ui/*`)
- zustand + persist for cart, favorites, auth, orders
- React Hook Form + Zod for every form
- lucide-react icons
- sonner toasts

## Run it

```powershell
npm install
npm run dev
```

http://localhost:3000

A floating black pill at bottom-right is the **dev role switcher**. Click it to jump between **Logged out / Consumer / Chef Maya / Admin** — each role routes to its panel.

To turn the switcher off: `NEXT_PUBLIC_DEV_ROLE_SWITCHER=false` in `.env.local`.

## Project structure

```
app/
  (marketing)/          → marketing layout (top nav + footer)
  (consumer)/           → consumer app (app header + mobile bottom nav)
  chef/                 → chef panel (role-gated)
  admin/                → admin panel (role-gated)
  api/                  → mock backend (route handlers reading seed)
  layout.tsx            → root, fonts, role-switcher portal, toaster
  globals.css           → design tokens + Tailwind

components/
  ui/                   → primitives (button, input, card, chip, …)
  brand/                → Mascot, Wordmark, MealImage, ChefAvatar
  layout/               → MarketingHeader, AppHeader, Footer, MobileBottomNav, *Sidebar, RoleSwitcher
  marketplace/          → MealCard, ChefCard, RowHeader, HScroll, VerifiedTag
  orders/               → OrderStatusBadge, OrderConfirmationCard
  chef/                 → DashboardStatCard
  states/               → EmptyState, ErrorState, Skeleton, Confetti

lib/
  api/                  → typed fetch wrappers (chefs.ts, meals.ts, …)
  auth/                 → zustand store + RequireRole guard
  cart/                 → zustand store (persisted)
  favorites/            → zustand store (persisted)
  orders/               → zustand store for placed orders (persisted)
  seed/                 → typed seed data (chefs, meals, reviews, users, orders, messages)
  fees.ts               → fee logic (commission, service, protection, custom request)
  types.ts              → domain types aligned with backend schema

public/
  mascot.png            → Mealed smiley-fork logo
  mascot.svg            → SVG version (yellow background)
  mascot-transparent.svg → SVG version (transparent)
```

## Routes

**Marketing** — `/`, `/about`, `/safety`, `/become-a-chef`, `/how-it-works`, `/careers`, `/press`, `/help`, `/login`, `/signup`

**Consumer** — `/home`, `/browse`, `/search`, `/chefs/[id]`, `/meals/[id]`, `/categories/[c]`, `/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/orders/[id]/confirmation`, `/favorites`, `/profile`, `/custom-request/[chefId]`, `/messages`, `/messages/[threadId]`

**Chef** (role=chef) — `/chef/onboarding`, `/chef/dashboard`, `/chef/meals`, `/chef/meals/new`, `/chef/menu`, `/chef/orders`, `/chef/custom-requests`, `/chef/messages`, `/chef/reviews`, `/chef/earnings`, `/chef/payouts`, `/chef/verification`, `/chef/settings`

**Admin** (role=admin) — `/admin/dashboard`, `/admin/chefs`, `/admin/verification`, `/admin/orders`, `/admin/users`, `/admin/reports`, `/admin/revenue`

## Plugging in real services

Swap-in points are isolated. See `.env.example` for every key.

| Concern | Current | Swap target |
| --- | --- | --- |
| Auth | mock `lib/auth/store.ts` | Clerk / Supabase Auth / NextAuth |
| Database | seed in `lib/seed/*` returned by `app/api/*/route.ts` | Postgres + Prisma (types already match in `lib/types.ts`) |
| Payments | `/checkout` fake-succeeds → `/orders/[id]/confirmation` | Stripe Payment Element + webhook |
| Payouts | static UI in `/chef/payouts` | Stripe Connect |
| Uploads | UI-only dropzones in onboarding + meal create | UploadThing / S3 / R2 |
| Email | none | Resend |
| Maps | static label | Google Maps / Mapbox / Radar |

## See also

- [`PROGRESS.md`](./PROGRESS.md) — full build report
- [`docs/superpowers/specs/2026-05-23-mealed-frontend-design.md`](./docs/superpowers/specs/2026-05-23-mealed-frontend-design.md) — design doc
