import { cn } from "@/lib/utils/cn";

export interface TimelinePhase {
  name: string;
  status: "current" | "completed" | "upcoming";
}

interface ProcessTimelineProps {
  phases: TimelinePhase[];
}

export function ProcessTimeline({ phases }: ProcessTimelineProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 lg:gap-4">
        {phases.map((phase, index) => (
          <div key={index} className="flex items-center flex-1">
            {/* Dot */}
            <div
              className={cn(
                "w-4 h-4 lg:w-5 lg:h-5 rounded-full flex-shrink-0 transition-all duration-200",
                phase.status === "completed" &&
                  "bg-green-500 ring-4 ring-green-100",
                phase.status === "current" &&
                  "bg-blue-500 ring-4 ring-blue-100 scale-125",
                phase.status === "upcoming" && "bg-gray-300"
              )}
              aria-current={phase.status === "current" ? "step" : undefined}
            />

            {/* Connecting Line */}
            {index < phases.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 lg:mx-4 rounded-full transition-all duration-200",
                  (phase.status === "completed" ||
                    phases[index + 1].status === "current") &&
                    "bg-green-400",
                  phase.status !== "completed" &&
                    phases[index + 1].status !== "current" &&
                    "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-start justify-between gap-2 lg:gap-4 mt-3 lg:mt-4">
        {phases.map((phase, index) => (
          <div key={index} className="flex-1 min-w-0">
            <p
              className={cn(
                "text-xs lg:text-sm font-medium text-center truncate",
                phase.status === "completed" && "text-green-700",
                phase.status === "current" && "text-blue-700 font-bold",
                phase.status === "upcoming" && "text-gray-500"
              )}
            >
              {phase.name}
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              {phase.status === "completed" && "Complete"}
              {phase.status === "current" && "Current"}
              {phase.status === "upcoming" && "Coming"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
