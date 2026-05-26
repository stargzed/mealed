"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Chip } from "@/components/ui/chip";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { useState } from "react";
import { useChefMeals } from "@/lib/chef-meals/store";

const CHEF_ID = "maya";

const TAGS = ["High-Protein", "Vegan", "Vegetarian", "Gluten-Free", "Healthy", "Family Meals", "Low Carb", "Comfort Food", "Breakfast", "Cold Meals"];
const ALLERGENS = ["Peanut", "Tree nut", "Soy", "Wheat", "Dairy", "Egg", "Fish", "Shellfish", "Sesame"];

const schema = z.object({
  name: z.string().min(3, "Meal name is required"),
  description: z.string().min(10, "Add a description"),
  price: z.coerce.number().min(1, "Price is required"),
  calories: z.coerce.number().optional(),
  protein: z.coerce.number().optional(),
  carbs: z.coerce.number().optional(),
  fat: z.coerce.number().optional(),
  bundleCount: z.coerce.number().optional(),
  bundlePrice: z.coerce.number().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewMealPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  const addMeal = useChefMeals((s) => s.add);

  const onSubmit = (data: FormData) => {
    const macros =
      data.calories || data.protein || data.carbs || data.fat
        ? {
            cal: Number(data.calories ?? 0),
            p: Number(data.protein ?? 0),
            c: Number(data.carbs ?? 0),
            f: Number(data.fat ?? 0),
          }
        : undefined;
    const bundle =
      data.bundleCount && data.bundlePrice
        ? {
            count: Number(data.bundleCount),
            price: Number(data.bundlePrice),
            label: `${data.bundleCount} meals · $${data.bundlePrice}`,
          }
        : undefined;
    // Pick a palette that vaguely matches one of the chosen tags.
    const palette = tags.includes("Vegan")
      ? "veggie"
      : tags.includes("Family Meals")
      ? "family"
      : tags.includes("Breakfast")
      ? "breakfast"
      : tags.includes("Cold Meals")
      ? "cold"
      : "bowl";
    addMeal(CHEF_ID, {
      name: data.name,
      description: data.description,
      price: data.price,
      palette,
      tags,
      allergens,
      macros,
      bundle,
    });
    toast.success(`"${data.name}" added to your menu`);
    router.push("/chef/meals");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="m-display text-3xl">Add a meal</h1>
      <p className="text-sub text-sm mt-1">
        Fill it out fast. You can edit anything later.
      </p>

      <form className="mt-7 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="bg-white border border-border rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Meal name *</Label>
              <Input
                id="name"
                placeholder="Grilled Chicken Power Bowl"
                className="mt-1.5"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-tomato mt-1.5">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                className="mt-1.5"
                placeholder="Marinated chicken breast over brown rice with roasted broccoli..."
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-xs text-tomato mt-1.5">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price (single) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min={1}
                className="mt-1.5"
                {...form.register("price")}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-end">
              <div>
                <Label htmlFor="bc">Bundle count</Label>
                <Input
                  id="bc"
                  type="number"
                  min={2}
                  placeholder="5"
                  className="mt-1.5"
                  {...form.register("bundleCount")}
                />
              </div>
              <div>
                <Label htmlFor="bp">Bundle price ($)</Label>
                <Input
                  id="bp"
                  type="number"
                  step="0.01"
                  placeholder="52"
                  className="mt-1.5"
                  {...form.register("bundlePrice")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6">
          <Label>Photos</Label>
          <p className="text-xs text-muted mt-1">
            JPG or PNG. Daylight, on a clean surface, ideally overhead.
          </p>
          <div className="mt-3">
            <ImageDropzone
              label="Upload photos of this meal"
              subline="Drag & drop or click · JPG / PNG"
              height={220}
            />
          </div>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {TAGS.map((t) => (
              <Chip
                key={t}
                type="button"
                active={tags.includes(t)}
                onClick={() =>
                  setTags((s) =>
                    s.includes(t) ? s.filter((i) => i !== t) : [...s, t],
                  )
                }
              >
                {t}
              </Chip>
            ))}
          </div>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6">
          <Label>Allergens</Label>
          <p className="text-xs text-muted mt-1">
            Be honest. Customers depend on this for safety.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {ALLERGENS.map((a) => (
              <Chip
                key={a}
                type="button"
                active={allergens.includes(a)}
                onClick={() =>
                  setAllergens((s) =>
                    s.includes(a) ? s.filter((i) => i !== a) : [...s, a],
                  )
                }
              >
                {a}
              </Chip>
            ))}
          </div>
        </section>

        <section className="bg-white border border-border rounded-2xl p-6">
          <Label>Nutrition (optional)</Label>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {[
              ["cal", "Calories", "520"],
              ["p", "Protein g", "48"],
              ["c", "Carbs g", "38"],
              ["f", "Fat g", "16"],
            ].map(([id, label, ph]) => (
              <div key={id}>
                <Label htmlFor={id} className="text-xs">{label}</Label>
                <Input
                  id={id}
                  type="number"
                  placeholder={ph}
                  className="mt-1.5"
                  {...form.register(
                    id === "cal"
                      ? "calories"
                      : id === "p"
                      ? "protein"
                      : id === "c"
                      ? "carbs"
                      : "fat",
                  )}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" size="lg" className="flex-1">
            Publish meal
          </Button>
        </div>
      </form>
    </div>
  );
}
