import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { RoleSwitcher } from "@/components/layout/role-switcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--m-font-ui",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--m-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mealed.org — Home-cooked meal prep from trusted local chefs",
    template: "%s | Mealed.org",
  },
  description:
    "Find verified local chefs for weekly meal prep, custom meals, pickup, and delivery.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Mealed.org — Home-cooked meal prep from trusted local chefs",
    description:
      "Find verified local chefs for weekly meal prep, custom meals, pickup, and delivery.",
    siteName: "Mealed.org",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jbMono.variable}`}>
      <body>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster position="bottom-center" richColors closeButton />
          <RoleSwitcher />
        </TooltipProvider>
      </body>
    </html>
  );
}
