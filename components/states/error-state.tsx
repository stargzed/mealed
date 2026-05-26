"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  description?: string;
  retry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Try again in a moment.",
  retry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 rounded-[var(--m-radius-lg)] bg-tomato-soft/40 border border-tomato/20">
      <div className="w-12 h-12 rounded-full bg-white border border-tomato/20 flex items-center justify-center mb-4 text-tomato">
        <AlertTriangle size={20} />
      </div>
      <h3 className="font-display font-extrabold text-xl tracking-tightest">{title}</h3>
      <p className="text-sm text-sub mt-2 max-w-md">{description}</p>
      {retry && (
        <Button onClick={retry} variant="secondary" size="sm" className="mt-5">
          Try again
        </Button>
      )}
    </div>
  );
}
