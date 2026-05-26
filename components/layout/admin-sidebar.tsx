"use client";

import {
  AlertTriangle,
  DollarSign,
  LayoutDashboard,
  ShieldCheck,
  Truck,
  Users,
  Utensils,
} from "lucide-react";
import {
  SessionNavBar,
  type SessionNavItem,
} from "@/components/layout/session-nav-bar";

const ITEMS: SessionNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", Icon: LayoutDashboard, group: "main" },
  { label: "Chefs", href: "/admin/chefs", Icon: Utensils, group: "main" },
  {
    label: "Verification",
    href: "/admin/verification",
    Icon: ShieldCheck,
    badge: "1",
    group: "main",
  },
  { label: "Orders", href: "/admin/orders", Icon: Truck, group: "main" },
  { label: "Users", href: "/admin/users", Icon: Users, group: "secondary" },
  { label: "Reports", href: "/admin/reports", Icon: AlertTriangle, group: "secondary" },
  { label: "Revenue", href: "/admin/revenue", Icon: DollarSign, group: "secondary" },
];

export function AdminSidebar() {
  return <SessionNavBar items={ITEMS} brand="Admin" brandHref="/admin/dashboard" />;
}
