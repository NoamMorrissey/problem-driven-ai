import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
}

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-lg border border-gray-200 bg-white",
        "hover:border-gray-300 hover:shadow-md transition-all duration-200"
      )}
    >
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </p>
      <div className="mt-2">
        <p className="text-3xl md:text-4xl font-bold text-gray-900">
          {value}
        </p>
      </div>
      {description && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

interface StatCardGridProps {
  children: ReactNode;
}

export function StatCardGrid({ children }: StatCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
