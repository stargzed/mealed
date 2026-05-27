import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import { AppDownloadDialog } from "@/components/marketing/app-download-dialog";
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

// Editorial display serif used for hero headlines + wordmark. Fraunces is a
// variable font with optical-size + soft-terminal axes, giving it a warm,
// hand-crafted vibe that fits "home-cooked meal prep". Loaded only in italic-
// off, weights 500–900 to keep payload small.
const fraunces = Fraunces({
 subsets: ["latin"],
 variable: "--m-font-display",
 display: "swap",
 // WONK enables alternate "quirky" glyphs (a hooked g, asymmetric ampersand,
 // etc.) used by the wordmark for brand distinctiveness. opsz + SOFT shape
 // optical sizing + terminal softness for the editorial headlines.
 axes: ["SOFT", "opsz", "WONK"],
 style: ["normal", "italic"],
});

export const metadata: Metadata = {
 // Single, brand-only tab title across every page no taglines, no per-page
 // suffixes. The template has no `%s` placeholder so child-page titles are
 // overridden too.
 title: {
  default: "Mealed",
  template: "Mealed",
 },
 // Intentionally no `description`, `openGraph`, or `twitter` card metadata 
 // we want shared/pasted links (Discord, iMessage, Slack, etc.) to unfurl
 // as just the URL with no preview blurb underneath.
 metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
 ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html
   lang="en"
   className={`${jakarta.variable} ${jbMono.variable} ${fraunces.variable}`}
  >
   <body>
    <TooltipProvider delayDuration={200}>
     {children}
     <AppDownloadDialog />
     <Toaster position="bottom-center" richColors closeButton />
    </TooltipProvider>
   </body>
  </html>
 );
}
