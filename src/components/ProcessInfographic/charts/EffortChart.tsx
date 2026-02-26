import React from 'react';
import styles from '../styles.module.css';

interface Segment {
  label: string;
  percent: number;
  color: string;
}

interface EffortChartProps {
  segments: Segment[];
}

export function EffortChart({segments}: EffortChartProps) {
  let cumulative = 0;
  const gradientStops = segments.map((seg) => {
    const start = cumulative;
    cumulative += seg.percent;
    return `${seg.color} ${start}% ${cumulative}%`;
  });

  const gradient = `conic-gradient(${gradientStops.join(', ')})`;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.effortWrapper}>
        <div className={styles.effortRing} style={{background: gradient}}>
          <div className={styles.effortHole} />
        </div>
        <div className={styles.effortLegend}>
          {segments.map((seg, i) => (
            <div key={i} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{backgroundColor: seg.color}}
              />
              <span className={styles.legendLabel}>
                {seg.label} ({seg.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
