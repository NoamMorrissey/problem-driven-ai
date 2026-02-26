import React from 'react';
import styles from '../styles.module.css';

interface Dataset {
  label: string;
  values: number[];
  color: string;
}

interface RadarChartProps {
  axes: string[];
  datasets: Dataset[];
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleIndex: number,
  total: number,
): {x: number; y: number} {
  const angle = (2 * Math.PI * angleIndex) / total - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function polygonPoints(
  cx: number,
  cy: number,
  r: number,
  sides: number,
): string {
  return Array.from({length: sides})
    .map((_, i) => {
      const p = polarToCartesian(cx, cy, r, i, sides);
      return `${p.x},${p.y}`;
    })
    .join(' ');
}

export function RadarChart({axes, datasets}: RadarChartProps) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 120;
  const sides = axes.length;
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className={styles.chartContainer}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={styles.chartSvg}
        role="img">
        {/* Grid rings */}
        {rings.map((scale) => (
          <polygon
            key={scale}
            points={polygonPoints(cx, cy, maxR * scale, sides)}
            className={styles.radarGrid}
          />
        ))}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const p = polarToCartesian(cx, cy, maxR, i, sides);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              className={styles.radarAxis}
            />
          );
        })}

        {/* Data polygons */}
        {datasets.map((ds, di) => {
          const pts = ds.values
            .map((v, i) => {
              const r = (v / 100) * maxR;
              const p = polarToCartesian(cx, cy, r, i, sides);
              return `${p.x},${p.y}`;
            })
            .join(' ');
          return (
            <polygon
              key={di}
              points={pts}
              fill={ds.color}
              fillOpacity="0.2"
              stroke={ds.color}
              strokeWidth="2"
            />
          );
        })}

        {/* Data points */}
        {datasets.map((ds, di) =>
          ds.values.map((v, i) => {
            const r = (v / 100) * maxR;
            const p = polarToCartesian(cx, cy, r, i, sides);
            return (
              <circle
                key={`${di}-${i}`}
                cx={p.x}
                cy={p.y}
                r="4"
                fill={ds.color}
                stroke="var(--ifm-background-color)"
                strokeWidth="2"
              />
            );
          }),
        )}

        {/* Axis labels */}
        {axes.map((label, i) => {
          const p = polarToCartesian(cx, cy, maxR + 20, i, sides);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.radarLabel}>
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className={styles.radarLegend}>
        {datasets.map((ds, i) => (
          <div key={i} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{backgroundColor: ds.color}}
            />
            <span className={styles.legendLabel}>{ds.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
