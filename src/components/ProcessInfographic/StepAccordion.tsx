import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import styles from './styles.module.css';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface StepAccordionItemProps {
  number: number;
  title: string;
  summary: string;
  children: React.ReactNode;
}

export function StepAccordionItem(_props: StepAccordionItemProps) {
  return null;
}

interface StepAccordionProps {
  children: React.ReactNode;
  defaultOpen?: number;
}

export function StepAccordion({children, defaultOpen}: StepAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pendingScroll = useRef<{index: number; top: number} | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (pendingScroll.current) {
      const {index, top} = pendingScroll.current;
      const el = stepRefs.current[index];
      if (el) {
        const newTop = el.getBoundingClientRect().top;
        window.scrollBy(0, newTop - top);
      }
      pendingScroll.current = null;
    }
  }, [openIndex]);

  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<StepAccordionItemProps> =>
      React.isValidElement(child),
  );

  const handleToggle = (index: number) => {
    const nextIndex = index === openIndex ? null : index;
    const el = stepRefs.current[index];
    if (el) {
      pendingScroll.current = {index, top: el.getBoundingClientRect().top};
    }
    setOpenIndex(nextIndex);
  };

  return (
    <div className={styles.stepAccordion}>
      {items.map((item, index) => {
        const {number, title, summary} = item.props;
        const isOpen = index === openIndex;
        const isLast = index === items.length - 1;

        return (
          <div
            key={number}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`${styles.stepAccordionStep} ${isLast ? styles.stepAccordionStepLast : ''}`}>
            <div className={styles.stepAccordionLeft}>
              <div
                className={`${styles.stepAccordionNumber} ${isOpen ? styles.stepAccordionNumberActive : ''}`}>
                {number}
              </div>
            </div>
            <div className={styles.stepAccordionRight}>
              <div
                className={styles.stepAccordionHeader}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}>
                <div className={styles.stepAccordionHeaderText}>
                  <div className={styles.stepAccordionTitle}>{title}</div>
                  {!isOpen && (
                    <p className={styles.stepAccordionSummary}>{summary}</p>
                  )}
                </div>
                <span
                  className={`${styles.stepAccordionChevron} ${isOpen ? styles.stepAccordionChevronOpen : ''}`}>
                  ›
                </span>
              </div>
              {isOpen && (
                <div className={styles.stepAccordionContent}>
                  {item.props.children}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
