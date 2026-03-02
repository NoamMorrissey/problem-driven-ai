import React, {useState, useCallback} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

const principles = [
  {id: 1, en: 'Sacred Problem', es: 'Problema Sagrado'},
  {id: 2, en: 'Client Empathy', es: 'Empatía del Cliente'},
  {id: 3, en: 'Consensus', es: 'Consenso'},
  {id: 4, en: 'Context Design', es: 'Diseño de Contexto'},
  {id: 5, en: 'Build Caution', es: 'Cautela al Construir'},
  {id: 6, en: 'Speed Discipline', es: 'Disciplina'},
  {id: 7, en: 'Market Truth', es: 'Verdad del Mercado'},
  {id: 8, en: 'Learning Cycles', es: 'Ciclos de Aprendizaje'},
  {id: 9, en: 'Living Context', es: 'Contexto Vivo'},
  {id: 10, en: 'Clarity', es: 'Claridad'},
] as const;

/** Deduplicated edges derived from each principle's "Connections" section. */
const edges: [number, number][] = [
  [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 3], [2, 5], [2, 6],
  [3, 4], [3, 5], [3, 6],
  [4, 5], [4, 6], [4, 9], [4, 10],
  [5, 6],
  [7, 8], [7, 9],
  [8, 9], [8, 10],
  [9, 10],
];

const SIZE = 700;
const CENTER = SIZE / 2;
const ORBIT = 220;
const R = 24;

function nodePos(i: number) {
  const a = (i * 2 * Math.PI) / 10 - Math.PI / 2;
  return {x: CENTER + ORBIT * Math.cos(a), y: CENTER + ORBIT * Math.sin(a), a};
}

function labelAnchor(angle: number) {
  const c = Math.cos(angle);
  return c > 0.15 ? 'start' : c < -0.15 ? 'end' : 'middle';
}

export default function PrincipleRelationshipMap(): React.JSX.Element {
  const [active, setActive] = useState<number | null>(null);
  const {i18n} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const locale = i18n.currentLocale === 'es' ? 'es' : 'en';
  const dark = colorMode === 'dark';

  const pos = principles.map((_, i) => nodePos(i));

  const isAdjacent = useCallback(
    (id: number) =>
      active === null ||
      id === active ||
      edges.some(
        ([a, b]) => (a === active && b === id) || (b === active && a === id),
      ),
    [active],
  );

  const isEdgeLit = useCallback(
    (a: number, b: number) =>
      active !== null && (a === active || b === active),
    [active],
  );

  const c = {
    node: dark ? '#818cf8' : '#4c4cdd',
    nodeLit: dark ? '#a5b4fc' : '#6366f1',
    txt: dark ? '#cbd5e1' : '#334155',
    txtLit: dark ? '#a5b4fc' : '#4c4cdd',
    line: dark ? 'rgba(129,140,248,0.15)' : 'rgba(76,76,221,0.12)',
    lineLit: dark ? 'rgba(129,140,248,0.55)' : 'rgba(76,76,221,0.45)',
  };

  return (
    <div className={styles.container}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={styles.svg}
        role="img"
        aria-label={
          locale === 'es'
            ? 'Mapa de relaciones entre los 10 principios'
            : 'Relationship map between the 10 principles'
        }
      >
        {/* Edges */}
        <g>
          {edges.map(([a, b]) => {
            const pa = pos[a - 1];
            const pb = pos[b - 1];
            const lit = isEdgeLit(a, b);
            return (
              <line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={lit ? c.lineLit : c.line}
                strokeWidth={lit ? 2.5 : 1.5}
                opacity={active !== null && !lit ? 0.1 : 1}
                className={styles.edge}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {principles.map((p, i) => {
            const {x, y, a: angle} = pos[i];
            const on = active === p.id;
            const dim = active !== null && !isAdjacent(p.id);
            const label = p[locale];
            const off = R + 12;
            const lx = x + off * Math.cos(angle);
            const ly = y + off * Math.sin(angle);

            return (
              <g
                key={p.id}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() =>
                  setActive((prev) => (prev === p.id ? null : p.id))
                }
                className={styles.node}
                opacity={dim ? 0.1 : 1}
              >
                {/* Larger invisible hit area */}
                <circle cx={x} cy={y} r={R + 12} fill="transparent" />

                <circle cx={x} cy={y} r={R} fill={on ? c.nodeLit : c.node} />

                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fff"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="var(--pdai-font-family-heading)"
                  style={{pointerEvents: 'none'}}
                >
                  {p.id}
                </text>

                <text
                  x={lx}
                  y={ly}
                  textAnchor={labelAnchor(angle)}
                  dominantBaseline="central"
                  fill={on ? c.txtLit : c.txt}
                  fontSize="12"
                  fontWeight={on ? '700' : '500'}
                  fontFamily="var(--pdai-font-family-heading)"
                  className={styles.label}
                  style={{pointerEvents: 'none'}}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
