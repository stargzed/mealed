"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Camera, ShieldCheck, ChefHat, FileText, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { cn } from "@/lib/utils";

const STEPS = [
 { Icon: ChefHat, label: "Basics" },
 { Icon: MapPin, label: "Location" },
 { Icon: Camera, label: "Kitchen scan" },
 { Icon: FileText, label: "Credentials" },
 { Icon: ShieldCheck, label: "Review" },
];

export default function ChefOnboardingPage() {
 const router = useRouter();
 const [step, setStep] = useState(0);

 return (
  <div className="max-w-3xl mx-auto">
   <h1 className="m-display text-3xl md:text-4xl">Chef application</h1>
   <p className="text-sub mt-2">
    Most chefs are approved within 48 hours. Let's start.
   </p>

   {/* Progress */}
   <ol className="grid grid-cols-5 gap-2 mt-7">
    {STEPS.map((s, i) => {
     const done = i < step;
     const current = i === step;
     return (
      <li key={s.label} className="flex flex-col items-center gap-2">
       <span
        className={cn(
         "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
         done
          ? "bg-accent text-white"
          : current
          ? "bg-ink text-white"
          : "bg-soft text-muted",
        )}
       >
        {done ? <Check size={14} strokeWidth={3} /> : <s.Icon size={14} />}
       </span>
       <span className="text-[10px] uppercase tracking-wider text-muted font-bold">
        {s.label}
       </span>
      </li>
     );
    })}
   </ol>

   <section className="bg-white border border-border rounded-2xl p-6 md:p-8 mt-8">
    {step === 0 && (
     <>
      <h2 className="m-display text-xl">Tell us about you</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
       <div>
        <Label htmlFor="display">Display name</Label>
        <Input id="display" placeholder="Chef Maya" className="mt-1.5" />
       </div>
       <div>
        <Label htmlFor="specialty">Specialty</Label>
        <Input
         id="specialty"
         placeholder="High-protein weekly prep"
         className="mt-1.5"
        />
       </div>
       <div className="md:col-span-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
         id="bio"
         className="mt-1.5"
         placeholder="Tell eaters about your cooking. Where you trained, what you love to make."
        />
       </div>
      </div>
     </>
    )}

    {step === 1 && (
     <>
      <h2 className="m-display text-xl">Where do you cook?</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
       <div>
        <Label htmlFor="address">Kitchen address</Label>
        <Input
         id="address"
         placeholder="1417 Echo Park Ave, Los Angeles"
         className="mt-1.5"
        />
       </div>
       <div>
        <Label htmlFor="radius">Service radius (mi)</Label>
        <Input
         id="radius"
         type="number"
         defaultValue={5}
         className="mt-1.5"
        />
       </div>
       <div className="md:col-span-2">
        <Label>Fulfillment options</Label>
        <div className="flex gap-2 mt-2">
         <label className="flex items-center gap-2 px-3 h-10 rounded-full border border-border cursor-pointer hover:bg-soft text-sm font-semibold">
          <input type="checkbox" defaultChecked />
          Pickup
         </label>
         <label className="flex items-center gap-2 px-3 h-10 rounded-full border border-border cursor-pointer hover:bg-soft text-sm font-semibold">
          <input type="checkbox" defaultChecked />
          Delivery
         </label>
         <label className="flex items-center gap-2 px-3 h-10 rounded-full border border-border cursor-pointer hover:bg-soft text-sm font-semibold">
          <input type="checkbox" />
          Custom requests
         </label>
        </div>
       </div>
      </div>
     </>
    )}

    {step === 2 && (
     <>
      <h2 className="m-display text-xl">360° kitchen scan</h2>
      <p className="text-sub text-sm mt-2">
       Walk us through your prep kitchen on video. Sink must be visible.
      </p>
      <div className="mt-4">
       <ImageDropzone
        label="Upload kitchen photos"
        subline="JPG / PNG · drag & drop or click to browse"
       />
      </div>
      <label className="mt-5 flex items-start gap-3 bg-soft p-4 rounded-xl cursor-pointer">
       <input type="checkbox" className="mt-1 accent-ink" />
       <div className="text-sm">
        <strong>I confirm the handwashing sink is visible</strong> in the
        prep area of my kitchen.
       </div>
      </label>
     </>
    )}

    {step === 3 && (
     <>
      <h2 className="m-display text-xl">Credentials (optional but helpful)</h2>
      <p className="text-sub text-sm mt-2">
       Food handler permit, CFPM cert, business license anything you have.
      </p>
      <div className="mt-4">
       <ImageDropzone
        label="Upload credential"
        subline="JPG, PNG, or PDF screenshot"
        height={200}
       />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
       <div>
        <Label htmlFor="cred-name">Credential name</Label>
        <Input
         id="cred-name"
         placeholder="ServSafe Food Handler"
         className="mt-1.5"
        />
       </div>
       <div>
        <Label htmlFor="cred-exp">Expiration date</Label>
        <Input id="cred-exp" type="date" className="mt-1.5" />
       </div>
      </div>
     </>
    )}

    {step === 4 && (
     <>
      <h2 className="m-display text-xl">Submit for review</h2>
      <p className="text-sub text-sm mt-2 max-w-md">
       Our trust & safety team reviews every application. You'll hear back
       within 48 hours.
      </p>
      <ul className="mt-6 space-y-3 text-sm">
       {[
        "Profile basics complete",
        "Location + service area",
        "Kitchen scan uploaded",
        "Sink visible confirmed",
       ].map((label) => (
        <li key={label} className="flex items-center gap-2">
         <Check size={16} className="text-accent" />
         {label}
        </li>
       ))}
      </ul>
     </>
    )}

    <div className="flex items-center justify-between mt-8">
     <Button
      variant="ghost"
      disabled={step === 0}
      onClick={() => setStep((s) => Math.max(0, s - 1))}
     >
      Back
     </Button>
     <Button
      onClick={() => {
       if (step < STEPS.length - 1) {
        setStep(step + 1);
       } else {
        toast.success("Application submitted! We'll review within 48 hours.");
        router.push("/chef/verification");
       }
      }}
     >
      {step === STEPS.length - 1 ? "Submit application" : "Continue"}
     </Button>
    </div>
   </section>
  </div>
 );
}

