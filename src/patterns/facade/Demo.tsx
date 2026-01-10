import React, { useState } from 'react';
import { Tv, Speaker, Lightbulb, Play, Square } from 'lucide-react';
import styles from './Demo.module.css';

// Subsystem 1
class Amplifier {
  public on() { return "Amplifier on"; }
  public off() { return "Amplifier off"; }
  public setVolume(level: number) { return `Amplifier volume set to ${level}`; }
}

// Subsystem 2
class Tuner {
  public on() { return "Tuner on"; }
  public off() { return "Tuner off"; }
  public setFrequency(freq: number) { return `Tuner frequency set to ${freq}`; }
}

// Subsystem 3
class Projector {
  public on() { return "Projector on"; }
  public off() { return "Projector off"; }
  public wideScreenMode() { return "Projector in widescreen mode (16:9)"; }
}

// Subsystem 4
class Lights {
  public dim(level: number) { return `Lights dimmed to ${level}%`; }
  public on() { return "Lights on"; }
}

// Facade
class HomeTheaterFacade {
  private amp: Amplifier;
  private tuner: Tuner;
  private projector: Projector;
  private lights: Lights;

  constructor(
    amp: Amplifier,
    tuner: Tuner,
    projector: Projector,
    lights: Lights
  ) {
    this.amp = amp;
    this.tuner = tuner;
    this.projector = projector;
    this.lights = lights;
  }

  public watchMovie(movie: string): string[] {
    const logs = [];
    logs.push("Get ready to watch a movie...");
    logs.push(this.lights.dim(10));
    logs.push(this.projector.on());
    logs.push(this.projector.wideScreenMode());
    logs.push(this.amp.on());
    logs.push(this.amp.setVolume(5));
    logs.push(`Now playing "${movie}"`);
    return logs;
  }

  public endMovie(): string[] {
    const logs = [];
    logs.push("Shutting movie theater down...");
    logs.push(this.lights.on());
    logs.push(this.amp.off());
    logs.push(this.projector.off());
    logs.push(this.tuner.off());
    return logs;
  }
}

export const FacadeDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isOn, setIsOn] = useState(false);

  const amp = new Amplifier();
  const tuner = new Tuner();
  const projector = new Projector();
  const lights = new Lights();
  
  const homeTheater = new HomeTheaterFacade(amp, tuner, projector, lights);

  const handleWatch = () => {
    const newLogs = homeTheater.watchMovie("The Matrix");
    setLogs(newLogs);
    setIsOn(true);
  };

  const handleEnd = () => {
    const newLogs = homeTheater.endMovie();
    setLogs(newLogs);
    setIsOn(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Home Theater Controller</h3>
        <p className={styles.hint}>
          The Facade provides a simple interface to a complex subsystem.
        </p>
        <div className={styles.buttons}>
          <button 
            className={`${styles.btn} ${styles.watchBtn}`} 
            onClick={handleWatch}
            disabled={isOn}
          >
            <Play size={20} /> Watch Movie
          </button>
          <button 
            className={`${styles.btn} ${styles.endBtn}`} 
            onClick={handleEnd}
            disabled={!isOn}
          >
            <Square size={20} /> End Movie
          </button>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.devices}>
          <div className={`${styles.device} ${isOn ? styles.active : ''}`}>
            <Tv size={32} />
            <span>Projector</span>
          </div>
          <div className={`${styles.device} ${isOn ? styles.active : ''}`}>
            <Speaker size={32} />
            <span>Amplifier</span>
          </div>
          <div className={`${styles.device} ${isOn ? styles.dimmed : styles.active}`}>
            <Lightbulb size={32} />
            <span>Lights</span>
          </div>
        </div>

        <div className={styles.logWindow}>
          <div className={styles.logHeader}>System Logs</div>
          <div className={styles.logs}>
            {logs.length === 0 && <span className={styles.emptyLog}>System ready...</span>}
            {logs.map((log, index) => (
              <div key={index} className={styles.logEntry}>
                <span className={styles.timestamp}>[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
