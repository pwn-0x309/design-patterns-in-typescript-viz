import React, { useState, useEffect } from 'react';
import { Bell, BellOff, User, Youtube, Mail } from 'lucide-react';
import styles from './Demo.module.css';

// Observer Interface
interface Observer {
  update(videoTitle: string): void;
  getName(): string;
}

// Subject Interface
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(videoTitle: string): void;
}

// Concrete Subject
class YoutubeChannel implements Subject {
  private observers: Observer[] = [];
  private logCallback: (log: string) => void;

  constructor(logCallback: (log: string) => void) {
    this.logCallback = logCallback;
  }

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }
    this.observers.push(observer);
    this.logCallback(`✅ ${observer.getName()} subscribed to the channel.`);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }
    this.observers.splice(observerIndex, 1);
    this.logCallback(`❌ ${observer.getName()} unsubscribed.`);
  }

  public notify(videoTitle: string): void {
    this.logCallback(`📢 Uploading new video: "${videoTitle}"...`);
    for (const observer of this.observers) {
      observer.update(videoTitle);
    }
  }

  public uploadVideo(title: string) {
    this.notify(title);
  }
}

// Concrete Observer
class Subscriber implements Observer {
  private name: string;
  private onNotification: (msg: string) => void;

  constructor(name: string, onNotification: (msg: string) => void) {
    this.name = name;
    this.onNotification = onNotification;
  }

  public update(videoTitle: string): void {
    this.onNotification(`🔔 ${this.name} received notification: New video "${videoTitle}" is out!`);
  }

  public getName(): string {
    return this.name;
  }
}

export const ObserverDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [, setTick] = useState(0); // Force update

  const addLog = (log: string) => setLogs(prev => [log, ...prev]);
  const addNotification = (note: string) => setNotifications(prev => [note, ...prev]);

  // Stable instances
  const [channel] = useState(() => new YoutubeChannel(addLog));
  const [subscribers] = useState(() => [
    new Subscriber('Alice', addNotification),
    new Subscriber('Bob', addNotification),
    new Subscriber('Charlie', addNotification)
  ]);
  
  const [subscriptionStatus, setSubscriptionStatus] = useState<boolean[]>([false, false, false]);

  const toggleSubscription = (index: number) => {
    const sub = subscribers[index];
    const isSubscribed = subscriptionStatus[index];
    
    if (isSubscribed) {
      channel.detach(sub);
    } else {
      channel.attach(sub);
    }

    const newStatus = [...subscriptionStatus];
    newStatus[index] = !isSubscribed;
    setSubscriptionStatus(newStatus);
  };

  const handleUpload = () => {
    const titles = [
      "Design Patterns in 10 Minutes",
      "Why React is Awesome",
      "TypeScript Tips & Tricks",
      "Understanding the Observer Pattern",
      "Coding ASMR"
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    channel.uploadVideo(randomTitle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Channel Dashboard</h3>
        <div className={styles.channelInfo}>
          <Youtube size={48} className={styles.ytIcon} />
          <div>
            <h4>TechExplained</h4>
            <span className={styles.subCount}>
              {subscriptionStatus.filter(Boolean).length} Subscribers
            </span>
          </div>
        </div>
        
        <button onClick={handleUpload} className={styles.uploadBtn}>
          Upload New Video
        </button>

        <div className={styles.subscriberList}>
          <h4>Manage Subscribers</h4>
          {subscribers.map((sub, i) => (
            <div key={i} className={styles.subItem}>
              <div className={styles.subName}>
                <User size={16} /> {sub.getName()}
              </div>
              <button 
                onClick={() => toggleSubscription(i)}
                className={`${styles.subBtn} ${subscriptionStatus[i] ? styles.subscribed : ''}`}
              >
                {subscriptionStatus[i] ? <BellOff size={16} /> : <Bell size={16} />}
                {subscriptionStatus[i] ? 'Unsubscribe' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Mail size={18} />
            <span>User Notifications</span>
          </div>
          <div className={styles.list}>
            {notifications.length === 0 && <span className={styles.empty}>No notifications yet</span>}
            {notifications.map((note, i) => (
              <div key={i} className={styles.notificationItem}>{note}</div>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>System Logs</span>
          </div>
          <div className={styles.list}>
            {logs.length === 0 && <span className={styles.empty}>System ready</span>}
            {logs.map((log, i) => (
              <div key={i} className={styles.logItem}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
