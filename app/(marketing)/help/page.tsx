import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import { FaqDialog } from "@/components/help/faq-dialog";
import { FeedbackDrawer } from "@/components/help/feedback-drawer";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Help center" };

const TOPICS = [
  {
    title: "Ordering",
    items: [
      "How do I place a weekly order?",
      "Can I change my order after I place it?",
      "What if I miss my pickup window?",
      "How do delivery fees work?",
    ],
  },
  {
    title: "Custom requests",
    items: [
      "How do I submit a custom meal plan?",
      "What's the fee on custom requests?",
      "What if my chef doesn't reply?",
    ],
  },
  {
    title: "Refunds & protection",
    items: [
      "How do I report an issue with a meal?",
      "What does the protection fee cover?",
      "When will my refund hit my card?",
    ],
  },
  {
    title: "For chefs",
    items: [
      "How do I get verified?",
      "When do I get paid?",
      "How do I set my delivery radius?",
      "What does the kitchen scan involve?",
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-12 py-16 md:py-24">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
        Help center
      </div>
      <h1 className="m-display text-4xl md:text-6xl">We're here.</h1>
      <p className="text-lg text-sub mt-5 max-w-2xl">
        Browse the topics below, or message us at
        <a href="mailto:help@mealed.app" className="underline underline-offset-4 mx-1">help@mealed.app</a>.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <FaqDialog
          trigger={
            <Button size="lg">
              <BookOpen size={15} /> Open the FAQ
            </Button>
          }
        />
        <FeedbackDrawer
          trigger={
            <Button variant="secondary" size="lg">
              <MessageCircle size={15} /> Send us feedback
            </Button>
          }
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-14">
        {TOPICS.map((topic) => (
          <div key={topic.title} className="bg-white border border-border rounded-2xl p-6">
            <div className="font-bold text-lg mb-3">{topic.title}</div>
            <ul className="space-y-2">
              {topic.items.map((item) => (
                <li key={item}>
                  <FaqDialog
                    trigger={
                      <button className="w-full text-sm text-sub hover:text-ink flex items-center justify-between gap-3 py-1 text-left">
                        <span>{item}</span>
                        <ArrowRight size={13} className="text-muted" />
                      </button>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
