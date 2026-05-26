import { AppHeader } from "@/components/layout/app-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MobileCartBar } from "@/components/layout/mobile-cart-bar";

export default function ConsumerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppHeader />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileCartBar />
      <MobileBottomNav />
    </div>
  );
}
