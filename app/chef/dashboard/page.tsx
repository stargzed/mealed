"use client";

import Link from "next/link";
import { ArrowRight, ChefHat, DollarSign, MessageCircle, Sparkles, Star, Truck, Utensils } from "lucide-react";
import { SEED_MEALS, SEED_REVIEWS, SEED_ORDERS, chefMap } from "@/lib/seed";
import { DashboardStatCard } from "@/components/chef/dashboard-stat-card";
import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { formatPrice, generatePickupCode } from "@/lib/utils";
import { useAuth } from "@/lib/auth/store";

const CHEF_ID = "maya"; // demo chef

export default function ChefDashboardPage() {
 const user = useAuth((s) => s.user);
 const chef = chefMap[CHEF_ID];
 const myMeals = SEED_MEALS.filter((m) => m.chefId === CHEF_ID);
 const myOrders = SEED_ORDERS.filter((o) => o.chefId === CHEF_ID);
 const myReviews = SEED_REVIEWS.filter((r) => r.chefId === CHEF_ID);
 const grossThisWeek = myOrders.reduce((sum, o) => sum + o.fees.chefPayout, 0);

 return (
  <div className="max-w-7xl mx-auto space-y-7">
   <header className="flex items-end justify-between gap-4 flex-wrap">
    <div>
     <h1 className="m-display text-3xl md:text-4xl">
      Welcome back, {user?.name.split(" ")[0] ?? chef?.displayName.split(" ")[1]}.
     </h1>
     <p className="text-sub text-sm mt-1">
      {myOrders.length} active orders · weekly menu auto-publishes Thursday at 6pm.
     </p>
    </div>
    <div className="flex gap-2">
     <Link href="/chef/meals/new" className={buttonVariants({ size: "sm" })}>
      <Utensils size={14} /> Add a meal
     </Link>
     <Link href="/chef/menu" className={buttonVariants({ variant: "secondary", size: "sm" })}>
      Edit this week's menu
     </Link>
    </div>
   </header>

   <Tabs defaultValue="week">
    <TabsList>
     <TabsTrigger value="today">Today</TabsTrigger>
     <TabsTrigger value="week">This week</TabsTrigger>
     <TabsTrigger value="month">This month</TabsTrigger>
     <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
    </TabsList>

    <TabsContent value="today" className="!mt-4">
     <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <DashboardStatCard label="Payout (today)" value={formatPrice(58.4)} hint="2 completed orders" icon={<DollarSign size={16} />} />
      <DashboardStatCard label="Active orders" value="3" hint="1 prepping · 2 ready" icon={<Truck size={16} />} />
      <DashboardStatCard label="New messages" value="2" hint="Last from Sarah" icon={<MessageCircle size={16} />} />
      <DashboardStatCard label="Meals sold" value="11" hint="Across 3 menu items" icon={<Utensils size={16} />} />
     </section>
    </TabsContent>

    <TabsContent value="week" className="!mt-4">
     <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <DashboardStatCard label="Week's payout" value={formatPrice(grossThisWeek)} hint="After 12% commission" icon={<DollarSign size={16} />} />
      <DashboardStatCard label="Active orders" value={String(myOrders.filter((o) => o.status !== "completed").length)} hint="Across pickup + delivery" icon={<Truck size={16} />} />
      <DashboardStatCard label="Chef rating" value={chef?.rating?.toFixed(2) ?? " "} hint={`${chef?.reviewCount ?? 0} reviews`} icon={<Star size={16} />} />
      <DashboardStatCard label="Menu items" value={String(myMeals.length)} hint="Live this week" icon={<ChefHat size={16} />} />
     </section>
    </TabsContent>

    <TabsContent value="month" className="!mt-4">
     <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <DashboardStatCard label="Month's payout" value={formatPrice(1842)} hint="↑ 22% vs last month" icon={<DollarSign size={16} />} trend="+22%" />
      <DashboardStatCard label="Completed orders" value="38" hint="Across 21 chefs serving" icon={<Truck size={16} />} />
      <DashboardStatCard label="Repeat rate" value="64%" hint="Above LA average" icon={<Star size={16} />} />
      <DashboardStatCard label="Custom requests filled" value="6" hint="$420 from custom" icon={<Sparkles size={16} />} />
     </section>
    </TabsContent>

    <TabsContent value="lifetime" className="!mt-4">
     <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <DashboardStatCard label="Lifetime payout" value="$12,480" hint="Since you joined" icon={<DollarSign size={16} />} />
      <DashboardStatCard label="Total orders" value="412" hint="Across 142 customers" icon={<Truck size={16} />} />
      <DashboardStatCard label="Top dish" value="Chicken Bowl" hint="184 sold" icon={<ChefHat size={16} />} />
      <DashboardStatCard label="Avg dish rating" value={chef?.rating?.toFixed(2) ?? " "} hint={`${chef?.reviewCount ?? 0} reviews`} icon={<Star size={16} />} />
     </section>
    </TabsContent>
   </Tabs>

   <section className="grid lg:grid-cols-3 gap-4">
    {/* Active orders */}
    <div className="bg-white border border-border rounded-2xl p-5 lg:col-span-2">
     <div className="flex items-center justify-between mb-4">
      <h2 className="font-bold">Active orders</h2>
      <Link href="/chef/orders" className="text-sm font-bold inline-flex items-center gap-1">
       View all <ArrowRight size={13} />
      </Link>
     </div>
     {myOrders.length === 0 ? (
      <p className="text-sub text-sm">Nothing today. Time to post your menu.</p>
     ) : (
      <div className="divide-y divide-divider -mx-2">
       {myOrders.slice(0, 4).map((o) => (
        <div key={o.id} className="px-2 py-3 flex items-center justify-between gap-3">
         <div>
          <div className="font-bold text-sm">
           {o.items.length} {o.items.length === 1 ? "item" : "items"} ·{" "}
           {formatPrice(o.fees.total)}
          </div>
          <div className="m-mono text-[11px] text-muted">
           {generatePickupCode(o.id)} ·{" "}
           {o.fulfillmentType === "delivery" ? "Delivery" : "Pickup"}
          </div>
         </div>
         <OrderStatusBadge status={o.status} />
        </div>
       ))}
      </div>
     )}
    </div>

    {/* Quick actions */}
    <div className="space-y-4">
     <div className="bg-accent-soft border border-accent/15 rounded-2xl p-5">
      <Sparkles size={18} className="text-accent-deep" />
      <div className="font-bold mt-3">3 new custom requests</div>
      <p className="text-sm text-sub mt-1">
       Quote them in 24 hours to stay highly ranked.
      </p>
      <Link
       href="/chef/custom-requests"
       className={buttonVariants({ size: "sm", className: "mt-4" })}
      >
       Review requests
      </Link>
     </div>
     <div className="bg-white border border-border rounded-2xl p-5">
      <MessageCircle size={18} className="text-muted" />
      <div className="font-bold mt-3">2 unread messages</div>
      <p className="text-sm text-sub mt-1">
       Last from Sarah · "Same delivery slot works."
      </p>
      <Link
       href="/chef/messages"
       className={buttonVariants({ variant: "secondary", size: "sm", className: "mt-4" })}
      >
       Open inbox
      </Link>
     </div>
    </div>
   </section>

   <section className="bg-white border border-border rounded-2xl p-5">
    <div className="flex items-center justify-between mb-4">
     <h2 className="font-bold">Recent reviews</h2>
     <Link href="/chef/reviews" className="text-sm font-bold inline-flex items-center gap-1">
      View all <ArrowRight size={13} />
     </Link>
    </div>
    <div className="divide-y divide-divider -mx-2">
     {myReviews.slice(0, 3).map((r) => (
      <div key={r.id} className="px-2 py-4">
       <div className="flex items-center justify-between">
        <div className="font-bold text-sm">{r.reviewerName}</div>
        <Badge variant="default">{r.rating}.0★</Badge>
       </div>
       <p className="text-sm text-sub mt-1">{r.text}</p>
      </div>
     ))}
    </div>
   </section>
  </div>
 );
}
