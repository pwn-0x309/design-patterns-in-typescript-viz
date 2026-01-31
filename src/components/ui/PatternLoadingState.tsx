import React from 'react';
import styles from './PatternLoadingState.module.css';

export const PatternLoadingState: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.description}`}></div>
      </header>

      <div className={styles.tabs}>
        <div className={`${styles.skeleton} ${styles.tab}`}></div>
        <div className={`${styles.skeleton} ${styles.tab}`}></div>
        <div className={`${styles.skeleton} ${styles.tab}`}></div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.contentBlock}`}></div>
        <div className={`${styles.skeleton} ${styles.contentBlock} ${styles.contentBlockSmall}`}></div>
        <div className={`${styles.skeleton} ${styles.contentBlock} ${styles.contentBlockMedium}`}></div>
      </div>
    </div>
  );
};
