import React, { useState } from 'react';
import { SkipBack, Play, Pause, Disc } from 'lucide-react';
import styles from './Demo.module.css';

// Iterator Interface
interface Iterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

// Aggregator Interface
interface Aggregator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getIterator(): Iterator<any>;
}

// Concrete Iterator
class PlaylistIterator implements Iterator<Song> {
  private collection: Playlist;
  private position: number = 0;
  private reverse: boolean = false;

  constructor(collection: Playlist, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public current(): Song {
    return this.collection.getItems()[this.position];
  }

  public next(): Song {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public key(): number {
    return this.position;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }
    return this.position < this.collection.getCount();
  }

  public rewind(): void {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }
}

// Concrete Collection
class Playlist implements Aggregator {
  private items: Song[] = [];

  public getItems(): Song[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: Song): void {
    this.items.push(item);
  }

  public getIterator(): Iterator<Song> {
    return new PlaylistIterator(this);
  }

  public getReverseIterator(): Iterator<Song> {
    return new PlaylistIterator(this, true);
  }
}

interface Song {
  title: string;
  artist: string;
  duration: string;
}

export const IteratorDemo: React.FC = () => {
  const [playlist] = useState(() => {
    const pl = new Playlist();
    pl.addItem({ title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" });
    pl.addItem({ title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02" });
    pl.addItem({ title: "Hotel California", artist: "Eagles", duration: "6:30" });
    pl.addItem({ title: "Imagine", artist: "John Lennon", duration: "3:01" });
    pl.addItem({ title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01" });
    return pl;
  });

  const [iterator, setIterator] = useState<Iterator<Song>>(() => playlist.getIterator());
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const handleNext = () => {
    if (iterator.valid()) {
      setCurrentSong(iterator.next());
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentSong(null);
      // Reset for loop effect or stop
      iterator.rewind();
    }
  };

  const toggleReverse = () => {
    const newReverse = !isReverse;
    setIsReverse(newReverse);
    setIterator(newReverse ? playlist.getReverseIterator() : playlist.getIterator());
    setCurrentSong(null);
    setIsPlaying(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Music Player</h3>
        
        <div className={styles.playerControls}>
          <div className={styles.mainControls}>
            <button className={styles.controlBtn} onClick={toggleReverse} title={isReverse ? "Normal Order" : "Reverse Order"}>
              <RotateCcw size={20} className={isReverse ? styles.activeIcon : ''} />
            </button>
            <button className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`} onClick={handleNext}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className={styles.controlBtn} onClick={() => iterator.rewind()} title="Reset Playlist">
              <SkipBack size={20} />
            </button>
          </div>
          <p className={styles.status}>
            Mode: {isReverse ? 'Reverse Iterator' : 'Standard Iterator'}
          </p>
        </div>

        <div className={styles.nowPlaying}>
          {currentSong ? (
            <>
              <div className={`${styles.albumArt} ${isPlaying ? styles.spinning : ''}`}>
                <Disc size={40} />
              </div>
              <div className={styles.songInfo}>
                <div className={styles.songTitle}>{currentSong.title}</div>
                <div className={styles.songArtist}>{currentSong.artist}</div>
              </div>
            </>
          ) : (
            <div className={styles.placeholder}>Press Play to start</div>
          )}
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.playlist}>
          {playlist.getItems().map((song, index) => (
            <div 
              key={index} 
              className={`${styles.track} ${currentSong === song ? styles.activeTrack : ''}`}
            >
              <span className={styles.trackNum}>{index + 1}</span>
              <div className={styles.trackInfo}>
                <span className={styles.trackTitle}>{song.title}</span>
                <span className={styles.trackArtist}>{song.artist}</span>
              </div>
              <span className={styles.trackDuration}>{song.duration}</span>
              {currentSong === song && <div className={styles.equalizer}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for the icon
const RotateCcw = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
