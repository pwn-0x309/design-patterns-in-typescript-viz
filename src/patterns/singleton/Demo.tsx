import React, { useState } from 'react';
import { Database, Server, CheckCircle, XCircle } from 'lucide-react';
import styles from './Demo.module.css';

// The Singleton Class (Simulated)
class DatabaseConnection {
  private static instance: DatabaseConnection;
  public id: string;
  public isConnected: boolean = false;

  private constructor() {
    this.id = Math.random().toString(36).substr(2, 9);
    console.log('Database Connection Created:', this.id);
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public connect() {
    this.isConnected = true;
  }

  public disconnect() {
    this.isConnected = false;
  }
}

export const SingletonDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const getInstance = () => {
    const db = DatabaseConnection.getInstance();
    setInstanceId(db.id);
    setConnectionStatus(db.isConnected);
    addLog(`Retrieved instance: ${db.id}`);
  };

  const toggleConnection = () => {
    const db = DatabaseConnection.getInstance();
    if (db.isConnected) {
      db.disconnect();
      addLog(`Instance ${db.id} disconnected`);
    } else {
      db.connect();
      addLog(`Instance ${db.id} connected`);
    }
    setConnectionStatus(db.isConnected);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.visual}>
        <div className={`${styles.server} ${connectionStatus ? styles.active : ''}`}>
          <Database size={48} />
          <div className={styles.status}>
            {connectionStatus ? <CheckCircle size={16} color="#4ade80" /> : <XCircle size={16} color="#f87171" />}
            <span>{connectionStatus ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div className={styles.instanceId}>
            ID: {instanceId || 'Not Created'}
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={getInstance} className={styles.btn}>
            <Server size={16} /> Get Instance
          </button>
          <button onClick={toggleConnection} className={styles.btn} disabled={!instanceId}>
            {connectionStatus ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>

      <div className={styles.logs}>
        <h3>Activity Log</h3>
        <ul>
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
