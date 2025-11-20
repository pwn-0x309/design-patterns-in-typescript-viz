import React, { useState } from 'react';
import { MousePointer, Type } from 'lucide-react';
import styles from './Demo.module.css';

// Abstract Products
interface Button {
  render(): React.ReactNode;
}

interface Checkbox {
  render(): React.ReactNode;
}

// Abstract Factory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete Products - Light Theme
class LightButton implements Button {
  public render(): React.ReactNode {
    return (
      <button className={`${styles.btn} ${styles.lightBtn}`}>
        Light Button
      </button>
    );
  }
}

class LightCheckbox implements Checkbox {
  public render(): React.ReactNode {
    return (
      <label className={`${styles.checkbox} ${styles.lightCheckbox}`}>
        <input type="checkbox" defaultChecked /> Light Checkbox
      </label>
    );
  }
}

// Concrete Products - Dark Theme
class DarkButton implements Button {
  public render(): React.ReactNode {
    return (
      <button className={`${styles.btn} ${styles.darkBtn}`}>
        Dark Button
      </button>
    );
  }
}

class DarkCheckbox implements Checkbox {
  public render(): React.ReactNode {
    return (
      <label className={`${styles.checkbox} ${styles.darkCheckbox}`}>
        <input type="checkbox" defaultChecked /> Dark Checkbox
      </label>
    );
  }
}

// Concrete Factories
class LightThemeFactory implements GUIFactory {
  public createButton(): Button {
    return new LightButton();
  }
  public createCheckbox(): Checkbox {
    return new LightCheckbox();
  }
}

class DarkThemeFactory implements GUIFactory {
  public createButton(): Button {
    return new DarkButton();
  }
  public createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }
}

// Client Code
const Application = ({ factory }: { factory: GUIFactory }) => {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  return (
    <div className={styles.appWindow}>
      <div className={styles.windowHeader}>
        <div className={styles.dots}>
          <span></span><span></span><span></span>
        </div>
        <span className={styles.windowTitle}>Sample App</span>
      </div>
      <div className={styles.windowContent}>
        <div className={styles.componentRow}>
          <MousePointer size={16} />
          {button.render()}
        </div>
        <div className={styles.componentRow}>
          <Type size={16} />
          {checkbox.render()}
        </div>
      </div>
    </div>
  );
};

export const AbstractFactoryDemo: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const factory = theme === 'light' ? new LightThemeFactory() : new DarkThemeFactory();

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Theme Selection</h3>
        <div className={styles.toggles}>
          <button 
            className={`${styles.toggle} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => setTheme('light')}
          >
            Light Theme
          </button>
          <button 
            className={`${styles.toggle} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark Theme
          </button>
        </div>
        <p className={styles.hint}>
          The client code (Application) doesn't know the concrete classes of the widgets it renders. It only works with the abstract interface.
        </p>
      </div>

      <div className={styles.preview}>
        <Application factory={factory} />
      </div>
    </div>
  );
};
