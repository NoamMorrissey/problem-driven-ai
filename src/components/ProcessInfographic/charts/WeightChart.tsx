import React from 'react';
import styles from '../styles.module.css';

interface WeightBar {
  label: string;
  percent: number;
  color: string;
}

interface WeightChartProps {
  bars: WeightBar[];
}

export function WeightChart({bars}: WeightChartProps) {
  const maxPercent = Math.max(...bars.map(b => b.percent));

  return (
    <div className={styles.chartContainer}>
      <div className={styles.weightBars}>
        {bars.map((bar, i) => (
          <div key={i} className={styles.weightRow}>
            <span className={styles.weightLabel}>{bar.label}</span>
            <div className={styles.weightTrack}>
              <div
                className={styles.weightFill}
                style={{
                  width: `${(bar.percent / maxPercent) * 100}%`,
                  backgroundColor: bar.color,
                }}
              />
            </div>
            <span className={styles.weightPercent}>{bar.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
