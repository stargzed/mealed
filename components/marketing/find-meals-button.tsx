"use client";

import { Button } from "@/components/ui/button";
import { useAppDownload } from "@/lib/app-download-store";

/**
 * "Find meals near me" CTA used in the savings section. Triggers the app
 * download modal actual meal browsing lives in the mobile app.
 */
export function FindMealsButton({
 label = "Find meals near me",
}: {
 label?: string;
}) {
 const show = useAppDownload((s) => s.show);
 return (
  <Button
   size="lg"
   className="mt-7"
   onClick={() => show("Find verified chefs near you in the Mealed app.")}
  >
   {label}
  </Button>
 );
}
