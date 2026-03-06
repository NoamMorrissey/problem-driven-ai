"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils/cn";

const sections = [
  { href: "/vision", key: "vision" },
  { href: "/methodology", key: "methodology" },
  { href: "/planning", key: "planning" },
  { href: "/operational", key: "operational" },
  { href: "/resources", key: "resources" },
  { href: "/programs", key: "programs" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Problem-Driven AI
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {t(key)}
            </Link>
          ))}
        </div>

        <LocaleSwitcher />
      </div>
    </nav>
  );
}
