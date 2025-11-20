import React, { useState } from 'react';
import { Code, Eye, BookOpen } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import styles from './PatternLayout.module.css';

interface PatternLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode; // The Visualization
  code: string;
  explanation: React.ReactNode;
}

type Tab = 'viz' | 'code' | 'concept';

export const PatternLayout: React.FC<PatternLayoutProps> = ({
  title,
  description,
  children,
  code,
  explanation
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('viz');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'viz' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('viz')}
        >
          <Eye size={18} /> Visualization
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'code' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <Code size={18} /> Implementation
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'concept' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('concept')}
        >
          <BookOpen size={18} /> Concept
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'viz' && (
          <div className={styles.vizContainer}>
            {children}
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className={styles.codeContainer}>
             <CodeBlock code={code} />
          </div>
        )}

        {activeTab === 'concept' && (
          <div className={styles.conceptContainer}>
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
};
