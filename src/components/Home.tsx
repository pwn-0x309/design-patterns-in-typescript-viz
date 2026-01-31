import React from 'react';
import { ArrowRight, Code, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}><Zap size={14} /></span>
          <span>For TypeScript Developers</span>
        </div>
        
        <h1 className={styles.title}>
          Master Design Patterns <br />
          <span className={styles.gradientText}>in TypeScript</span>
        </h1>
        
        <p className={styles.subtitle}>
          A comprehensive, interactive visualization of 23 classic design patterns.
          Understand the concepts, see the code, and watch them in action.
        </p>
        
        <div className={styles.actions}>
          <Link to="/patterns/singleton" className={styles.primaryBtn}>
            Start Learning <ArrowRight size={18} />
          </Link>
          <a href="https://github.com/pwn-0x309/design-patterns-in-typescript-viz" target="_blank" rel="noreferrer" className={styles.secondaryBtn}>
            View on GitHub
          </a>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}><Layers size={24} /></div>
          <h3>Visual Learning</h3>
          <p>Interactive diagrams that help you build a mental model of each pattern.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}><Code size={24} /></div>
          <h3>Real-world Code</h3>
          <p>Production-ready TypeScript examples, not just abstract theory.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}><Zap size={24} /></div>
          <h3>Interactive Demos</h3>
          <p>Live playgrounds to experiment with pattern behavior.</p>
        </div>
      </div>
    </div>
  );
};
