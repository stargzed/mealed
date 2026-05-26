"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ChefHat,
  ChevronsUpDown,
  CreditCard,
  Gift,
  HelpCircle,
  LogOut,
  MapPin,
  MessagesSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/store";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function UserDropdown({ size = 40 }: { size?: number }) {
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const router = useRouter();

  if (!user) {
    return (
      <Link
        href="/login"
        className="ml-1 text-sm font-bold text-ink px-3 py-2 hover:bg-soft rounded-full"
      >
        Log in
      </Link>
    );
  }

  const profileHref =
    user.role === "chef"
      ? "/chef/settings"
      : user.role === "admin"
      ? "/admin/dashboard"
      : "/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open user menu"
          className="rounded-full border border-border bg-ink text-white font-bold flex items-center justify-center hover:bg-dark transition"
          style={{ width: size, height: size, fontSize: size * 0.32 }}
        >
          {initials(user.name)}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[300px] rounded-2xl bg-surface p-0 border-border shadow-lg"
      >
        <div className="bg-white rounded-2xl p-1 shadow-soft border border-border/40 mb-1">
          {/* Header */}
          <div className="flex items-center p-3">
            <div className="flex-1 flex items-center gap-2.5">
              <Avatar className="size-10 border border-border bg-ink text-white">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback className="!bg-ink !text-white font-bold">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="font-bold text-sm truncate">{user.name}</div>
                <div className="text-xs text-muted truncate">{user.email}</div>
              </div>
            </div>
            <Badge variant="verified" className="capitalize ml-2 shrink-0">
              {user.role}
            </Badge>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Item
              href={profileHref}
              icon={<User size={16} className="text-muted" />}
              label="Your profile"
            />
            <Item
              href="/messages"
              icon={<MessagesSquare size={16} className="text-muted" />}
              label="Messages"
            />
            <Item
              href="/profile/addresses"
              icon={<MapPin size={16} className="text-muted" />}
              label="Addresses"
            />
            <Item
              href="/profile/payment"
              icon={<CreditCard size={16} className="text-muted" />}
              label="Payment methods"
            />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Item
              href="/become-a-chef"
              icon={<ChefHat size={16} className="text-amber-600" />}
              label={user.role === "chef" ? "Chef dashboard" : "Become a chef"}
              badge={user.role !== "chef" ? "Earn 88%" : undefined}
            />
            <Item
              href="/help"
              icon={<Gift size={16} className="text-muted" />}
              label="Refer a friend"
            />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Item
              href="/profile/notifications"
              icon={<Settings size={16} className="text-muted" />}
              label="Settings"
            />
            <Item
              href="/safety"
              icon={<ShieldCheck size={16} className="text-muted" />}
              label="Trust & safety"
            />
            <Item
              href="/help"
              icon={<HelpCircle size={16} className="text-muted" />}
              label="Help center"
            />
          </DropdownMenuGroup>
        </div>

        <div className="p-1">
          <DropdownMenuItem
            onClick={() => {
              signOut();
              toast.success("Signed out");
              router.push("/");
            }}
            className="p-2.5 rounded-lg cursor-pointer text-tomato data-[highlighted]:bg-tomato-soft"
          >
            <span className="flex items-center gap-2 font-bold">
              <LogOut size={16} /> Sign out
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Item({
  href,
  icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <DropdownMenuItem
      asChild
      className={cn(
        "p-2.5 rounded-lg cursor-pointer",
        badge && "justify-between",
      )}
    >
      <Link href={href}>
        <span className="flex items-center gap-2 font-medium">
          {icon}
          {label}
        </span>
        {badge && (
          <Badge variant="warn" className="text-[10px]">
            {badge}
          </Badge>
        )}
      </Link>
    </DropdownMenuItem>
  );
}
