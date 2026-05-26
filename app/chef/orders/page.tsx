"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Truck, Store } from "lucide-react";
import { SEED_ORDERS, chefMap, mealMap } from "@/lib/seed";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/states/empty-state";
import { formatPrice, formatRelative, generatePickupCode } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const CHEF_ID = "maya";

export default function ChefOrdersPage() {
  const initial = useMemo(
    () =>
      SEED_ORDERS.filter((o) => o.chefId === CHEF_ID).map((o) => ({
        ...o,
        chef: chefMap[o.chefId],
        items: o.items.map((i) => ({ ...i, meal: mealMap[i.mealId] })),
      })),
    [],
  );
  const [orders, setOrders] = useState<Order[]>(initial);

  const advance = (id: string, next: OrderStatus, label: string) => {
    setOrders((cur) => cur.map((o) => (o.id === id ? { ...o, status: next } : o)));
    toast.success(`Order ${generatePickupCode(id)} → ${label}`);
  };

  const totalPending = orders.reduce((s, o) => s + o.fees.chefPayout, 0);

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Once a customer places an order, it'll show up here."
      />
    );
  }

  return (
    <div className="max-w-6xl">
      <header className="mb-6">
        <h1 className="m-display text-3xl">Orders</h1>
        <p className="text-sub text-sm mt-1">
          {orders.length} active · advance each through prep
        </p>
      </header>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10 shadow-soft">
              <TableRow className="hover:bg-transparent">
                <TableHead>Order</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Payout</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>
                    <div className="m-mono text-xs">{generatePickupCode(o.id)}</div>
                    <div className="text-xs text-muted">
                      {formatRelative(o.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      {o.fulfillmentType === "delivery" ? (
                        <Truck size={13} />
                      ) : (
                        <Store size={13} />
                      )}
                      {o.fulfillmentType[0].toUpperCase() + o.fulfillmentType.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold">
                      {o.items.reduce((s, it) => s + it.quantity, 0)} ×{" "}
                      {o.items[0]?.meal?.name ?? "Meal"}
                    </div>
                    {o.items.length > 1 && (
                      <div className="text-xs text-muted">+{o.items.length - 1} more</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="text-right font-bold tabular-nums">
                    {formatPrice(o.fees.chefPayout)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="secondary">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Order details</DialogTitle>
                            <DialogDescription>
                              <span className="m-mono text-xs">
                                {generatePickupCode(o.id)}
                              </span>{" "}
                              · {formatRelative(o.createdAt)}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-3 text-sm">
                            <div className="bg-soft rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
                              <div>
                                <div className="text-[10px] uppercase font-bold tracking-wider text-muted">
                                  Subtotal
                                </div>
                                <div className="font-bold mt-0.5">
                                  {formatPrice(o.fees.subtotal)}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] uppercase font-bold tracking-wider text-muted">
                                  Commission
                                </div>
                                <div className="font-bold mt-0.5 text-tomato">
                                  -{formatPrice(o.fees.chefCommission)}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] uppercase font-bold tracking-wider text-muted">
                                  Payout
                                </div>
                                <div className="font-bold mt-0.5 text-accent-deep">
                                  {formatPrice(o.fees.chefPayout)}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="text-[10px] uppercase font-bold tracking-wider text-muted mb-1.5">
                                Items
                              </div>
                              <ul className="space-y-1.5">
                                {o.items.map((it) => (
                                  <li key={it.id} className="flex justify-between">
                                    <span>
                                      {it.quantity} × {it.meal?.name ?? "Meal"}
                                    </span>
                                    <span className="tabular-nums">
                                      {formatPrice(it.total)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <div className="text-[10px] uppercase font-bold tracking-wider text-muted mb-1.5">
                                {o.fulfillmentType === "delivery" ? "Delivery" : "Pickup"}
                              </div>
                              <div className="font-semibold">
                                {o.pickupTime
                                  ? new Date(o.pickupTime).toLocaleString([], {
                                      weekday: "short",
                                      hour: "numeric",
                                      minute: "2-digit",
                                    })
                                  : "—"}
                              </div>
                              {o.deliveryAddress && (
                                <div className="text-xs text-muted mt-0.5">
                                  {o.deliveryAddress}
                                </div>
                              )}
                            </div>

                            {o.notes && (
                              <div>
                                <div className="text-[10px] uppercase font-bold tracking-wider text-muted mb-1.5">
                                  Customer notes
                                </div>
                                <div className="text-sub italic">"{o.notes}"</div>
                              </div>
                            )}

                            <div className="flex items-center gap-2 pt-2">
                              <Badge
                                variant={o.allergyConfirmed ? "verified" : "outline"}
                              >
                                {o.allergyConfirmed
                                  ? "Allergy confirmed"
                                  : "Allergy unconfirmed"}
                              </Badge>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {o.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => advance(o.id, "cancelled", "Cancelled")}
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => advance(o.id, "accepted", "Accepted")}
                          >
                            Accept
                          </Button>
                        </>
                      )}
                      {o.status === "accepted" && (
                        <Button
                          size="sm"
                          onClick={() => advance(o.id, "preparing", "Preparing")}
                        >
                          Start prep
                        </Button>
                      )}
                      {o.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            advance(
                              o.id,
                              o.fulfillmentType === "delivery"
                                ? "out_for_delivery"
                                : "ready_for_pickup",
                              o.fulfillmentType === "delivery"
                                ? "Out for delivery"
                                : "Ready",
                            )
                          }
                        >
                          Mark ready
                        </Button>
                      )}
                      {(o.status === "ready_for_pickup" ||
                        o.status === "out_for_delivery") && (
                        <Button
                          size="sm"
                          onClick={() => advance(o.id, "completed", "Completed")}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="sticky bottom-0 bg-white z-10">
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="font-bold">
                  Total payout pending
                </TableCell>
                <TableCell className="text-right font-bold tabular-nums">
                  {formatPrice(totalPending)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
