import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Send } from 'lucide-react';
import styles from './Demo.module.css';

// Mediator Interface
interface ChatMediator {
  sendMessage(msg: string, user: ChatUser): void;
  addUser(user: ChatUser): void;
}

// Colleague
abstract class ChatUser {
  protected mediator: ChatMediator;
  public name: string;
  public messages: { sender: string, text: string }[] = [];

  constructor(mediator: ChatMediator, name: string) {
    this.mediator = mediator;
    this.name = name;
  }

  public abstract send(msg: string): void;
  public abstract receive(msg: string, sender: string): void;
}

// Concrete Mediator
class ChatRoom implements ChatMediator {
  private users: ChatUser[] = [];
  private logCallback: (log: string) => void;

  constructor(logCallback: (log: string) => void) {
    this.logCallback = logCallback;
  }

  public addUser(user: ChatUser): void {
    this.users.push(user);
    this.logCallback(`${user.name} joined the chat.`);
  }

  public sendMessage(msg: string, user: ChatUser): void {
    this.users.forEach(u => {
      // Message should not be received by the user sending it
      if (u !== user) {
        u.receive(msg, user.name);
      }
    });
    this.logCallback(`${user.name} says: "${msg}"`);
  }
}

// Concrete Colleague
class ConcreteUser extends ChatUser {
  private updateCallback: () => void;

  constructor(mediator: ChatMediator, name: string, updateCallback: () => void) {
    super(mediator, name);
    this.updateCallback = updateCallback;
  }

  public send(msg: string): void {
    // console.log(`${this.name} sends: ${msg}`);
    this.mediator.sendMessage(msg, this);
    this.messages.push({ sender: 'Me', text: msg });
    this.updateCallback();
  }

  public receive(msg: string, sender: string): void {
    // console.log(`${this.name} received: ${msg}`);
    this.messages.push({ sender: sender, text: msg });
    this.updateCallback();
  }
}

export const MediatorDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [, setTick] = useState(0); // Force update
  
  // We need to keep references to users and mediator
  // In a real app, this would be managed differently, but for this demo we need to bridge classes and React state
  const [chatRoom] = useState(() => new ChatRoom((log) => setLogs(prev => [log, ...prev])));
  
  const forceUpdate = () => setTick(t => t + 1);

  const [users] = useState(() => [
    new ConcreteUser(chatRoom, 'Alice', forceUpdate),
    new ConcreteUser(chatRoom, 'Bob', forceUpdate),
    new ConcreteUser(chatRoom, 'Charlie', forceUpdate)
  ]);

  useEffect(() => {
    users.forEach(u => chatRoom.addUser(u));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    'Alice': '',
    'Bob': '',
    'Charlie': ''
  });

  const handleSend = (user: ConcreteUser) => {
    const msg = inputs[user.name];
    if (msg && msg.trim()) {
      user.send(msg);
      setInputs(prev => ({ ...prev, [user.name]: '' }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatGrid}>
        {users.map((user) => (
          <div key={user.name} className={styles.userPanel}>
            <div className={styles.userHeader}>
              <User size={20} />
              <span>{user.name}</span>
            </div>
            
            <div className={styles.messageList}>
              {user.messages.length === 0 && <span className={styles.empty}>No messages</span>}
              {user.messages.map((m, i) => (
                <div key={i} className={`${styles.message} ${m.sender === 'Me' ? styles.sent : styles.received}`}>
                  <span className={styles.sender}>{m.sender}:</span> {m.text}
                </div>
              ))}
            </div>

            <div className={styles.inputArea}>
              <input
                type="text"
                value={inputs[user.name]}
                onChange={(e) => setInputs(prev => ({ ...prev, [user.name]: e.target.value }))}
                placeholder="Type a message..."
                className={styles.input}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(user as ConcreteUser)}
              />
              <button onClick={() => handleSend(user as ConcreteUser)} className={styles.sendBtn}>
                <Send size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.logPanel}>
        <div className={styles.logHeader}>
          <MessageSquare size={18} />
          <span>Mediator Logs (Chat Room)</span>
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
