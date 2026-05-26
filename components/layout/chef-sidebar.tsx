"use client";

import {
  CalendarCheck,
  ChefHat,
  CreditCard,
  Crown,
  DollarSign,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Sparkles,
  Star,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import {
  SessionNavBar,
  type SessionNavItem,
} from "@/components/layout/session-nav-bar";

const ITEMS: SessionNavItem[] = [
  { label: "Dashboard", href: "/chef/dashboard", Icon: LayoutDashboard, group: "main" },
  { label: "Menu", href: "/chef/menu", Icon: CalendarCheck, group: "main" },
  { label: "Meals", href: "/chef/meals", Icon: UtensilsCrossed, group: "main" },
  { label: "Orders", href: "/chef/orders", Icon: Truck, group: "main" },
  {
    label: "Custom requests",
    href: "/chef/custom-requests",
    Icon: Sparkles,
    badge: "3",
    group: "main",
  },
  { label: "Messages", href: "/chef/messages", Icon: MessageCircle, group: "main" },
  { label: "Reviews", href: "/chef/reviews", Icon: Star, group: "secondary" },
  { label: "Earnings", href: "/chef/earnings", Icon: DollarSign, group: "secondary" },
  { label: "Payouts", href: "/chef/payouts", Icon: CreditCard, group: "secondary" },
  { label: "Verification", href: "/chef/verification", Icon: ChefHat, group: "secondary" },
  {
    label: "Subscription",
    href: "/chef/subscription",
    Icon: Crown,
    badge: "Pro",
    group: "secondary",
  },
  { label: "Settings", href: "/chef/settings", Icon: Settings, group: "secondary" },
];

export function ChefSidebar() {
  return <SessionNavBar items={ITEMS} brand="Chef" brandHref="/chef/dashboard" />;
}
