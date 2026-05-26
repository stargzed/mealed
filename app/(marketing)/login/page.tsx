"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/brand/mascot";
import { useAuth } from "@/lib/auth/store";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "At least 4 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next");
  const signIn = useAuth((s) => s.signIn);

  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    // Mock: infer role from email convention, otherwise consumer.
    const role = data.email.startsWith("chef")
      ? "chef"
      : data.email.startsWith("admin")
      ? "admin"
      : "consumer";
    const user = signIn(role, { email: data.email });
    toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
    router.push(
      next ??
        (role === "chef"
          ? "/chef/dashboard"
          : role === "admin"
          ? "/admin/dashboard"
          : "/home"),
    );
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid md:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-5 md:px-12 py-14">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <Mascot size={28} />
            <span className="m-display text-2xl">Mealed</span>
          </Link>
          <h1 className="m-display text-3xl md:text-4xl">Welcome back.</h1>
          <p className="text-sub mt-2 mb-8">
            Sign in to keep ordering. Demo: any email works.
          </p>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1.5"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-tomato mt-1.5">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                className="mt-1.5"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-tomato mt-1.5">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" size="lg" block disabled={form.formState.isSubmitting}>
              Sign in
            </Button>
          </form>
          <div className="text-xs text-sub mt-5 leading-relaxed">
            Tip: try{" "}
            <code className="bg-soft px-1.5 py-0.5 rounded font-mono text-[11px]">
              chef@demo.com
            </code>{" "}
            or{" "}
            <code className="bg-soft px-1.5 py-0.5 rounded font-mono text-[11px]">
              admin@demo.com
            </code>{" "}
            to preview the chef or admin panel.
          </div>
          <div className="text-sm text-sub mt-6">
            New to Mealed?{" "}
            <Link href="/signup" className="text-ink font-bold underline underline-offset-4">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Right: pitch */}
      <div className="hidden md:flex bg-ink text-white items-center justify-center px-12 py-14 relative overflow-hidden">
        <div className="relative max-w-md">
          <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-3">
            Members
          </div>
          <h2 className="m-display text-4xl lg:text-5xl">
            Your weekly prep,
            <br />all in one inbox.
          </h2>
          <p className="text-white/70 mt-5 leading-relaxed">
            Sign in to message your chefs, track orders, and reorder favorites in a tap.
          </p>
        </div>
      </div>
    </div>
  );
}
