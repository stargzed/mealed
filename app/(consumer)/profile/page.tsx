"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chip } from "@/components/ui/chip";
import { useAuth } from "@/lib/auth/store";
import { toast } from "sonner";

const DIETS = ["High-Protein", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Low-Carb", "Pescatarian"];
const ALLERGIES = ["Peanut", "Tree nut", "Soy", "Wheat", "Dairy", "Egg", "Fish", "Shellfish", "Sesame"];

export default function ProfilePage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);

  const [diets, setDiets] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [mealsPerWeek, setMealsPerWeek] = useState("5");

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;

  if (!user) {
    return (
      <div className="max-w-md mx-auto m-6 p-8 bg-white border border-border rounded-2xl text-center">
        <h1 className="m-display text-2xl">Sign in to see your profile</h1>
        <p className="text-sub text-sm mt-2">
          Save your dietary preferences, allergies, and goals.
        </p>
        <Link href="/login" className={buttonVariants({ className: "mt-5" })}>
          Log in
        </Link>
      </div>
    );
  }

  const toggle = (list: string[], setList: (l: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8 space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center font-bold text-lg">
          {user.name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex-1">
          <h1 className="m-display text-2xl">{user.name}</h1>
          <div className="text-sub text-sm">{user.email}</div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            signOut();
            toast.success("Signed out");
            router.push("/");
          }}
        >
          <LogOut size={14} /> Sign out
        </Button>
      </header>

      <section className="bg-white border border-border rounded-2xl p-5">
        <Label>Meal goal</Label>
        <Input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Cut to 12% body fat, eat more whole foods…"
          className="mt-1.5"
        />
        <div className="mt-5">
          <Label htmlFor="mpw">Meals per week</Label>
          <Input
            id="mpw"
            type="number"
            min={1}
            max={21}
            value={mealsPerWeek}
            onChange={(e) => setMealsPerWeek(e.target.value)}
            className="mt-1.5 max-w-[160px]"
          />
        </div>
      </section>

      <section className="bg-white border border-border rounded-2xl p-5">
        <Label>Dietary preferences</Label>
        <div className="flex flex-wrap gap-2 mt-3">
          {DIETS.map((d) => (
            <Chip
              key={d}
              active={diets.includes(d)}
              onClick={() => toggle(diets, setDiets, d)}
            >
              {d}
            </Chip>
          ))}
        </div>
      </section>

      <section className="bg-white border border-border rounded-2xl p-5">
        <Label>Allergies</Label>
        <p className="text-xs text-muted mt-1">
          We'll warn you when a meal contains anything you've flagged.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {ALLERGIES.map((a) => (
            <Chip
              key={a}
              active={allergies.includes(a)}
              onClick={() => toggle(allergies, setAllergies, a)}
            >
              {a}
            </Chip>
          ))}
        </div>
      </section>

      <section className="bg-white border border-border rounded-2xl divide-y divide-divider">
        {[
          ["Payment methods", "/profile/payment"],
          ["Addresses", "/profile/addresses"],
          ["Notifications", "/profile/notifications"],
          ["Help center", "/help"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-between gap-3 p-4 hover:bg-soft transition"
          >
            <span className="text-sm font-semibold">{label}</span>
            <ChevronRight size={16} className="text-muted" />
          </Link>
        ))}
      </section>

      <Button block onClick={() => toast.success("Preferences saved")}>
        Save preferences
      </Button>
    </div>
  );
}
