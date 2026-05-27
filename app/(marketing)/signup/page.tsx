"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/brand/mascot";
import { useAuth } from "@/lib/auth/store";
import type { UserRole } from "@/lib/types";

const schema = z.object({
 name: z.string().min(2, "Tell us your name"),
 email: z.string().email("Enter a valid email"),
 password: z.string().min(6, "At least 6 characters"),
 role: z.enum(["consumer", "chef"]),
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
 return (
  <Suspense fallback={null}>
   <SignupPageInner />
  </Suspense>
 );
}

function SignupPageInner() {
 const router = useRouter();
 const sp = useSearchParams();
 const signIn = useAuth((s) => s.signIn);
 const presetRole = (sp.get("role") as UserRole | null) ?? "consumer";

 const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { role: presetRole === "chef" ? "chef" : "consumer" },
 });

 useEffect(() => {
  form.setValue("role", presetRole === "chef" ? "chef" : "consumer");
 }, [presetRole, form]);

 const role = form.watch("role");

 const onSubmit = (data: FormData) => {
  const user = signIn(data.role, { name: data.name, email: data.email });
  toast.success(
   data.role === "chef"
    ? "Chef application started!"
    : `Welcome to Mealed, ${user.name.split(" ")[0]}!`,
  );
  router.push(data.role === "chef" ? "/chef/onboarding" : "/home");
 };

 return (
  <div className="min-h-[calc(100vh-72px)] grid md:grid-cols-2">
   <div className="flex items-center justify-center px-5 md:px-12 py-14">
    <div className="w-full max-w-md">
     <Link href="/" className="inline-flex items-center gap-2 mb-10">
      <Mascot size={28} />
      <span className="m-display text-2xl">Mealed</span>
     </Link>
     <h1 className="m-display text-3xl md:text-4xl">Create your account.</h1>
     <p className="text-sub mt-2 mb-6">
      Demo: any details work. Pick a role to preview that surface.
     </p>

     <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-soft rounded-full">
      {(["consumer", "chef"] as const).map((r) => (
       <button
        key={r}
        type="button"
        onClick={() => form.setValue("role", r)}
        className={`h-10 rounded-full text-sm font-bold transition ${
         role === r ? "bg-white text-ink shadow" : "text-sub"
        }`}
       >
        {r === "consumer" ? "I want to eat" : "I want to cook"}
       </button>
      ))}
     </div>

     <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
       <Label htmlFor="name">Full name</Label>
       <Input
        id="name"
        className="mt-1.5"
        placeholder="Your name"
        {...form.register("name")}
       />
       {form.formState.errors.name && (
        <p className="text-xs text-tomato mt-1.5">
         {form.formState.errors.name.message}
        </p>
       )}
      </div>
      <div>
       <Label htmlFor="email">Email</Label>
       <Input
        id="email"
        type="email"
        className="mt-1.5"
        placeholder="you@example.com"
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
        className="mt-1.5"
        placeholder="At least 6 characters"
        {...form.register("password")}
       />
       {form.formState.errors.password && (
        <p className="text-xs text-tomato mt-1.5">
         {form.formState.errors.password.message}
        </p>
       )}
      </div>
      <Button type="submit" size="lg" block>
       {role === "chef" ? "Start chef application" : "Create account"}
      </Button>
     </form>

     <div className="text-sm text-sub mt-6">
      Already on Mealed?{" "}
      <Link href="/login" className="text-ink font-bold underline underline-offset-4">
       Sign in
      </Link>
     </div>
    </div>
   </div>

   <div className="hidden md:flex bg-accent text-white items-center justify-center px-12 py-14 relative overflow-hidden">
    <div className="relative max-w-md">
     <div className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-3">
      Welcome
     </div>
     <h2 className="m-display text-4xl lg:text-5xl">
      Real food.
      <br />Real chefs.
      <br />In your zip code.
     </h2>
     <p className="text-white/80 mt-5 leading-relaxed">
      Verified home chefs cooking the kind of food your grandma made minus
      the dishes.
     </p>
    </div>
   </div>
  </div>
 );
}
