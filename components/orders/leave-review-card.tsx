"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import type { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmojiRating } from "@/components/ui/emoji-rating";
import { Chip } from "@/components/ui/chip";

const TAGS = ["On time", "Tasted great", "Macros on point", "Great packaging", "Communicative chef", "Would reorder"];

interface Props {
  order: Order;
}

export function LeaveReviewCard({ order }: Props) {
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="bg-accent-soft border border-accent/20 rounded-2xl p-5 flex items-start gap-3">
        <Star
          size={20}
          className="text-accent-deep shrink-0 mt-0.5"
          fill="currentColor"
          strokeWidth={1}
        />
        <div>
          <div className="font-bold text-accent-deep">Thanks for the review!</div>
          <p className="text-sm text-sub mt-0.5">
            We pass per-dish feedback straight to {order.chef?.displayName}.
          </p>
        </div>
      </div>
    );
  }

  const submit = () => {
    if (rating === 0) {
      toast.error("Pick an emoji to rate this order");
      return;
    }
    toast.success("Review submitted — thanks!");
    setDone(true);
  };

  const toggleTag = (t: string) =>
    setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  return (
    <div className="bg-white border border-border rounded-2xl p-6">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">
        How was your meal?
      </div>
      <h3 className="m-display text-xl mb-5">
        Rate your order from {order.chef?.displayName}
      </h3>

      <EmojiRating value={rating} onChange={setRating} />

      {rating > 0 && (
        <div className="mt-6 space-y-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
              Quick tags
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <Chip
                  key={t}
                  type="button"
                  active={tags.includes(t)}
                  onClick={() => toggleTag(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
              Anything else (optional)
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What stood out? What would you change?"
            />
          </div>

          <Button block onClick={submit}>
            Send review
          </Button>
        </div>
      )}
    </div>
  );
}
