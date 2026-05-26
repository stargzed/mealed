import { ChefSidebar } from "@/components/layout/chef-sidebar";
import { PanelHeader } from "@/components/layout/panel-header";
import { RequireRole } from "@/lib/auth/guards";

export default function ChefLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="chef">
      <div className="min-h-screen flex bg-surface">
        <ChefSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <PanelHeader subtitle="Chef panel" />
          <main className="flex-1 px-4 md:px-8 py-6 md:py-8">{children}</main>
        </div>
      </div>
    </RequireRole>
  );
}
