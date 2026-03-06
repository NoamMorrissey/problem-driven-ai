import type { ReactNode } from "react";
import "@/styles/globals.css";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/workshops", label: "Workshops" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/crm", label: "CRM" },
  { href: "/admin/illustrations", label: "Illustrations" },
  { href: "/admin/analytics", label: "Analytics" },
];

export const metadata = {
  title: "Admin Panel",
  description: "Administrator dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
              <p className="text-sm text-gray-500 mt-1">Management Panel</p>
            </div>

            <nav className="px-3 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
              <Link
                href="/admin/auth/logout"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign out
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
