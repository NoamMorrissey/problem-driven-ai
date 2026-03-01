import React, {useState, useRef, useCallback, useEffect} from 'react';
import {createPortal} from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import glossaryData from '@site/static/glossary.json';
import styles from './styles.module.css';

interface GlossaryTermData {
  term_en: string;
  term_es: string;
  category: string;
  definition_en: string;
  definition_es: string;
}

interface Props {
  term: string;
  children: React.ReactNode;
}

const TOOLTIP_CATEGORIES = new Set(['Methodology', 'Framework', 'Anti-pattern']);

const termIndex = new Map<string, GlossaryTermData>();
for (const t of (glossaryData as {terms: GlossaryTermData[]}).terms) {
  if (TOOLTIP_CATEGORIES.has(t.category)) {
    termIndex.set(t.term_en.toLowerCase(), t);
  }
}

type Placement = 'top' | 'bottom';

interface Position {
  top: number;
  left: number;
  placement: Placement;
  arrowLeft: number;
}

/** Find the line rect closest to the mouse Y position. */
function closestRect(rects: DOMRectList, mouseY: number): DOMRect {
  let best = rects[0];
  let bestDist = Infinity;
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const centerY = r.top + r.height / 2;
    const dist = Math.abs(centerY - mouseY);
    if (dist < bestDist) {
      bestDist = dist;
      best = r;
    }
  }
  return best;
}

function calcPosition(
  triggerEl: HTMLElement,
  tooltipEl: HTMLElement,
  mouseY: number,
): Position {
  const rects = triggerEl.getClientRects();
  const tw = tooltipEl.offsetWidth;
  const th = tooltipEl.offsetHeight;
  const gap = 10;

  // Pick the line rect closest to the mouse cursor
  const anchorRect =
    rects.length > 0
      ? closestRect(rects, mouseY)
      : triggerEl.getBoundingClientRect();

  const spaceAbove = anchorRect.top;
  const spaceBelow = window.innerHeight - anchorRect.bottom;
  const placement: Placement = spaceAbove >= th + gap ? 'top' : spaceBelow >= th + gap ? 'bottom' : 'top';

  const topVal =
    placement === 'top'
      ? anchorRect.top - th - gap
      : anchorRect.bottom + gap;

  // Center tooltip horizontally on the anchor line rect
  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  let leftVal = anchorCenterX - tw / 2;
  const minLeft = 8;
  const maxLeft = window.innerWidth - tw - 8;
  leftVal = Math.max(minLeft, Math.min(maxLeft, leftVal));

  // Arrow points to the center of the anchor rect
  const arrowLeft = anchorCenterX - leftVal;

  return {top: topVal, left: leftVal, placement, arrowLeft};
}

export default function GlossaryTooltip({term, children}: Props): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Position | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseYRef = useRef(0);
  const {i18n} = useDocusaurusContext();
  const isEs = i18n.currentLocale === 'es';

  const data = termIndex.get(term.toLowerCase());
  if (!data) return <>{children}</>;

  const definition = isEs ? data.definition_es : data.definition_en;
  const termSlug = data.term_en.toLowerCase().replace(/\s+/g, '-');
  const glossaryHref = isEs
    ? `/es/recursos/glosario#${termSlug}`
    : `/resources/glossary#${termSlug}`;
  const linkLabel = isEs ? 'Ver en glosario' : 'View in glossary';

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const show = useCallback((e: React.MouseEvent | React.FocusEvent) => {
    if ('clientY' in e) {
      mouseYRef.current = (e as React.MouseEvent).clientY;
    }
    clearHideTimer();
    setVisible(true);
  }, [clearHideTimer]);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  }, []);

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      setPos(calcPosition(triggerRef.current, tooltipRef.current, mouseYRef.current));
    }
  }, [visible]);

  useEffect(() => {
    return () => clearHideTimer();
  }, [clearHideTimer]);

  const tooltipContent = visible ? (
    <div
      ref={tooltipRef}
      id={`glossary-tooltip-${term.replace(/\s+/g, '-')}`}
      role="tooltip"
      className={`${styles.tooltip} ${
        pos?.placement === 'bottom' ? styles.tooltipBottom : styles.tooltipTop
      }`}
      style={
        pos
          ? {top: pos.top, left: pos.left, position: 'fixed'}
          : {visibility: 'hidden', position: 'fixed', top: 0, left: 0}
      }
      onMouseEnter={clearHideTimer}
      onMouseLeave={hide}
    >
      <div
        className={styles.arrow}
        style={{left: pos ? pos.arrowLeft : '50%'}}
      />
      <p className={styles.definition}>{definition}</p>
      <a href={glossaryHref} className={styles.glossaryLink}>
        {linkLabel} →
      </a>
    </div>
  ) : null;

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        ref={triggerRef}
        className={styles.trigger}
        tabIndex={0}
        role="button"
        aria-describedby={`glossary-tooltip-${term.replace(/\s+/g, '-')}`}
      >
        {children}
      </span>

      {typeof document !== 'undefined' && tooltipContent
        ? createPortal(tooltipContent, document.body)
        : null}
    </span>
  );
}
