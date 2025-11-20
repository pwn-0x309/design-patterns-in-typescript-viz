import React, { useState } from 'react';
import { Lightbulb, Thermometer, RotateCcw, Power, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './Demo.module.css';

// Command Interface
interface Command {
  execute(): void;
  undo(): void;
  getName(): string;
}

// Receiver
class SmartLight {
  public isOn = false;
  public intensity = 0;

  public on() {
    this.isOn = true;
    this.intensity = 100;
    return "Light is ON";
  }

  public off() {
    this.isOn = false;
    this.intensity = 0;
    return "Light is OFF";
  }
}

// Receiver
class Thermostat {
  public temperature = 22;

  public setTemperature(temp: number) {
    this.temperature = temp;
    return `Thermostat set to ${temp}°C`;
  }
}

// Concrete Commands
class LightOnCommand implements Command {
  constructor(private light: SmartLight) {}

  public execute() {
    this.light.on();
  }

  public undo() {
    this.light.off();
  }

  public getName() { return "Turn Light On"; }
}

class LightOffCommand implements Command {
  constructor(private light: SmartLight) {}

  public execute() {
    this.light.off();
  }

  public undo() {
    this.light.on();
  }

  public getName() { return "Turn Light Off"; }
}

class SetTempCommand implements Command {
  private prevTemp: number;

  constructor(private thermostat: Thermostat, private newTemp: number) {
    this.prevTemp = thermostat.temperature;
  }

  public execute() {
    this.prevTemp = this.thermostat.temperature;
    this.thermostat.setTemperature(this.newTemp);
  }

  public undo() {
    this.thermostat.setTemperature(this.prevTemp);
  }

  public getName() { return `Set Temp to ${this.newTemp}°C`; }
}

// Invoker
class RemoteControl {
  private history: Command[] = [];

  public executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
  }

  public undoLastCommand(): Command | null {
    const command = this.history.pop();
    if (command) {
      command.undo();
      return command;
    }
    return null;
  }

  public getHistory() {
    return this.history;
  }
}

export const CommandDemo: React.FC = () => {
  // We need state to trigger re-renders, even though the logic is in the classes
  const [light] = useState(new SmartLight());
  const [thermostat] = useState(new Thermostat());
  const [remote] = useState(new RemoteControl());
  const [logs, setLogs] = useState<string[]>([]);
  const [, setTick] = useState(0); // Force update

  const forceUpdate = () => setTick(t => t + 1);

  const execute = (command: Command) => {
    remote.executeCommand(command);
    setLogs(prev => [`Executed: ${command.getName()}`, ...prev]);
    forceUpdate();
  };

  const undo = () => {
    const command = remote.undoLastCommand();
    if (command) {
      setLogs(prev => [`Undid: ${command.getName()}`, ...prev]);
      forceUpdate();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Smart Remote</h3>
        
        <div className={styles.controlGroup}>
          <h4>Lighting</h4>
          <div className={styles.btnGroup}>
            <button 
              className={`${styles.btn} ${light.isOn ? styles.active : ''}`}
              onClick={() => execute(new LightOnCommand(light))}
              disabled={light.isOn}
            >
              <Power size={16} /> On
            </button>
            <button 
              className={`${styles.btn} ${!light.isOn ? styles.active : ''}`}
              onClick={() => execute(new LightOffCommand(light))}
              disabled={!light.isOn}
            >
              <Power size={16} /> Off
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <h4>Thermostat</h4>
          <div className={styles.btnGroup}>
            <button 
              className={styles.btn}
              onClick={() => execute(new SetTempCommand(thermostat, thermostat.temperature + 1))}
            >
              <ArrowUp size={16} /> +1°C
            </button>
            <button 
              className={styles.btn}
              onClick={() => execute(new SetTempCommand(thermostat, thermostat.temperature - 1))}
            >
              <ArrowDown size={16} /> -1°C
            </button>
          </div>
        </div>

        <div className={styles.undoSection}>
          <button 
            className={styles.undoBtn} 
            onClick={undo}
            disabled={remote.getHistory().length === 0}
          >
            <RotateCcw size={16} /> Undo Last Action
          </button>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.devices}>
          <div className={`${styles.device} ${light.isOn ? styles.lightOn : ''}`}>
            <Lightbulb size={48} />
            <span>Smart Light</span>
            <span className={styles.status}>{light.isOn ? 'ON' : 'OFF'}</span>
          </div>

          <div className={styles.device}>
            <Thermometer size={48} className={styles.thermometer} />
            <span>Thermostat</span>
            <span className={styles.status}>{thermostat.temperature}°C</span>
          </div>
        </div>

        <div className={styles.history}>
          <h4>Command History</h4>
          <div className={styles.logList}>
            {logs.length === 0 && <span className={styles.empty}>No commands executed yet.</span>}
            {logs.map((log, i) => (
              <div key={i} className={styles.logEntry}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
