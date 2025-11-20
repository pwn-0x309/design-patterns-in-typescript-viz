import React, { useState } from 'react';
import { CreditCard, Wallet, DollarSign, ShoppingCart } from 'lucide-react';
import styles from './Demo.module.css';

// Strategy Interface
interface PaymentStrategy {
  pay(amount: number): string;
  getName(): string;
  getIcon(): React.ReactNode;
}

// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  private cvv: string;

  constructor(cardNumber: string, cvv: string) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  public pay(amount: number): string {
    return `Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`;
  }

  public getName(): string {
    return 'Credit Card';
  }

  public getIcon(): React.ReactNode {
    return <CreditCard size={20} />;
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public pay(amount: number): string {
    return `Paid $${amount} using PayPal (${this.email})`;
  }

  public getName(): string {
    return 'PayPal';
  }

  public getIcon(): React.ReactNode {
    return <Wallet size={20} />;
  }
}

class CashPayment implements PaymentStrategy {
  public pay(amount: number): string {
    return `Paid $${amount} in Cash at delivery`;
  }

  public getName(): string {
    return 'Cash on Delivery';
  }

  public getIcon(): React.ReactNode {
    return <DollarSign size={20} />;
  }
}

// Context
class ShoppingCartContext {
  private strategy: PaymentStrategy | null = null;

  public setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  public checkout(amount: number): string {
    if (!this.strategy) {
      return 'Please select a payment method';
    }
    return this.strategy.pay(amount);
  }
}

export const StrategyDemo: React.FC = () => {
  const [cart] = useState(new ShoppingCartContext());
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount] = useState(129.99);
  const [status, setStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const strategies: PaymentStrategy[] = [
    new CreditCardPayment('4242424242424242', '123'),
    new PayPalPayment('user@example.com'),
    new CashPayment()
  ];

  const handleSelect = (strategy: PaymentStrategy) => {
    cart.setPaymentStrategy(strategy);
    setSelectedMethod(strategy.getName());
    setStatus(null);
  };

  const handleCheckout = () => {
    if (!selectedMethod) {
      setStatus('Please select a payment method first!');
      return;
    }

    setIsProcessing(true);
    setStatus('Processing payment...');

    setTimeout(() => {
      const result = cart.checkout(amount);
      setStatus(result);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkout}>
        <div className={styles.header}>
          <ShoppingCart size={24} />
          <h3>Checkout</h3>
        </div>

        <div className={styles.summary}>
          <div className={styles.row}>
            <span>Subtotal</span>
            <span>${amount}</span>
          </div>
          <div className={styles.row}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={`${styles.row} ${styles.total}`}>
            <span>Total</span>
            <span>${amount}</span>
          </div>
        </div>

        <div className={styles.methods}>
          <h4>Select Payment Method</h4>
          <div className={styles.grid}>
            {strategies.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSelect(s)}
                className={`${styles.methodBtn} ${selectedMethod === s.getName() ? styles.selected : ''}`}
              >
                {s.getIcon()}
                <span>{s.getName()}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleCheckout} 
          className={styles.payBtn}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay $${amount}`}
        </button>

        {status && (
          <div className={`${styles.status} ${status.includes('Paid') ? styles.success : styles.error}`}>
            {status}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h4>How it works</h4>
        <p>
          The <strong>Strategy Pattern</strong> allows the shopping cart to be agnostic about the specific payment implementation.
        </p>
        <p>
          When you select a payment method, we inject a specific <code>PaymentStrategy</code> into the context. The context then delegates the payment execution to that strategy object.
        </p>
        <div className={styles.diagram}>
          <div className={styles.box}>Context (Cart)</div>
          <div className={styles.arrow}>⬇️ delegates to</div>
          <div className={styles.box}>Strategy Interface</div>
          <div className={styles.arrow}>⬆️ implements</div>
          <div className={styles.row}>
            <div className={styles.smallBox}>Credit Card</div>
            <div className={styles.smallBox}>PayPal</div>
            <div className={styles.smallBox}>Cash</div>
          </div>
        </div>
      </div>
    </div>
  );
};
