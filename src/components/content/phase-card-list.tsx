"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface Phase {
  number: string;
  name: string;
  description: string;
}

const PHASES: Record<"methodology" | "planning", Phase[]> = {
  methodology: [
    {
      number: "01",
      name: "Problem",
      description: "Identify and define the core problem to solve",
    },
    {
      number: "02",
      name: "Solution",
      description: "Develop potential solutions and approaches",
    },
    {
      number: "03",
      name: "Context",
      description: "Analyze the broader context and stakeholders",
    },
    {
      number: "04",
      name: "AI Build",
      description: "Design and implement AI-driven systems",
    },
    {
      number: "05",
      name: "Market",
      description: "Evaluate market fit and scalability",
    },
  ],
  planning: [
    {
      number: "01",
      name: "Problem",
      description: "Identify and define the core problem to solve",
    },
    {
      number: "02",
      name: "Solution",
      description: "Develop potential solutions and approaches",
    },
    {
      number: "03",
      name: "Context",
      description: "Analyze the broader context and stakeholders",
    },
    {
      number: "04",
      name: "AI Build",
      description: "Design and implement AI-driven systems",
    },
    {
      number: "05",
      name: "Market",
      description: "Evaluate market fit and scalability",
    },
  ],
};

interface PhaseCardListProps {
  variant: "methodology" | "planning";
}

export function PhaseCardList({ variant }: PhaseCardListProps) {
  const phases = PHASES[variant];
  const basePath = variant === "methodology" ? "/methodology/phases" : "/planning";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {phases.map((phase) => (
        <Link
          key={phase.number}
          href={`${basePath}/${phase.name.toLowerCase()}`}
          className="group"
        >
          <div
            className={cn(
              "h-full p-6 rounded-lg border border-gray-200 bg-white",
              "transition-all duration-200 ease-out",
              "hover:border-blue-400 hover:shadow-lg hover:bg-blue-50",
              "cursor-pointer"
            )}
          >
            <div className="flex flex-col h-full">
              <div
                className={cn(
                  "text-3xl font-bold text-gray-300",
                  "group-hover:text-blue-400 transition-colors"
                )}
              >
                {phase.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-3">
                {phase.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 flex-grow">
                {phase.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
