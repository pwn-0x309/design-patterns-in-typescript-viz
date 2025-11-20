import React, { useState } from 'react';
import { Calculator, Play, RotateCcw } from 'lucide-react';
import styles from './Demo.module.css';

// Expression Interface
interface Expression {
  interpret(): number;
}

// Terminal Expression
class NumberExpression implements Expression {
  constructor(private number: number) {}

  public interpret(): number {
    return this.number;
  }
}

// Non-Terminal Expressions
class PlusExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  public interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class MinusExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  public interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

class MultiplyExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  public interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}

// Context/Parser
class RPNParser {
  public static parse(expression: string): Expression | null {
    const tokens = expression.split(' ');
    const stack: Expression[] = [];

    for (const token of tokens) {
      if (token === '+') {
        const right = stack.pop();
        const left = stack.pop();
        if (left && right) stack.push(new PlusExpression(left, right));
      } else if (token === '-') {
        const right = stack.pop();
        const left = stack.pop();
        if (left && right) stack.push(new MinusExpression(left, right));
      } else if (token === '*') {
        const right = stack.pop();
        const left = stack.pop();
        if (left && right) stack.push(new MultiplyExpression(left, right));
      } else {
        const num = parseInt(token);
        if (!isNaN(num)) {
          stack.push(new NumberExpression(num));
        }
      }
    }
    return stack.pop() || null;
  }
}

export const InterpreterDemo: React.FC = () => {
  const [input, setInput] = useState('5 10 + 3 -'); // (5 + 10) - 3 = 12
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleInterpret = () => {
    setError(null);
    setResult(null);
    setSteps([]);

    try {
      const expression = RPNParser.parse(input);
      if (expression) {
        const res = expression.interpret();
        setResult(res);
        setSteps([
          `Parsed: ${input}`,
          `Interpreting...`,
          `Result: ${res}`
        ]);
      } else {
        setError('Invalid Expression');
      }
    } catch (e) {
      setError('Error parsing expression');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>RPN Calculator</h3>
        <p className={styles.hint}>
          Enter a Reverse Polish Notation expression. <br/>
          Example: <code>5 3 +</code> means <code>5 + 3</code>
        </p>
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
            placeholder="e.g. 5 10 + 3 -"
          />
          <button onClick={handleInterpret} className={styles.btn}>
            <Play size={18} /> Evaluate
          </button>
        </div>

        <div className={styles.examples}>
          <h4>Examples:</h4>
          <button onClick={() => setInput('5 3 +')} className={styles.exampleBtn}>5 + 3</button>
          <button onClick={() => setInput('10 2 * 5 +')} className={styles.exampleBtn}>(10 * 2) + 5</button>
          <button onClick={() => setInput('50 10 - 2 *')} className={styles.exampleBtn}>(50 - 10) * 2</button>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.display}>
          <Calculator size={48} className={styles.icon} />
          <div className={styles.screen}>
            {error ? (
              <span className={styles.error}>{error}</span>
            ) : result !== null ? (
              <span className={styles.result}>{result}</span>
            ) : (
              <span className={styles.placeholder}>Ready</span>
            )}
          </div>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>{step}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
