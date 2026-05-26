"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EmojiRating } from "@/components/ui/emoji-rating";

interface Props {
  trigger?: React.ReactNode;
}

export function FeedbackDrawer({ trigger }: Props) {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    setTimeout(() => {
      toast.success(
        `Thanks ${(data.get("name") as string) || "for the feedback"}! We'll be in touch.`,
      );
      setRating(0);
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 400);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger ?? <Button>Send us feedback</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center text-center pt-2 pb-8 px-4 max-w-md mx-auto w-full"
        >
          <DrawerHeader className="space-y-1 max-w-md">
            <DrawerTitle>We value your feedback.</DrawerTitle>
            <DrawerDescription>
              How was your last experience on Mealed?
            </DrawerDescription>
          </DrawerHeader>

          <div className="my-3">
            <EmojiRating value={rating} onChange={setRating} />
          </div>

          <div className="w-full text-left space-y-3 mt-2">
            <div>
              <Label htmlFor="fb-name">Name</Label>
              <Input
                id="fb-name"
                name="name"
                placeholder="Your name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="fb-email">Email</Label>
              <Input
                id="fb-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="fb-message">Message</Label>
              <Textarea
                id="fb-message"
                name="message"
                placeholder="Tell us what went well or what we should fix…"
                className="mt-1.5 min-h-[100px]"
              />
            </div>
          </div>

          <DrawerFooter className="flex flex-col sm:flex-row gap-2 w-full mt-5 px-0">
            <Button type="submit" block disabled={submitting}>
              {submitting ? "Sending…" : "Submit feedback"}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="secondary" block>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
