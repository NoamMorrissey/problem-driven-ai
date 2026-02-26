import React from 'react';
import styles from '../styles.module.css';

interface DataPoint {
  label: string;
  value: number;
}

interface SaturationChartProps {
  data: DataPoint[];
  thresholdLabel?: string;
  thresholdValue?: number;
  yLabel?: string;
}

export function SaturationChart({
  data,
  thresholdLabel,
  thresholdValue = 85,
  yLabel,
}: SaturationChartProps) {
  const width = 500;
  const height = 280;
  const padding = {top: 20, right: 30, bottom: 50, left: 50};
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxY = 100;
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - (d.value / maxY) * chartH,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${points[0].x},${padding.top + chartH} ${points.map((p) => `L${p.x},${p.y}`).join(' ')} L${points[points.length - 1].x},${padding.top + chartH} Z`;

  const thresholdY =
    padding.top + chartH - (thresholdValue / maxY) * chartH;

  return (
    <div className={styles.chartContainer}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.chartSvg}
        role="img">
        <defs>
          <linearGradient id="saturationFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--ifm-color-primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y axis grid lines */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padding.top + chartH - (v / maxY) * chartH;
          return (
            <g key={v}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartW}
                y2={y}
                className={styles.chartGrid}
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className={styles.chartAxisLabel}>
                {v}%
              </text>
            </g>
          );
        })}

        {/* X axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={padding.left + (i / (data.length - 1)) * chartW}
            y={height - 10}
            textAnchor="middle"
            className={styles.chartAxisLabel}>
            {d.label}
          </text>
        ))}

        {/* Y axis title */}
        {yLabel && (
          <text
            x={15}
            y={padding.top + chartH / 2}
            textAnchor="middle"
            transform={`rotate(-90, 15, ${padding.top + chartH / 2})`}
            className={styles.chartAxisLabel}>
            {yLabel}
          </text>
        )}

        {/* Threshold line */}
        {thresholdLabel && (
          <g>
            <line
              x1={padding.left}
              y1={thresholdY}
              x2={padding.left + chartW}
              y2={thresholdY}
              className={styles.chartThreshold}
            />
            <text
              x={padding.left + chartW + 5}
              y={thresholdY + 4}
              className={styles.chartThresholdLabel}>
              {thresholdLabel}
            </text>
          </g>
        )}

        {/* Area fill */}
        <path d={areaPath} fill="url(#saturationFill)" />

        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="var(--ifm-background-color)"
            stroke="var(--ifm-color-primary)"
            strokeWidth="2.5"
          />
        ))}
      </svg>
    </div>
  );
}
