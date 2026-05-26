import type { Message, MessageThread } from "../types";

const ISO = "2026-05-22T19:14:00.000Z";

export const SEED_MESSAGES: Message[] = [
  {
    id: "m1",
    threadId: "t-maya-sarah",
    senderId: "u-maya",
    body: "Hi Sarah — happy to swap brown rice for cauliflower rice on Tuesday's bowl. No charge.",
    createdAt: "2026-05-22T18:30:00.000Z",
  },
  {
    id: "m2",
    threadId: "t-maya-sarah",
    senderId: "u-sarah",
    body: "Amazing, thank you! Same delivery slot works.",
    createdAt: ISO,
  },
  {
    id: "m3",
    threadId: "t-lina-sarah",
    senderId: "u-lina",
    body: "Menu's posted — let me know if anything looks off for your allergies this week.",
    createdAt: "2026-05-21T22:10:00.000Z",
  },
];

export const SEED_THREADS: MessageThread[] = [
  {
    id: "t-maya-sarah",
    consumerId: "u-sarah",
    chefId: "maya",
    orderId: "o-1029",
    unread: 0,
    consumer: { id: "u-sarah", name: "Sarah Mitchell" },
    chef: { id: "maya", name: "Chef Maya", initials: "M" },
    lastMessage: SEED_MESSAGES[1],
    createdAt: "2026-05-22T18:30:00.000Z",
    updatedAt: ISO,
  },
  {
    id: "t-lina-sarah",
    consumerId: "u-sarah",
    chefId: "lina",
    unread: 1,
    consumer: { id: "u-sarah", name: "Sarah Mitchell" },
    chef: { id: "lina", name: "Chef Lina", initials: "L" },
    lastMessage: SEED_MESSAGES[2],
    createdAt: "2026-05-21T22:10:00.000Z",
    updatedAt: "2026-05-21T22:10:00.000Z",
  },
];
