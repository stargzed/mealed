"use client";

import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const FAQ = [
 {
  title: "Ordering & cancellation",
  body: "Place an order from any chef's profile. You can cancel for a full refund up until the chef marks it as preparing. After that, only the protection fee covers issues.",
 },
 {
  title: "Custom meal-prep requests",
  body: "If a chef offers custom requests, hit Custom request on their profile. Tell them goals, budget, allergies. They reply with a quote within 24 hours.",
 },
 {
  title: "Pickup vs delivery",
  body: "Each chef chooses what they offer. Pickup slots run 5–8pm most days; delivery is set per chef with their own radius and fee.",
 },
 {
  title: "How are chefs verified?",
  body: "Every Mealed chef passes ID verification, a 360° kitchen scan, and a sink-visible confirmation before they can list a single meal. CFPM-certified chefs get a badge.",
 },
 {
  title: "What's the Mealed protection fee?",
  body: "$2.99 minimum or 5% of subtotal. Covers refunds for quality, safety, or allergen issues reported within 24 hours of pickup/delivery.",
 },
 {
  title: "Payouts (chefs)",
  body: "Stripe Connect pays you 24 hours after each completed order. 7% platform commission. No subscription, no monthly fee.",
 },
 {
  title: "Allergies & dietary needs",
  body: "Set your allergies on your profile and we'll warn you when a meal contains them. Chefs are required to list allergens accurately if they don't, the protection fee covers a refund.",
 },
 {
  title: "Subscriptions & recurring orders",
  body: "Coming soon. For now, reorder weekly from any chef's profile in a tap. Order Again on your Orders page surfaces your usual chefs.",
 },
 {
  title: "How do I rate a meal?",
  body: "From your Orders page, tap a completed order and hit Leave a review. Reviews are per-dish, not just per-chef the best signal we have for new eaters.",
 },
 {
  title: "Account & data",
  body: "Edit your profile, payment methods, addresses, and notification preferences from Profile. Account deletion is in Settings → Account.",
 },
];

interface Props {
 trigger?: React.ReactNode;
}

export function FaqDialog({ trigger }: Props) {
 return (
  <Dialog>
   <DialogTrigger asChild>
    {trigger ?? <Button variant="secondary">Open the FAQ</Button>}
   </DialogTrigger>
   <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg">
    <ScrollArea className="flex max-h-full flex-col">
     <DialogHeader className="contents space-y-0 text-left">
      <DialogTitle className="px-6 pt-6 m-display text-2xl">
       Frequently asked questions
      </DialogTitle>
      <DialogDescription asChild>
       <div className="p-6 pt-3">
        <div className="space-y-5 text-sm leading-relaxed">
         {FAQ.map((item) => (
          <div key={item.title} className="space-y-1.5">
           <p className="font-bold text-ink">{item.title}</p>
           <p className="text-sub">{item.body}</p>
          </div>
         ))}
        </div>
       </div>
      </DialogDescription>
     </DialogHeader>
     <DialogFooter className="px-6 pb-6 sm:justify-start gap-2">
      <DialogClose asChild>
       <Button type="button" variant="ghost">
        Close
       </Button>
      </DialogClose>
      <DialogClose asChild>
       <Button type="button">Got it</Button>
      </DialogClose>
     </DialogFooter>
    </ScrollArea>
   </DialogContent>
  </Dialog>
 );
}
