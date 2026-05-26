import type { OrderStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  preparing: "Preparing",
  ready_for_pickup: "Ready for pickup",
  out_for_delivery: "Out for delivery",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const VARIANT: Record<OrderStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  pending: "warn",
  accepted: "default",
  preparing: "accent",
  ready_for_pickup: "verified",
  out_for_delivery: "accent",
  completed: "verified",
  cancelled: "tomato",
  refunded: "tomato",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge variant={VARIANT[status]}>{LABEL[status]}</Badge>;
}
