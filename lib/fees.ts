import type { FeeBreakdown } from "./types";

export const FEE_CONFIG = {
  chefCommissionRate: 0.12,
  consumerServiceFeeRate: 0.06,
  customRequestFeeRate: 0.15,
  minimumProtectionFee: 2.99,
  protectionFeeRate: 0.05,
} as const;

export function computeOrderFees(
  subtotal: number,
  deliveryFee = 0,
): FeeBreakdown {
  const serviceFee = round(subtotal * FEE_CONFIG.consumerServiceFeeRate);
  const protectionFee = round(
    Math.max(
      FEE_CONFIG.minimumProtectionFee,
      subtotal * FEE_CONFIG.protectionFeeRate,
    ),
  );
  const chefCommission = round(subtotal * FEE_CONFIG.chefCommissionRate);
  const chefPayout = round(subtotal - chefCommission);
  const total = round(subtotal + serviceFee + protectionFee + deliveryFee);
  return {
    subtotal: round(subtotal),
    serviceFee,
    protectionFee,
    deliveryFee: round(deliveryFee),
    chefCommission,
    chefPayout,
    total,
  };
}

export function computeCustomQuoteFees(
  subtotal: number,
  deliveryFee = 0,
): FeeBreakdown {
  const customRequestFee = round(subtotal * FEE_CONFIG.customRequestFeeRate);
  const protectionFee = round(
    Math.max(
      FEE_CONFIG.minimumProtectionFee,
      subtotal * FEE_CONFIG.protectionFeeRate,
    ),
  );
  const chefCommission = round(subtotal * FEE_CONFIG.chefCommissionRate);
  const chefPayout = round(subtotal - chefCommission);
  const total = round(subtotal + customRequestFee + protectionFee + deliveryFee);
  return {
    subtotal: round(subtotal),
    serviceFee: 0,
    customRequestFee,
    protectionFee,
    deliveryFee: round(deliveryFee),
    chefCommission,
    chefPayout,
    total,
  };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}
