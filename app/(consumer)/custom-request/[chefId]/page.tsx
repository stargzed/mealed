"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { chefMap } from "@/lib/seed";
import { ChefAvatar } from "@/components/brand/chef-avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Chip } from "@/components/ui/chip";
import { Calendar } from "@/components/ui/calendar";
import { EmptyState } from "@/components/states/empty-state";
import type { DateRange } from "react-day-picker";

const DIETS = ["High-Protein", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Low-Carb"];
const ALLERGIES = ["Peanut", "Tree nut", "Soy", "Wheat", "Dairy", "Egg", "Fish", "Shellfish", "Sesame"];
const PROTEINS = ["Chicken", "Beef", "Turkey", "Fish", "Tofu", "Tempeh", "Legumes"];

const schema = z.object({
  goal: z.string().min(8, "Tell the chef about your goal"),
  mealsPerWeek: z.coerce.number().min(1).max(21),
  numberOfDays: z.coerce.number().min(1).max(7),
  foodsToAvoid: z.string().optional(),
  budget: z.coerce.number().min(20),
  fulfillmentPreference: z.enum(["pickup", "delivery", "either"]),
  desiredStartDate: z.string().min(1),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CustomRequestPage() {
  const params = useParams<{ chefId: string }>();
  const router = useRouter();
  const chef = chefMap[params.chefId];

  const [diets, setDiets] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [proteins, setProteins] = useState<string[]>([]);
  const [range, setRange] = useState<DateRange | undefined>();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mealsPerWeek: 5,
      numberOfDays: 5,
      budget: 100,
      fulfillmentPreference: "pickup",
    },
  });

  if (!chef) {
    return (
      <EmptyState
        title="Chef not found"
        action={
          <button onClick={() => router.push("/browse")} className={buttonVariants({})}>
            Back to browse
          </button>
        }
        className="m-6"
      />
    );
  }

  if (!chef.customRequestsEnabled) {
    return (
      <EmptyState
        title="This chef doesn't take custom requests"
        description="Try Chef Lina or Chef Maya for personalized plans."
        action={
          <Link href="/browse" className={buttonVariants({})}>
            Browse chefs
          </Link>
        }
        className="m-6"
      />
    );
  }

  const toggle = (list: string[], setList: (l: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const onSubmit = async (data: FormData) => {
    await fetch("/api/custom-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chefId: chef.id,
        ...data,
        dietaryRequirements: diets,
        allergies,
        preferredProteins: proteins,
      }),
    });
    toast.success(
      `Request sent to ${chef.displayName} — expect a quote within 24 hours.`,
    );
    router.push(`/messages?chef=${chef.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8">
      <Link href={`/chefs/${chef.id}`} className="text-xs text-muted hover:text-ink">
        ← {chef.displayName}
      </Link>
      <h1 className="m-display text-3xl md:text-4xl mt-2">Custom meal request</h1>
      <p className="text-sub mt-2">
        Tell {chef.displayName} what you need. They'll reply with a personalized
        quote and plan.
      </p>

      <div className="flex items-center gap-3 mt-6 p-4 bg-soft rounded-2xl">
        <ChefAvatar chef={chef} size={48} />
        <div>
          <div className="font-bold">{chef.displayName}</div>
          <div className="text-xs text-muted">
            Minimum order ${chef.minimumCustomOrderAmount ?? 50} · Custom request fee 15%
          </div>
        </div>
      </div>

      <form className="space-y-6 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="goal">Goal *</Label>
          <Textarea
            id="goal"
            placeholder="E.g. 10 high-protein lunches, low carb, mostly chicken, under $130."
            className="mt-1.5"
            {...form.register("goal")}
          />
          {form.formState.errors.goal && (
            <p className="text-xs text-tomato mt-1.5">{form.formState.errors.goal.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="mealsPerWeek">Meals / week</Label>
            <Input
              id="mealsPerWeek"
              type="number"
              min={1}
              max={21}
              className="mt-1.5"
              {...form.register("mealsPerWeek")}
            />
          </div>
          <div>
            <Label htmlFor="numberOfDays"># of days</Label>
            <Input
              id="numberOfDays"
              type="number"
              min={1}
              max={7}
              className="mt-1.5"
              {...form.register("numberOfDays")}
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget ($)</Label>
            <Input
              id="budget"
              type="number"
              min={20}
              className="mt-1.5"
              {...form.register("budget")}
            />
          </div>
        </div>

        <div>
          <Label>Dietary requirements</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {DIETS.map((d) => (
              <Chip
                key={d}
                type="button"
                active={diets.includes(d)}
                onClick={() => toggle(diets, setDiets, d)}
              >
                {d}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <Label>Allergies</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {ALLERGIES.map((a) => (
              <Chip
                key={a}
                type="button"
                active={allergies.includes(a)}
                onClick={() => toggle(allergies, setAllergies, a)}
              >
                {a}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <Label>Preferred proteins</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {PROTEINS.map((p) => (
              <Chip
                key={p}
                type="button"
                active={proteins.includes(p)}
                onClick={() => toggle(proteins, setProteins, p)}
              >
                {p}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="foodsToAvoid">Foods to avoid (optional)</Label>
          <Input
            id="foodsToAvoid"
            placeholder="Mushrooms, cilantro, raw onions..."
            className="mt-1.5"
            {...form.register("foodsToAvoid")}
          />
        </div>

        <div>
          <Label>Desired delivery window *</Label>
          <p className="text-xs text-muted mt-1 mb-2">
            Pick a range of at least 3 days. The chef will quote you a date within it.
          </p>
          <div className="bg-white border border-border rounded-2xl p-3 inline-block">
            <Calendar
              mode="range"
              defaultMonth={range?.from ?? new Date()}
              selected={range}
              onSelect={(r) => {
                setRange(r);
                if (r?.from) {
                  form.setValue(
                    "desiredStartDate",
                    r.from.toISOString().slice(0, 10),
                  );
                }
              }}
              numberOfMonths={1}
              min={3}
              disabled={{ before: new Date() }}
            />
          </div>
          {form.formState.errors.desiredStartDate && (
            <p className="text-xs text-tomato mt-1.5">
              {form.formState.errors.desiredStartDate.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="fulfillment">Fulfillment</Label>
          <select
            id="fulfillment"
            {...form.register("fulfillmentPreference")}
            className="mt-1.5 w-full h-12 rounded-xl border border-border px-3 bg-white outline-none focus:border-ink"
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
            <option value="either">Either</option>
          </select>
        </div>

        <div>
          <Label htmlFor="notes">Anything else?</Label>
          <Textarea
            id="notes"
            placeholder="Workout schedule, meal timing, packaging needs..."
            className="mt-1.5"
            {...form.register("notes")}
          />
        </div>

        <Button type="submit" size="lg" block disabled={form.formState.isSubmitting}>
          Send to {chef.displayName}
        </Button>
      </form>
    </div>
  );
}
