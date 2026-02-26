import React from 'react';
import styles from './styles.module.css';

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({value, label, description}: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {description && <div className={styles.statDescription}>{description}</div>}
    </div>
  );
}

interface StatCardGridProps {
  children: React.ReactNode;
}

export function StatCardGrid({children}: StatCardGridProps) {
  return <div className={styles.statGrid}>{children}</div>;
}
