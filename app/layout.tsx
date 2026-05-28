import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import { AppDownloadDialog } from "@/components/marketing/app-download-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

// Mealed 3.0 — Geist for body / UI / headings.
const geist = GeistSans;

// Fraunces kept ONLY for the wordmark, which uses italic + WONK axis for
// the editorial mark feel. Loaded as a variable font so the bundle stays small.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--m-font-wordmark",
  display: "swap",
  axes: ["SOFT", "opsz", "WONK"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  // Brand-only tab title across every page; template has no `%s` so child
  // pages cannot override it.
  title: {
    default: "Mealed",
    template: "Mealed",
  },
  // No description / openGraph / twitter — pasted links unfurl as just the URL.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // geist exposes its font as `--font-geist-sans`, fraunces as
      // `--m-font-wordmark`. globals.css points the legacy --m-font-* tokens
      // at Geist; the Wordmark component opts into Fraunces directly.
      className={`${geist.variable} ${fraunces.variable}`}
    >
      <body data-vibe="garden" data-radius="soft">
        <TooltipProvider delayDuration={200}>
          {children}
          <AppDownloadDialog />
          <Toaster position="bottom-center" richColors closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
