import React from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

const icons: Record<string, {light: string; dark: string}> = {
  'step-by-step': {
    light: '/img/step-by-step-ico.png',
    dark: '/img/step-by-step-ico-dark.png',
  },
  anatomy: {
    light: '/img/anatomia-ico.png',
    dark: '/img/anatomia-ico-dark.png',
  },
  artifacts: {
    light: '/img/artifacts-ico.png',
    dark: '/img/artifacts-ico-dark.png',
  },
  'gate-review': {
    light: '/img/gate-review-ico.png',
    dark: '/img/gate-review-ico-dark.png',
  },
  'anti-patterns': {
    light: '/img/anti-patterns-ico.png',
    dark: '/img/anti-patterns-ico-dark.png',
  },
  effort: {
    light: '/img/effort-ico.png',
    dark: '/img/effort-ico-dark.png',
  },
};

interface GuideCardProps {
  icon: string;
  title: string;
  to: string;
  children: React.ReactNode;
}

export function GuideCard({icon, title, to, children}: GuideCardProps) {
  const {colorMode} = useColorMode();
  const iconPair = icons[icon];
  const iconSrc = iconPair
    ? colorMode === 'dark'
      ? iconPair.dark
      : iconPair.light
    : undefined;

  return (
    <article className={styles.card}>
      <Link href={to} className={styles.cardLink}>
        <h2 className={styles.cardTitle}>
          {iconSrc && (
            <img
              src={iconSrc}
              alt=""
              className={styles.cardIcon}
              loading="lazy"
            />
          )}
          {title}
        </h2>
        <p className={styles.cardDescription}>{children}</p>
      </Link>
    </article>
  );
}

interface GuideCardGridProps {
  children: React.ReactNode;
}

export function GuideCardGrid({children}: GuideCardGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
