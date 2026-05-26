import type { Order } from "../types";
import { computeOrderFees } from "../fees";

const fees1 = computeOrderFees(52, 4.99);
const fees2 = computeOrderFees(38);

export const SEED_ORDERS: Order[] = [
  {
    id: "o-1029",
    consumerId: "u-sarah",
    chefId: "maya",
    status: "preparing",
    fulfillmentType: "delivery",
    pickupTime: "2026-05-26T17:30:00.000Z",
    deliveryAddress: "1417 Echo Park Ave, Los Angeles, CA 90026",
    items: [
      {
        id: "oi-1",
        orderId: "o-1029",
        mealId: "chicken-bowl",
        quantity: 5,
        unitPrice: 10.4,
        total: 52,
      },
    ],
    fees: fees1,
    allergyConfirmed: true,
    createdAt: "2026-05-22T18:14:00.000Z",
    updatedAt: "2026-05-22T18:14:00.000Z",
  },
  {
    id: "o-0987",
    consumerId: "u-sarah",
    chefId: "andre",
    status: "completed",
    fulfillmentType: "pickup",
    pickupTime: "2026-05-18T17:00:00.000Z",
    items: [
      {
        id: "oi-2",
        orderId: "o-0987",
        mealId: "family-taco",
        quantity: 1,
        unitPrice: 38,
        total: 38,
      },
    ],
    fees: fees2,
    allergyConfirmed: true,
    completedAt: "2026-05-18T17:24:00.000Z",
    payoutEligibleAt: "2026-05-19T17:24:00.000Z",
    createdAt: "2026-05-15T12:14:00.000Z",
    updatedAt: "2026-05-18T17:24:00.000Z",
  },
];
