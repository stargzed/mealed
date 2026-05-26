import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { PanelHeader } from "@/components/layout/panel-header";
import { RequireRole } from "@/lib/auth/guards";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="admin">
      <div className="min-h-screen flex bg-surface">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <PanelHeader subtitle="Admin" />
          <main className="flex-1 px-4 md:px-8 py-6 md:py-8">{children}</main>
        </div>
      </div>
    </RequireRole>
  );
}
