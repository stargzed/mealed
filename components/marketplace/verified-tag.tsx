"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function VerifiedTag() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-deep bg-accent-soft px-2 py-[3px] rounded-[5px] cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        >
          <span className="m-vdot" />
          Verified
        </span>
      </TooltipTrigger>
      <TooltipContent>
        ID verified · kitchen reviewed · sink visible confirmed
      </TooltipContent>
    </Tooltip>
  );
}
