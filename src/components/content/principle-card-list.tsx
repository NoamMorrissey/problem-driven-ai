import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

export interface Principle {
  title: string;
  slug: string;
  description?: string;
}

interface PrincipleCardListProps {
  principles: Principle[];
}

export function PrincipleCardList({ principles }: PrincipleCardListProps) {
  return (
    <div className="space-y-3">
      {principles.map((principle, index) => (
        <Link
          key={principle.slug}
          href={`/methodology/principles/${principle.slug}`}
          className="group block"
        >
          <div
            className={cn(
              "p-4 rounded-lg border border-gray-200 bg-white",
              "transition-all duration-200 ease-out",
              "hover:border-indigo-400 hover:shadow-md hover:bg-indigo-50"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 font-bold text-gray-400 text-lg w-8 text-center pt-0.5">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {principle.title}
                </h3>
                {principle.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {principle.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
