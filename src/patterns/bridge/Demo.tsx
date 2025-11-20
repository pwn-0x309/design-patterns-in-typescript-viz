import React, { useState } from 'react';
import { Tv, Radio, Power, Volume2, Volume1, VolumeX } from 'lucide-react';
import styles from './Demo.module.css';

// Implementation Interface
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getName(): string;
  render(): React.ReactNode;
}

// Concrete Implementations
class TV implements Device {
  private on = false;
  private volume = 30;

  public isEnabled() { return this.on; }
  public enable() { this.on = true; }
  public disable() { this.on = false; }
  public getVolume() { return this.volume; }
  public setVolume(percent: number) { this.volume = Math.max(0, Math.min(100, percent)); }
  public getName() { return "Living Room TV"; }
  
  public render() {
    return (
      <div className={`${styles.device} ${this.on ? styles.on : styles.off}`}>
        <Tv size={48} />
        <div className={styles.screen}>
          {this.on ? (
            <>
              <span className={styles.channel}>CH 1</span>
              <div className={styles.volumeBar}>
                <div className={styles.volumeLevel} style={{ width: `${this.volume}%` }}></div>
              </div>
            </>
          ) : (
            <span className={styles.offText}>OFF</span>
          )}
        </div>
      </div>
    );
  }
}

class RadioDevice implements Device {
  private on = false;
  private volume = 20;

  public isEnabled() { return this.on; }
  public enable() { this.on = true; }
  public disable() { this.on = false; }
  public getVolume() { return this.volume; }
  public setVolume(percent: number) { this.volume = Math.max(0, Math.min(100, percent)); }
  public getName() { return "Kitchen Radio"; }

  public render() {
    return (
      <div className={`${styles.device} ${styles.radio} ${this.on ? styles.on : styles.off}`}>
        <Radio size={48} />
        <div className={styles.display}>
          {this.on ? (
            <>
              <span className={styles.frequency}>104.5 FM</span>
              <div className={styles.volumeBar}>
                <div className={styles.volumeLevel} style={{ width: `${this.volume}%` }}></div>
              </div>
            </>
          ) : (
            <span className={styles.offText}>OFF</span>
          )}
        </div>
      </div>
    );
  }
}

// Abstraction
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  public volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  public volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10);
  }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
  public mute() {
    this.device.setVolume(0);
  }
}

export const BridgeDemo: React.FC = () => {
  // We use state to force re-renders since the class instances mutate their own state
  const [tv] = useState(new TV());
  const [radio] = useState(new RadioDevice());
  const [selectedDevice, setSelectedDevice] = useState<Device>(tv);
  const [remoteType, setRemoteType] = useState<'basic' | 'advanced'>('basic');
  const [, setTick] = useState(0); // Force update

  const forceUpdate = () => setTick(t => t + 1);

  const remote = remoteType === 'basic' 
    ? new RemoteControl(selectedDevice) 
    : new AdvancedRemoteControl(selectedDevice);

  const handlePower = () => {
    remote.togglePower();
    forceUpdate();
  };

  const handleVolUp = () => {
    remote.volumeUp();
    forceUpdate();
  };

  const handleVolDown = () => {
    remote.volumeDown();
    forceUpdate();
  };

  const handleMute = () => {
    if (remote instanceof AdvancedRemoteControl) {
      remote.mute();
      forceUpdate();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.config}>
        <div className={styles.configGroup}>
          <h3>Select Device (Implementation)</h3>
          <div className={styles.toggles}>
            <button 
              className={`${styles.toggle} ${selectedDevice === tv ? styles.active : ''}`}
              onClick={() => setSelectedDevice(tv)}
            >
              <Tv size={16} /> TV
            </button>
            <button 
              className={`${styles.toggle} ${selectedDevice === radio ? styles.active : ''}`}
              onClick={() => setSelectedDevice(radio)}
            >
              <Radio size={16} /> Radio
            </button>
          </div>
        </div>

        <div className={styles.configGroup}>
          <h3>Select Remote (Abstraction)</h3>
          <div className={styles.toggles}>
            <button 
              className={`${styles.toggle} ${remoteType === 'basic' ? styles.active : ''}`}
              onClick={() => setRemoteType('basic')}
            >
              Basic Remote
            </button>
            <button 
              className={`${styles.toggle} ${remoteType === 'advanced' ? styles.active : ''}`}
              onClick={() => setRemoteType('advanced')}
            >
              Advanced Remote
            </button>
          </div>
        </div>
      </div>

      <div className={styles.scene}>
        <div className={styles.deviceContainer}>
          {selectedDevice.render()}
        </div>

        <div className={styles.remote}>
          <div className={styles.remoteHeader}>
            <span>{remoteType === 'basic' ? 'Basic' : 'Advanced'}</span>
            <div className={styles.irBlaster}></div>
          </div>
          
          <button className={styles.powerBtn} onClick={handlePower}>
            <Power size={20} />
          </button>

          <div className={styles.volControls}>
            <button className={styles.volBtn} onClick={handleVolDown}>
              <Volume1 size={20} />
            </button>
            <div className={styles.volLabel}>VOL</div>
            <button className={styles.volBtn} onClick={handleVolUp}>
              <Volume2 size={20} />
            </button>
          </div>

          {remoteType === 'advanced' && (
            <button className={styles.muteBtn} onClick={handleMute}>
              <VolumeX size={16} /> Mute
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
