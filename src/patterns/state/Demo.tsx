import React, { useState } from 'react';
import { Play, Pause, Lock, Unlock, SkipForward, SkipBack } from 'lucide-react';
import styles from './Demo.module.css';

// State Interface
abstract class State {
  protected player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  public abstract clickLock(): void;
  public abstract clickPlay(): void;
  public abstract clickNext(): void;
  public abstract clickPrev(): void;
  public abstract getName(): string;
}

// Context
class AudioPlayer {
  private state: State;
  private playing: boolean = false;
  private logCallback: (msg: string) => void;

  constructor(logCallback: (msg: string) => void) {
    this.logCallback = logCallback;
    this.state = new ReadyState(this);
  }

  public changeState(state: State) {
    this.state = state;
    this.logCallback(`State changed to: ${state.getName()}`);
  }

  public getState(): State {
    return this.state;
  }

  public setPlaying(playing: boolean) {
    this.playing = playing;
    this.logCallback(playing ? '▶️ Music started playing' : '⏸️ Music paused');
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public clickLock() {
    this.state.clickLock();
  }

  public clickPlay() {
    this.state.clickPlay();
  }

  public clickNext() {
    this.state.clickNext();
  }

  public clickPrev() {
    this.state.clickPrev();
  }

  public log(msg: string) {
    this.logCallback(msg);
  }
}

// Concrete States
class LockedState extends State {
  public clickLock(): void {
    if (this.player.isPlaying()) {
      this.player.changeState(new PlayingState(this.player));
    } else {
      this.player.changeState(new ReadyState(this.player));
    }
    this.player.log('🔓 Unlocked player');
  }

  public clickPlay(): void {
    this.player.log('🔒 Locked: Cannot play/pause');
  }

  public clickNext(): void {
    this.player.log('🔒 Locked: Cannot skip');
  }

  public clickPrev(): void {
    this.player.log('🔒 Locked: Cannot rewind');
  }

  public getName(): string {
    return 'Locked';
  }
}

class ReadyState extends State {
  public clickLock(): void {
    this.player.changeState(new LockedState(this.player));
    this.player.log('🔒 Locked player');
  }

  public clickPlay(): void {
    this.player.setPlaying(true);
    this.player.changeState(new PlayingState(this.player));
  }

  public clickNext(): void {
    this.player.log('⏭️ Next Song');
  }

  public clickPrev(): void {
    this.player.log('⏮️ Previous Song');
  }

  public getName(): string {
    return 'Ready (Paused)';
  }
}

class PlayingState extends State {
  public clickLock(): void {
    this.player.changeState(new LockedState(this.player));
    this.player.log('🔒 Locked player');
  }

  public clickPlay(): void {
    this.player.setPlaying(false);
    this.player.changeState(new ReadyState(this.player));
  }

  public clickNext(): void {
    this.player.log('⏭️ Next Song (while playing)');
  }

  public clickPrev(): void {
    this.player.log('⏮️ Previous Song (while playing)');
  }

  public getName(): string {
    return 'Playing';
  }
}

export const StateDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [, setTick] = useState(0); // Force update

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev]);

  const [player] = useState(() => new AudioPlayer(addLog));

  const forceUpdate = () => setTick(t => t + 1);

  const handleLock = () => {
    player.clickLock();
    forceUpdate();
  };

  const handlePlay = () => {
    player.clickPlay();
    forceUpdate();
  };

  const handleNext = () => {
    player.clickNext();
    forceUpdate();
  };

  const handlePrev = () => {
    player.clickPrev();
    forceUpdate();
  };

  const currentStateName = player.getState().getName();
  const isLocked = currentStateName === 'Locked';
  const isPlaying = player.isPlaying();

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <div className={styles.screen}>
          <div className={styles.statusIcon}>
            {isLocked ? <Lock size={48} /> : isPlaying ? <Play size={48} /> : <Pause size={48} />}
          </div>
          <div className={styles.statusText}>{currentStateName}</div>
        </div>

        <div className={styles.controls}>
          <button onClick={handleLock} className={`${styles.btn} ${isLocked ? styles.active : ''}`}>
            {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
          </button>
          <button onClick={handlePrev} className={styles.btn}>
            <SkipBack size={20} />
          </button>
          <button onClick={handlePlay} className={`${styles.btn} ${styles.playBtn}`}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={handleNext} className={styles.btn}>
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <div className={styles.logPanel}>
        <div className={styles.logHeader}>Event Log</div>
        <div className={styles.logs}>
          {logs.length === 0 && <span className={styles.empty}>Interact with the player...</span>}
          {logs.map((log, i) => (
            <div key={i} className={styles.logItem}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
