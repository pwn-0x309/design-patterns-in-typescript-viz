import React, { useState } from 'react';
import { Database, Server, Shield, Clock, Search, RefreshCw } from 'lucide-react';
import styles from './Demo.module.css';

// Subject Interface
interface DataService {
  getData(key: string): Promise<string>;
}

// Real Subject
class RealDataService implements DataService {
  public async getData(key: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `Result for "${key}" from Server`;
  }
}

// Proxy
class CachedDataService implements DataService {
  private cache: Map<string, string> = new Map();
  private service: RealDataService;

  constructor(service: RealDataService) {
    this.service = service;
  }

  public async getData(key: string): Promise<string> {
    if (this.cache.has(key)) {
      return `${this.cache.get(key)} (Cached)`;
    }

    const result = await this.service.getData(key);
    this.cache.set(key, result.replace(' from Server', ''));
    return result;
  }
  
  public clearCache() {
    this.cache.clear();
  }
}

export const ProxyDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [source, setSource] = useState<'server' | 'cache' | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  // We use a ref to keep the service instance stable across renders
  const [proxy] = useState(() => new CachedDataService(new RealDataService()));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setSource(null);
    addLog(`Requesting data for: "${query}"...`);

    const startTime = Date.now();
    const data = await proxy.getData(query);
    const endTime = Date.now();
    const duration = endTime - startTime;

    setResult(data);
    setLoading(false);
    
    const isCached = data.includes('(Cached)');
    setSource(isCached ? 'cache' : 'server');
    addLog(`Received: ${data} (${duration}ms)`);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleClearCache = () => {
    proxy.clearCache();
    addLog('Cache cleared.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>API Data Fetcher</h3>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputGroup}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter query (e.g., 'users')"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading || !query.trim()}>
            {loading ? 'Fetching...' : 'Fetch Data'}
          </button>
        </form>
        
        <button onClick={handleClearCache} className={styles.clearBtn}>
          <RefreshCw size={16} /> Clear Cache
        </button>

        <div className={styles.info}>
          <p>Try searching for the same term twice to see the Proxy in action.</p>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.diagram}>
          <div className={`${styles.node} ${styles.client}`}>
            <span>Client</span>
          </div>
          
          <div className={styles.connection}>
            <div className={`${styles.line} ${loading ? styles.active : ''}`}></div>
          </div>

          <div className={`${styles.node} ${styles.proxy} ${source === 'cache' ? styles.highlight : ''}`}>
            <Shield size={32} />
            <span>Proxy (Cache)</span>
          </div>

          <div className={styles.connection}>
            <div className={`${styles.line} ${loading && source !== 'cache' ? styles.active : ''}`}></div>
          </div>

          <div className={`${styles.node} ${styles.server} ${source === 'server' ? styles.highlight : ''}`}>
            <Server size={32} />
            <span>Real Server</span>
          </div>
        </div>

        <div className={styles.resultArea}>
          <h4>Result:</h4>
          {loading ? (
            <div className={styles.loader}>
              <RefreshCw className={styles.spin} /> Processing...
            </div>
          ) : result ? (
            <div className={`${styles.resultBox} ${source === 'cache' ? styles.cached : styles.fetched}`}>
              {source === 'cache' ? <Clock size={20} /> : <Database size={20} />}
              <span>{result}</span>
            </div>
          ) : (
            <span className={styles.placeholder}>No data fetched yet</span>
          )}
        </div>

        <div className={styles.logs}>
          {logs.map((log, i) => (
            <div key={i} className={styles.logEntry}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
