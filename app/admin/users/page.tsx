"use client";

import { SEED_USERS } from "@/lib/seed";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersPage() {
  return (
    <div className="max-w-6xl">
      <header className="mb-6">
        <h1 className="m-display text-3xl">Users</h1>
        <p className="text-sub text-sm mt-1">
          {SEED_USERS.length} users across all roles.
        </p>
      </header>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Name
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Email
              </th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Role
              </th>
              <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {SEED_USERS.map((u) => (
              <tr key={u.id} className="border-b border-divider last:border-0">
                <td className="px-4 py-3 font-bold">{u.name}</td>
                <td className="px-4 py-3 text-sub">{u.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={u.role === "admin" ? "dark" : u.role === "chef" ? "verified" : "outline"}>
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right text-muted">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
