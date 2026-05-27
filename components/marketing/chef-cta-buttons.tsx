"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppDownload } from "@/lib/app-download-store";

/**
 * Hero CTAs on /become-a-chef. The "Start chef application" button used to
 * deep-link into the web sign-up flow now the entire chef onboarding lives
 * in the mobile app, so the CTA opens the download dialog instead.
 */
interface Props {
 /** Center the CTA pair inside its container (used in the bottom-section repeat). */
 centered?: boolean;
}

export function ChefCtaButtons({ centered = false }: Props) {
 const show = useAppDownload((s) => s.show);
 return (
  <div
   className={
    "flex flex-wrap gap-3 mt-7" + (centered ? " justify-center" : "")
   }
  >
   <Button
    size="lg"
    onClick={() =>
     show("Apply, verify your kitchen, and post your first menu from the Mealed app.")
    }
   >
    Start chef application <ArrowRight size={16} />
   </Button>
   <Link
    href="/safety"
    className={buttonVariants({ variant: "secondary", size: "lg" })}
   >
    See our standards
   </Link>
  </div>
 );
}
