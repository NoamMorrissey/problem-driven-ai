import React from 'react';
import styles from './styles.module.css';

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  owner?: string;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

export function ProcessTimeline({steps}: ProcessTimelineProps) {
  return (
    <div className={styles.timeline}>
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`${styles.timelineStep} ${index % 2 === 0 ? styles.timelineStepLeft : styles.timelineStepRight}`}>
          <div className={styles.timelineContent}>
            <h3 className={styles.timelineTitle}>{step.title}</h3>
            <p className={styles.timelineDescription}>{step.description}</p>
            {step.owner && (
              <span className={styles.timelineOwner}>{step.owner}</span>
            )}
          </div>
          <div className={styles.timelineNumber}>{step.number}</div>
          <div className={styles.timelineSpacer} />
        </div>
      ))}
    </div>
  );
}
