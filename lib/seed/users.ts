import type { User } from "../types";

const ISO = "2026-01-01T00:00:00.000Z";

export const SEED_USERS: User[] = [
  {
    id: "u-sarah",
    name: "Sarah Mitchell",
    email: "sarah@demo.mealed.app",
    role: "consumer",
    image: "",
    createdAt: ISO,
    updatedAt: ISO,
  },
  {
    id: "u-maya",
    name: "Maya Okonkwo",
    email: "maya@demo.mealed.app",
    role: "chef",
    image: "",
    createdAt: ISO,
    updatedAt: ISO,
  },
  {
    id: "u-admin",
    name: "Mealed Admin",
    email: "admin@demo.mealed.app",
    role: "admin",
    image: "",
    createdAt: ISO,
    updatedAt: ISO,
  },
];

export const DEMO_USER_BY_ROLE = {
  consumer: SEED_USERS[0],
  chef: SEED_USERS[1],
  admin: SEED_USERS[2],
} as const;
