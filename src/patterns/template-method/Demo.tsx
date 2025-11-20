import React, { useState } from 'react';
import { FileText, FileJson, FileCode, Check, ArrowRight, Loader } from 'lucide-react';
import styles from './Demo.module.css';

// Abstract Class
abstract class DataMiner {
  protected logCallback: (msg: string) => void;

  constructor(logCallback: (msg: string) => void) {
    this.logCallback = logCallback;
  }

  // Template Method
  public async mine(path: string): Promise<void> {
    this.logCallback(`🚀 Starting mining process for ${path}`);
    await this.openFile(path);
    await this.extractData();
    await this.parseData();
    await this.analyzeData();
    await this.sendReport();
    await this.closeFile();
    this.logCallback(`✅ Mining completed for ${path}`);
  }

  protected async openFile(path: string): Promise<void> {
    await this.simulateWork(`Opening file: ${path}`, 500);
  }

  protected async analyzeData(): Promise<void> {
    await this.simulateWork('Analyzing data...', 800);
  }

  protected async sendReport(): Promise<void> {
    await this.simulateWork('Sending report...', 400);
  }

  protected async closeFile(): Promise<void> {
    await this.simulateWork('Closing file', 300);
  }

  protected abstract extractData(): Promise<void>;
  protected abstract parseData(): Promise<void>;

  protected simulateWork(msg: string, ms: number): Promise<void> {
    return new Promise(resolve => {
      this.logCallback(msg);
      setTimeout(resolve, ms);
    });
  }
}

// Concrete Classes
class PDFDataMiner extends DataMiner {
  protected async extractData(): Promise<void> {
    await this.simulateWork('Extracting data from PDF...', 1000);
  }

  protected async parseData(): Promise<void> {
    await this.simulateWork('Parsing PDF data structure...', 800);
  }
}

class CSVDataMiner extends DataMiner {
  protected async extractData(): Promise<void> {
    await this.simulateWork('Extracting data from CSV...', 600);
  }

  protected async parseData(): Promise<void> {
    await this.simulateWork('Parsing CSV columns...', 500);
  }
}

class DocDataMiner extends DataMiner {
  protected async extractData(): Promise<void> {
    await this.simulateWork('Extracting data from DOC...', 900);
  }

  protected async parseData(): Promise<void> {
    await this.simulateWork('Parsing DOC formatting...', 700);
  }
}

export const TemplateMethodDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isMining, setIsMining] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev]);
    setActiveStep(msg);
  };

  const handleMine = async (type: 'pdf' | 'csv' | 'doc') => {
    if (isMining) return;
    
    setIsMining(true);
    setLogs([]);
    setActiveStep(null);

    let miner: DataMiner;
    const filename = `report_2023.${type}`;

    switch (type) {
      case 'pdf':
        miner = new PDFDataMiner(addLog);
        break;
      case 'csv':
        miner = new CSVDataMiner(addLog);
        break;
      case 'doc':
        miner = new DocDataMiner(addLog);
        break;
    }

    await miner.mine(filename);
    setIsMining(false);
    setActiveStep(null);
  };

  const steps = [
    'Open File',
    'Extract Data',
    'Parse Data',
    'Analyze Data',
    'Send Report',
    'Close File'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Data Mining Tool</h3>
        <p className={styles.desc}>Select a file format to process using the Template Method pattern.</p>
        
        <div className={styles.fileGrid}>
          <button 
            onClick={() => handleMine('pdf')} 
            disabled={isMining}
            className={styles.fileBtn}
          >
            <FileText size={32} className={styles.pdfIcon} />
            <span>PDF Document</span>
          </button>
          
          <button 
            onClick={() => handleMine('csv')} 
            disabled={isMining}
            className={styles.fileBtn}
          >
            <FileCode size={32} className={styles.csvIcon} />
            <span>CSV Spreadsheet</span>
          </button>
          
          <button 
            onClick={() => handleMine('doc')} 
            disabled={isMining}
            className={styles.fileBtn}
          >
            <FileJson size={32} className={styles.docIcon} />
            <span>Word Document</span>
          </button>
        </div>

        <div className={styles.status}>
          {isMining ? (
            <div className={styles.processing}>
              <Loader size={20} className={styles.spinner} />
              <span>Processing: {activeStep}</span>
            </div>
          ) : (
            <div className={styles.idle}>Ready to process</div>
          )}
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.pipeline}>
          <h4>Pipeline Execution</h4>
          <div className={styles.steps}>
            {steps.map((step, i) => {
              const isActive = activeStep?.includes(step.split(' ')[0]);
              const isDone = logs.some(l => l.includes(step.split(' ')[0]) && logs.indexOf(l) > logs.findIndex(lg => lg === activeStep));
              
              return (
                <div key={i} className={`${styles.step} ${isActive ? styles.activeStep : ''} ${isDone ? styles.doneStep : ''}`}>
                  <div className={styles.stepIcon}>
                    {isActive ? <Loader size={14} className={styles.spinner} /> : isDone ? <Check size={14} /> : <div className={styles.dot} />}
                  </div>
                  <span>{step}</span>
                  {i < steps.length - 1 && <ArrowRight size={14} className={styles.arrow} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.logsPanel}>
          <div className={styles.logHeader}>Execution Log</div>
          <div className={styles.logs}>
            {logs.map((log, i) => (
              <div key={i} className={styles.logItem}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
