import React, { useState } from 'react';
import { ShoppingBag, Coffee, Wine, Calculator } from 'lucide-react';
import styles from './Demo.module.css';

// Visitor Interface
interface Visitor {
  visitLiquor(liquor: Liquor): number;
  visitTobacco(tobacco: Tobacco): number;
  visitNecessity(necessity: Necessity): number;
}

// Element Interface
interface Visitable {
  accept(visitor: Visitor): number;
}

// Concrete Elements
class Liquor implements Visitable {
  constructor(public price: number) {}

  public accept(visitor: Visitor): number {
    return visitor.visitLiquor(this);
  }
}

class Tobacco implements Visitable {
  constructor(public price: number) {}

  public accept(visitor: Visitor): number {
    return visitor.visitTobacco(this);
  }
}

class Necessity implements Visitable {
  constructor(public price: number) {}

  public accept(visitor: Visitor): number {
    return visitor.visitNecessity(this);
  }
}

// Concrete Visitors
class TaxVisitor implements Visitor {
  public visitLiquor(liquor: Liquor): number {
    return liquor.price * 0.18; // 18% tax
  }

  public visitTobacco(tobacco: Tobacco): number {
    return tobacco.price * 0.32; // 32% tax
  }

  public visitNecessity(necessity: Necessity): number {
    return 0; // 0% tax
  }
}

class HolidayTaxVisitor implements Visitor {
  public visitLiquor(liquor: Liquor): number {
    return liquor.price * 0.10; // 10% tax
  }

  public visitTobacco(tobacco: Tobacco): number {
    return tobacco.price * 0.20; // 20% tax
  }

  public visitNecessity(necessity: Necessity): number {
    return 0;
  }
}

export const VisitorDemo: React.FC = () => {
  const [items] = useState<Visitable[]>([
    new Liquor(50),
    new Tobacco(20),
    new Necessity(5),
    new Liquor(100),
    new Necessity(15)
  ]);

  const [visitorType, setVisitorType] = useState<'normal' | 'holiday'>('normal');
  const [calculations, setCalculations] = useState<{ price: number, tax: number, type: string }[]>([]);

  const handleCalculate = () => {
    const visitor = visitorType === 'normal' ? new TaxVisitor() : new HolidayTaxVisitor();
    const results = items.map(item => {
      let type = 'Unknown';
      if (item instanceof Liquor) type = 'Liquor';
      if (item instanceof Tobacco) type = 'Tobacco';
      if (item instanceof Necessity) type = 'Necessity';

      // We need to cast item to any to access price since it's not on Visitable interface
      // In a real app, we might have a common base class or interface with price
      const price = (item as any).price;
      const tax = item.accept(visitor);
      
      return { price, tax, type };
    });
    setCalculations(results);
  };

  const totalTax = calculations.reduce((sum, item) => sum + item.tax, 0);
  const totalPrice = calculations.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Tax Calculator</h3>
        <p className={styles.desc}>
          The Visitor pattern allows adding new operations (like different tax calculations) without modifying the item classes.
        </p>

        <div className={styles.visitorSelect}>
          <h4>Select Tax Season</h4>
          <div className={styles.radioGroup}>
            <label className={styles.radio}>
              <input 
                type="radio" 
                checked={visitorType === 'normal'} 
                onChange={() => setVisitorType('normal')}
              />
              <span>Normal Tax Visitor</span>
            </label>
            <label className={styles.radio}>
              <input 
                type="radio" 
                checked={visitorType === 'holiday'} 
                onChange={() => setVisitorType('holiday')}
              />
              <span>Holiday Tax Visitor (Discounted)</span>
            </label>
          </div>
        </div>

        <button onClick={handleCalculate} className={styles.calcBtn}>
          <Calculator size={18} />
          Calculate Taxes
        </button>

        <div className={styles.legend}>
          <h4>Item Types</h4>
          <div className={styles.legendItem}>
            <Wine size={16} className={styles.liquorIcon} /> Liquor (High Tax)
          </div>
          <div className={styles.legendItem}>
            <Coffee size={16} className={styles.tobaccoIcon} /> Tobacco (Very High Tax)
          </div>
          <div className={styles.legendItem}>
            <ShoppingBag size={16} className={styles.necessityIcon} /> Necessity (Tax Free)
          </div>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.receipt}>
          <div className={styles.receiptHeader}>
            <h3>Receipt</h3>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className={styles.receiptItems}>
            {calculations.length === 0 ? (
              <div className={styles.empty}>Click calculate to see breakdown</div>
            ) : (
              calculations.map((calc, i) => (
                <div key={i} className={styles.receiptRow}>
                  <div className={styles.itemInfo}>
                    {calc.type === 'Liquor' && <Wine size={14} className={styles.liquorIcon} />}
                    {calc.type === 'Tobacco' && <Coffee size={14} className={styles.tobaccoIcon} />}
                    {calc.type === 'Necessity' && <ShoppingBag size={14} className={styles.necessityIcon} />}
                    <span>{calc.type} Item</span>
                  </div>
                  <div className={styles.itemCost}>
                    <span>${calc.price.toFixed(2)}</span>
                    <span className={styles.taxInfo}>+ ${calc.tax.toFixed(2)} tax</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {calculations.length > 0 && (
            <div className={styles.receiptFooter}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total Tax</span>
                <span>${totalTax.toFixed(2)}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Grand Total</span>
                <span>${(totalPrice + totalTax).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
