"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chefMap } from "@/lib/seed";

const CHEF_ID = "maya";

export default function ChefSettingsPage() {
  const chef = chefMap[CHEF_ID];
  const [pickup, setPickup] = useState(chef.pickupEnabled);
  const [delivery, setDelivery] = useState(chef.deliveryEnabled);
  const [custom, setCustom] = useState(chef.customRequestsEnabled);

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="m-display text-3xl">Settings</h1>

      <section className="bg-white border border-border rounded-2xl p-6">
        <h2 className="font-bold mb-4">Profile</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="display">Display name</Label>
            <Input id="display" defaultValue={chef.displayName} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Input id="specialty" defaultValue={chef.specialty} className="mt-1.5" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" defaultValue={chef.bio} className="mt-1.5" />
          </div>
        </div>
      </section>

      <section className="bg-white border border-border rounded-2xl p-6">
        <h2 className="font-bold mb-4">Fulfillment</h2>
        <div className="space-y-3">
          <Toggle label="Pickup orders" enabled={pickup} onChange={setPickup} />
          <Toggle label="Delivery orders" enabled={delivery} onChange={setDelivery} />
          <Toggle label="Custom requests" enabled={custom} onChange={setCustom} />
        </div>
        {delivery && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <Label htmlFor="dr">Delivery radius (mi)</Label>
              <Input id="dr" type="number" defaultValue={chef.deliveryRadius ?? 5} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="df">Delivery fee ($)</Label>
              <Input
                id="df"
                type="number"
                step="0.01"
                defaultValue={chef.deliveryFee ?? 0}
                className="mt-1.5"
              />
            </div>
          </div>
        )}
      </section>

      <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
    </div>
  );
}

function Toggle({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition ${
          enabled ? "bg-accent" : "bg-soft border border-border"
        }`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
