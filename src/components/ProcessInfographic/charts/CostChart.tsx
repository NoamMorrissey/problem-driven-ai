import React from 'react';
import styles from '../styles.module.css';

interface CostBar {
  label: string;
  value: string;
  height: number;
  color: string;
}

interface CostChartProps {
  bars: CostBar[];
}

export function CostChart({bars}: CostChartProps) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.costWrapper}>
        <div className={styles.costBars}>
          {bars.map((bar, i) => (
            <div key={i} className={styles.costColumn}>
              <div className={styles.costValue}>{bar.value}</div>
              <div
                className={styles.costBar}
                style={{
                  height: `${bar.height}px`,
                  backgroundColor: bar.color,
                }}
              />
              <div className={styles.costLabel}>{bar.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
