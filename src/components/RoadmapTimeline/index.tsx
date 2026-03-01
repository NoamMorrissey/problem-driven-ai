import React, {useState} from 'react';
import styles from './styles.module.css';

type StepStatus = 'current' | 'planned' | 'future';

interface RoadmapStep {
  version: string;
  title: string;
  status: StepStatus;
  children: React.ReactNode;
}

interface RoadmapItemProps {
  version: string;
  title: string;
  status?: StepStatus;
  children: React.ReactNode;
}

/** Declarative child — rendered by RoadmapTimeline, not directly. */
export function RoadmapItem(_props: RoadmapItemProps) {
  return null;
}

interface RoadmapTimelineProps {
  children: React.ReactNode;
}

const STATUS_LABELS: Record<StepStatus, string> = {
  current: 'Current',
  planned: 'Planned',
  future: 'Future',
};

export function RoadmapTimeline({children}: RoadmapTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const items: RoadmapStep[] = React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<RoadmapItemProps> =>
        React.isValidElement(child),
    )
    .map((child) => ({
      version: child.props.version,
      title: child.props.title,
      status: child.props.status ?? 'planned',
      children: child.props.children,
    }));

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className={styles.roadmapTimeline}>
      {items.map((step, index) => {
        const isActive = index === activeIndex;
        const isLast = index === items.length - 1;
        const isCurrent = step.status === 'current';

        const dotClass = [
          styles.dot,
          isActive && isCurrent && styles.dotCurrent,
          isActive && !isCurrent && styles.dotActive,
        ]
          .filter(Boolean)
          .join(' ');

        const statusClass =
          step.status === 'current'
            ? styles.statusCurrent
            : step.status === 'future'
              ? styles.statusFuture
              : styles.statusPlanned;

        return (
          <div
            key={step.version}
            className={`${styles.step} ${isLast ? styles.stepLast : ''}`}>
            <div className={styles.stepLeft}>
              <div className={dotClass}>{index}</div>
            </div>
            <div className={styles.stepRight}>
              <div
                className={styles.cardHeader}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}>
                <span
                  className={`${styles.versionBadge} ${isCurrent ? styles.versionBadgeCurrent : ''}`}>
                  {step.version}
                </span>
                <span
                  className={`${styles.cardTitle} ${isActive ? styles.cardTitleActive : ''}`}>
                  {step.title}
                </span>
                <span className={`${styles.statusBadge} ${statusClass}`}>
                  {STATUS_LABELS[step.status]}
                </span>
              </div>
              <div
                className={`${styles.cardBody} ${isActive ? styles.cardBodyOpen : ''}`}>
                <div className={styles.cardContent}>{step.children}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
