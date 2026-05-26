"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { OrderConfirmationCard } from "@/components/orders/order-confirmation-card";
import { EmptyState } from "@/components/states/empty-state";
import { usePlacedOrders } from "@/lib/orders/store";

export default function OrderConfirmationPage() {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const order = usePlacedOrders((s) => s.byId(params.orderId ?? ""));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!order) {
    return (
      <div className="m-6">
        <EmptyState
          title="Order not found"
          description="That order may have expired or been placed in another browser."
          action={
            <button
              onClick={() => router.push("/home")}
              className="bg-ink text-white h-10 px-4 rounded-full font-bold text-sm"
            >
              Back home
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <OrderConfirmationCard order={order} />
    </div>
  );
}
