"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        toast.success(`Subscribed ${email} to the menu drop.`);
        setEmail("");
      }}
      className="flex gap-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email"
        className="flex-1 h-11 px-3.5 rounded-full bg-white/5 border border-white/10 placeholder:text-white/40 text-white outline-none focus:border-white/30 focus:bg-white/10 text-sm"
      />
      <button
        type="submit"
        className="h-11 px-5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-bold transition"
      >
        Subscribe
      </button>
    </form>
  );
}
