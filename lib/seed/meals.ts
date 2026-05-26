import type { Meal } from "../types";

const ISO = "2026-01-01T00:00:00.000Z";

const m = (
  id: string,
  chefId: string,
  name: string,
  palette: string,
  price: number,
  extra: Partial<Meal> = {},
): Meal => ({
  id,
  chefId,
  name,
  palette,
  price,
  rating: extra.rating ?? 4.8,
  reviewCount: extra.reviewCount ?? 32,
  tags: extra.tags ?? [],
  allergens: extra.allergens ?? [],
  pickupAvailable: extra.pickupAvailable ?? true,
  deliveryAvailable: extra.deliveryAvailable ?? true,
  active: extra.active ?? true,
  createdAt: ISO,
  updatedAt: ISO,
  ...extra,
});

export const SEED_MEALS: Meal[] = [
  m("chicken-bowl", "maya", "Grilled Chicken Power Bowl", "chicken", 11.5, {
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=720&q=80",
    rating: 4.9,
    reviewCount: 184,
    tags: ["High-Protein", "Healthy", "Low Carb"],
    macros: { cal: 520, p: 48, c: 38, f: 16 },
    bundle: { count: 5, price: 52 },
    allergens: ["Soy"],
    description:
      "Marinated chicken breast over brown rice with roasted broccoli, pickled onions, and a tahini-yogurt drizzle.",
  }),
  m("turkey-meatball", "maya", "Turkey Meatball Prep", "beef", 10.75, {
    imageUrl:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=720&q=80",
    rating: 4.85,
    reviewCount: 91,
    tags: ["High-Protein", "Family Size"],
    macros: { cal: 480, p: 42, c: 30, f: 18 },
    allergens: ["Wheat", "Egg"],
    description:
      "Lean turkey meatballs in a slow-simmered tomato basil sauce with whole-grain orzo.",
  }),
  m("salmon-rice", "maya", "Lemon Herb Salmon Plate", "salmon", 14.25, {
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=720&q=80",
    rating: 4.93,
    reviewCount: 156,
    tags: ["High-Protein", "Healthy", "Gluten-Free"],
    macros: { cal: 560, p: 38, c: 42, f: 22 },
    allergens: ["Fish"],
    description:
      "Atlantic salmon, jasmine rice, blistered green beans, lemon-dill yogurt.",
  }),
  m("breakfast-box", "maya", "High-Protein Breakfast Box", "breakfast", 9.5, {
    imageUrl:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=720&q=80",
    rating: 4.78,
    reviewCount: 64,
    tags: ["High-Protein", "Breakfast"],
    macros: { cal: 410, p: 32, c: 36, f: 14 },
    allergens: ["Egg", "Dairy"],
    description:
      "Egg-white frittata cup, turkey sausage, sweet potato hash, mixed berries.",
  }),
  m("vegan-curry", "lina", "Vegan Chickpea Curry Bowl", "veggie", 10.25, {
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=720&q=80",
    rating: 4.95,
    reviewCount: 122,
    tags: ["Vegan", "Gluten-Free", "Healthy"],
    macros: { cal: 470, p: 18, c: 62, f: 14 },
    description:
      "Coconut-tomato chickpea curry over basmati rice with roasted cauliflower and toasted cashews.",
  }),
  m("med-bowl", "lina", "Mediterranean Quinoa Bowl", "quinoa", 10.75, {
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=720&q=80",
    rating: 4.88,
    reviewCount: 89,
    tags: ["Vegetarian", "Gluten-Free"],
    macros: { cal: 440, p: 16, c: 55, f: 18 },
    allergens: ["Dairy"],
  }),
  m("tofu-stirfry", "lina", "Tofu Veggie Stir Fry", "tofu", 9.75, {
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=720&q=80",
    rating: 4.81,
    reviewCount: 54,
    tags: ["Vegan", "High-Protein"],
    allergens: ["Soy", "Sesame"],
  }),
  m("vegan-burrito", "lina", "Vegan Burrito Bowl", "burrito", 9.5, {
    imageUrl:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=720&q=80",
    rating: 4.86,
    reviewCount: 71,
    tags: ["Vegan", "Family Size"],
  }),
  m("family-taco", "andre", "Family Taco Dinner Kit", "family", 38.0, {
    imageUrl:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=720&q=80",
    rating: 4.92,
    reviewCount: 128,
    tags: ["Family Meals", "Comfort Food"],
    bundle: { count: 1, price: 38, label: "Feeds 4" },
    allergens: ["Dairy"],
    description:
      "Carne asada, charred chicken tinga, two salsas, fresh tortillas, all the fixings. Heat-and-serve.",
  }),
  m("steak-plate", "andre", "Low-Carb Steak Plate", "beef", 15.5, {
    imageUrl:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=720&q=80",
    rating: 4.84,
    reviewCount: 67,
    tags: ["Low Carb", "High-Protein"],
    allergens: ["Dairy"],
  }),
  m("chili-pack", "andre", "Turkey Chili Pack", "chili", 11.0, {
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=720&q=80",
    rating: 4.79,
    reviewCount: 45,
    tags: ["High-Protein", "Comfort Food"],
    bundle: { count: 4, price: 39, label: "4 servings" },
  }),
  m("cold-sesame", "kim", "Cold Sesame Noodle Bowl", "cold", 11.25, {
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=720&q=80",
    rating: 4.82,
    reviewCount: 48,
    tags: ["Cold Meals", "Vegetarian"],
    allergens: ["Wheat", "Sesame", "Peanut"],
  }),
  m("shrimp-quinoa", "kim", "Shrimp Quinoa Bowl", "shrimp", 13.0, {
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=720&q=80",
    rating: 4.86,
    reviewCount: 41,
    tags: ["High-Protein", "Healthy"],
    allergens: ["Shellfish"],
  }),
  m("budget-chicken", "jordan", "Budget Chicken & Rice Box", "chicken", 7.5, {
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=720&q=80",
    rating: null,
    reviewCount: 0,
    tags: ["Budget Friendly", "High-Protein"],
    bundle: { count: 10, price: 65 },
  }),
  m("rosa-arroz", "rosa", "Adobo Chicken & Yellow Rice", "chicken", 12.0, {
    imageUrl:
      "https://images.unsplash.com/photo-1604908554049-2c0ff39d3d0a?auto=format&fit=crop&w=720&q=80",
    rating: 4.83,
    reviewCount: 73,
    tags: ["Latin", "High-Protein"],
  }),
  m("rosa-pernil", "rosa", "Slow-Roasted Pernil Plate", "beef", 13.5, {
    imageUrl:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=720&q=80",
    rating: 4.88,
    reviewCount: 52,
    tags: ["Latin", "Comfort Food"],
  }),
];
