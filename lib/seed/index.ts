export { PALETTES } from "./palettes";
export { SEED_CHEFS } from "./chefs";
export { SEED_MEALS } from "./meals";
export { SEED_REVIEWS } from "./reviews";
export { SEED_USERS, DEMO_USER_BY_ROLE } from "./users";
export { SEED_MESSAGES, SEED_THREADS } from "./messages";
export { SEED_ORDERS } from "./orders";

import { SEED_CHEFS } from "./chefs";
import { SEED_MEALS } from "./meals";

export const chefMap = Object.fromEntries(SEED_CHEFS.map((c) => [c.id, c]));
export const mealMap = Object.fromEntries(SEED_MEALS.map((m) => [m.id, m]));
