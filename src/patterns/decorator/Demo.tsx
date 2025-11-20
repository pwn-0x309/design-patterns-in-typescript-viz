import React, { useState } from 'react';
import { Coffee, Plus, Check } from 'lucide-react';
import styles from './Demo.module.css';

// Component Interface
interface CoffeeOrder {
  getCost(): number;
  getDescription(): string;
  getIngredients(): string[];
}

// Concrete Component
class SimpleCoffee implements CoffeeOrder {
  public getCost() { return 5; }
  public getDescription() { return 'Simple Coffee'; }
  public getIngredients() { return ['Coffee Beans', 'Water']; }
}

// Base Decorator
abstract class CoffeeDecorator implements CoffeeOrder {
  constructor(protected coffee: CoffeeOrder) {}

  public getCost() { return this.coffee.getCost(); }
  public getDescription() { return this.coffee.getDescription(); }
  public getIngredients() { return this.coffee.getIngredients(); }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  public getCost() { return super.getCost() + 2; }
  public getDescription() { return super.getDescription() + ', Milk'; }
  public getIngredients() { return [...super.getIngredients(), 'Steamed Milk']; }
}

class SugarDecorator extends CoffeeDecorator {
  public getCost() { return super.getCost() + 1; }
  public getDescription() { return super.getDescription() + ', Sugar'; }
  public getIngredients() { return [...super.getIngredients(), 'Sugar']; }
}

class WhipDecorator extends CoffeeDecorator {
  public getCost() { return super.getCost() + 3; }
  public getDescription() { return super.getDescription() + ', Whip'; }
  public getIngredients() { return [...super.getIngredients(), 'Whipped Cream']; }
}

export const DecoratorDemo: React.FC = () => {
  const [decorators, setDecorators] = useState<string[]>([]);

  // Reconstruct the decorated object based on state
  let order: CoffeeOrder = new SimpleCoffee();
  
  decorators.forEach(d => {
    if (d === 'milk') order = new MilkDecorator(order);
    if (d === 'sugar') order = new SugarDecorator(order);
    if (d === 'whip') order = new WhipDecorator(order);
  });

  const toggleDecorator = (type: string) => {
    if (decorators.includes(type)) {
      setDecorators(decorators.filter(d => d !== type));
    } else {
      setDecorators([...decorators, type]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h3>Customize Your Coffee</h3>
        <div className={styles.options}>
          <button 
            className={`${styles.option} ${decorators.includes('milk') ? styles.active : ''}`}
            onClick={() => toggleDecorator('milk')}
          >
            <div className={styles.optionIcon}>🥛</div>
            <div className={styles.optionInfo}>
              <span className={styles.optionName}>Milk</span>
              <span className={styles.optionPrice}>+$2.00</span>
            </div>
            {decorators.includes('milk') && <Check size={16} className={styles.check} />}
          </button>

          <button 
            className={`${styles.option} ${decorators.includes('sugar') ? styles.active : ''}`}
            onClick={() => toggleDecorator('sugar')}
          >
            <div className={styles.optionIcon}>🍬</div>
            <div className={styles.optionInfo}>
              <span className={styles.optionName}>Sugar</span>
              <span className={styles.optionPrice}>+$1.00</span>
            </div>
            {decorators.includes('sugar') && <Check size={16} className={styles.check} />}
          </button>

          <button 
            className={`${styles.option} ${decorators.includes('whip') ? styles.active : ''}`}
            onClick={() => toggleDecorator('whip')}
          >
            <div className={styles.optionIcon}>🍦</div>
            <div className={styles.optionInfo}>
              <span className={styles.optionName}>Whip</span>
              <span className={styles.optionPrice}>+$3.00</span>
            </div>
            {decorators.includes('whip') && <Check size={16} className={styles.check} />}
          </button>
        </div>
      </div>

      <div className={styles.preview}>
        <div className={styles.cupContainer}>
          <Coffee size={120} strokeWidth={1} className={styles.cupIcon} />
          <div className={styles.steam}>
            <span></span><span></span><span></span>
          </div>
        </div>
        
        <div className={styles.receipt}>
          <h4>Current Order</h4>
          <div className={styles.receiptItems}>
            <div className={styles.receiptItem}>
              <span>Base Coffee</span>
              <span>$5.00</span>
            </div>
            {decorators.includes('milk') && (
              <div className={styles.receiptItem}>
                <span>+ Milk</span>
                <span>$2.00</span>
              </div>
            )}
            {decorators.includes('sugar') && (
              <div className={styles.receiptItem}>
                <span>+ Sugar</span>
                <span>$1.00</span>
              </div>
            )}
            {decorators.includes('whip') && (
              <div className={styles.receiptItem}>
                <span>+ Whip</span>
                <span>$3.00</span>
              </div>
            )}
            <div className={styles.divider}></div>
            <div className={`${styles.receiptItem} ${styles.total}`}>
              <span>Total</span>
              <span>${order.getCost().toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.description}>
            <strong>Description:</strong> {order.getDescription()}
          </div>
        </div>
      </div>
    </div>
  );
};
