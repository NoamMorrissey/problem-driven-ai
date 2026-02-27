import React, {useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

const artifactIcon = {
  light: '/img/artifacts-ico.png',
  dark: '/img/artifacts-ico-dark.png',
};

interface ArtifactAccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function ArtifactAccordionItem(_props: ArtifactAccordionItemProps) {
  return null;
}

interface ArtifactAccordionProps {
  children: React.ReactNode;
  defaultOpen?: number;
}

export function ArtifactAccordion({
  children,
  defaultOpen,
}: ArtifactAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ?? null,
  );
  const {colorMode} = useColorMode();

  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<ArtifactAccordionItemProps> =>
      React.isValidElement(child),
  );

  const handleToggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const iconSrc =
    colorMode === 'dark' ? artifactIcon.dark : artifactIcon.light;

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const {title} = item.props;
        const isOpen = index === openIndex;
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className={`${styles.accordionItem} ${isLast ? styles.accordionItemLast : ''}`}>
            <div
              className={styles.accordionHeader}
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
              <div className={styles.accordionHeaderLeft}>
                <img
                  src={iconSrc}
                  alt=""
                  className={styles.accordionIcon}
                  loading="lazy"
                />
                <span className={styles.accordionTitle}>{title}</span>
              </div>
              <span
                className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ''}`}>
                ›
              </span>
            </div>
            {isOpen && (
              <div className={styles.accordionContent}>
                {item.props.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
