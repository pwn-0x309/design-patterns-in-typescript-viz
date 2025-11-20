import React, { useState } from 'react';
import { User, Shield, Wrench, Headphones, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import styles from './Demo.module.css';

// Handler Interface
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

// Abstract Handler
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Concrete Handlers
class RobotHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'simple') {
      return "Robot: I can answer this simple FAQ.";
    }
    return super.handle(request);
  }
}

class TechnicalHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'technical') {
      return "Tech Support: I've fixed the bug.";
    }
    return super.handle(request);
  }
}

class ManagerHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'complaint') {
      return "Manager: I've issued a refund.";
    }
    return super.handle(request);
  }
}

export const ChainOfResponsibilityDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeHandler, setActiveHandler] = useState<string | null>(null);

  // Build the chain
  const robot = new RobotHandler();
  const tech = new TechnicalHandler();
  const manager = new ManagerHandler();

  robot.setNext(tech).setNext(manager);

  const handleRequest = async (type: 'simple' | 'technical' | 'complaint' | 'unknown') => {
    setLogs([]);
    setActiveHandler(null);

    const steps = [
      { handler: 'robot', name: 'Robot' },
      { handler: 'tech', name: 'Tech Support' },
      { handler: 'manager', name: 'Manager' }
    ];

    for (const step of steps) {
      setActiveHandler(step.handler);
      await new Promise(r => setTimeout(r, 800)); // Visualize processing time
      
      // Logic duplication for visualization purposes (since we can't hook into the class easily without modifying it)
      let handled = false;
      if (step.handler === 'robot' && type === 'simple') handled = true;
      if (step.handler === 'tech' && type === 'technical') handled = true;
      if (step.handler === 'manager' && type === 'complaint') handled = true;

      if (handled) {
        const result = robot.handle(type); // Actually call the chain to get the message
        setLogs(prev => [...prev, `✅ ${result}`]);
        setActiveHandler(null);
        return;
      } else {
        setLogs(prev => [...prev, `❌ ${step.name} cannot handle "${type}"`]);
      }
    }

    setLogs(prev => [...prev, `⚠️ Request "${type}" was unhandled.`]);
    setActiveHandler(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Support Ticket System</h3>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={() => handleRequest('simple')}>
            Simple Question
          </button>
          <button className={styles.btn} onClick={() => handleRequest('technical')}>
            Technical Issue
          </button>
          <button className={styles.btn} onClick={() => handleRequest('complaint')}>
            Customer Complaint
          </button>
          <button className={`${styles.btn} ${styles.secondary}`} onClick={() => handleRequest('unknown')}>
            Unknown Request
          </button>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.chain}>
          <div className={`${styles.node} ${activeHandler === 'robot' ? styles.active : ''}`}>
            <User size={32} />
            <span>Robot</span>
          </div>
          <ArrowRight className={styles.arrow} />
          <div className={`${styles.node} ${activeHandler === 'tech' ? styles.active : ''}`}>
            <Wrench size={32} />
            <span>Tech Support</span>
          </div>
          <ArrowRight className={styles.arrow} />
          <div className={`${styles.node} ${activeHandler === 'manager' ? styles.active : ''}`}>
            <Shield size={32} />
            <span>Manager</span>
          </div>
        </div>

        <div className={styles.logs}>
          {logs.map((log, i) => (
            <div key={i} className={styles.logEntry}>{log}</div>
          ))}
          {logs.length === 0 && <span className={styles.placeholder}>Select a request type to start processing...</span>}
        </div>
      </div>
    </div>
  );
};
