import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import styles from './styles.module.css';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface AntiPatternAccordionItemProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function AntiPatternAccordionItem(
  _props: AntiPatternAccordionItemProps,
) {
  return null;
}

interface AntiPatternAccordionProps {
  children: React.ReactNode;
  defaultOpen?: number;
}

export function AntiPatternAccordion({
  children,
  defaultOpen,
}: AntiPatternAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ?? null,
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pendingScroll = useRef<{index: number; top: number} | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (pendingScroll.current) {
      const {index, top} = pendingScroll.current;
      const el = itemRefs.current[index];
      if (el) {
        const newTop = el.getBoundingClientRect().top;
        window.scrollBy(0, newTop - top);
      }
      pendingScroll.current = null;
    }
  }, [openIndex]);

  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<AntiPatternAccordionItemProps> =>
      React.isValidElement(child),
  );

  const handleToggle = (index: number) => {
    const nextIndex = index === openIndex ? null : index;
    const el = itemRefs.current[index];
    if (el) {
      pendingScroll.current = {index, top: el.getBoundingClientRect().top};
    }
    setOpenIndex(nextIndex);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const {number, title} = item.props;
        const isOpen = index === openIndex;
        const isLast = index === items.length - 1;

        return (
          <div
            key={number}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`${styles.item} ${isLast ? styles.itemLast : ''}`}>
            <div className={styles.left}>
              <div
                className={`${styles.number} ${isOpen ? styles.numberActive : ''}`}>
                {number}
              </div>
            </div>
            <div className={styles.right}>
              <div
                className={styles.header}
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
                <div className={styles.title}>{title}</div>
                <span
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                  ›
                </span>
              </div>
              {isOpen && (
                <div className={styles.content}>{item.props.children}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
