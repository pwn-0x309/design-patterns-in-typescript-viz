import React, { useState } from 'react';
import { Circle, Square, ArrowRight, Check, X } from 'lucide-react';
import styles from './Demo.module.css';

// Target Interface
interface RoundHole {
  getRadius(): number;
  fits(peg: RoundPeg): boolean;
}

// Compatible Interface
interface RoundPeg {
  getRadius(): number;
}

// Incompatible Interface
class SquarePeg {
  constructor(private width: number) {}

  public getWidth(): number {
    return this.width;
  }
}

// Adapter
class SquarePegAdapter implements RoundPeg {
  constructor(private peg: SquarePeg) {}

  public getRadius(): number {
    // The adapter pretends that it's a round peg with a radius 
    // that could fit the square peg that the adapter actually holds.
    return (this.peg.getWidth() * Math.sqrt(2)) / 2;
  }
}

// Client Code (The Hole)
class ConcreteRoundHole implements RoundHole {
  constructor(private radius: number) {}

  public getRadius(): number {
    return this.radius;
  }

  public fits(peg: RoundPeg): boolean {
    return this.getRadius() >= peg.getRadius();
  }
}

export const AdapterDemo: React.FC = () => {
  const [holeRadius, setHoleRadius] = useState(5);
  const [pegWidth, setPegWidth] = useState(5);
  const [useAdapter, setUseAdapter] = useState(false);
  
  const hole = new ConcreteRoundHole(holeRadius);
  const squarePeg = new SquarePeg(pegWidth);
  const adapter = new SquarePegAdapter(squarePeg);

  const fits = useAdapter 
    ? hole.fits(adapter) 
    : false; // Without adapter, it conceptually "doesn't fit" or type error in real code

  // Calculate visual sizes (scaled up for display)
  const scale = 20;
  const holeSize = holeRadius * 2 * scale;
  const pegSize = pegWidth * scale;
  const minPegDiagonal = (pegWidth * Math.sqrt(2));

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Hole Radius: {holeRadius}</label>
          <input 
            type="range" 
            min="2" 
            max="10" 
            value={holeRadius} 
            onChange={(e) => setHoleRadius(Number(e.target.value))} 
          />
        </div>
        <div className={styles.controlGroup}>
          <label>Square Peg Width: {pegWidth}</label>
          <input 
            type="range" 
            min="2" 
            max="10" 
            value={pegWidth} 
            onChange={(e) => setPegWidth(Number(e.target.value))} 
          />
        </div>
        <div className={styles.toggleGroup}>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={useAdapter} 
              onChange={(e) => setUseAdapter(e.target.checked)} 
            />
            Use Adapter
          </label>
        </div>
      </div>

      <div className={styles.visualization}>
        <div className={styles.holeContainer}>
          <div 
            className={styles.hole} 
            style={{ width: holeSize, height: holeSize }}
          >
            <span className={styles.label}>Hole (r={holeRadius})</span>
          </div>
        </div>

        <div className={styles.arrow}>
          <ArrowRight size={32} />
          <div className={styles.status}>
            {!useAdapter ? (
              <span className={styles.error}><X size={16} /> Incompatible</span>
            ) : fits ? (
              <span className={styles.success}><Check size={16} /> Fits</span>
            ) : (
              <span className={styles.error}><X size={16} /> Too Big</span>
            )}
          </div>
        </div>

        <div className={styles.pegContainer}>
          {useAdapter && (
            <div 
              className={styles.adapterRing}
              style={{ 
                width: minPegDiagonal * scale, 
                height: minPegDiagonal * scale 
              }}
            >
              <span className={styles.adapterLabel}>Adapter</span>
            </div>
          )}
          <div 
            className={styles.squarePeg}
            style={{ width: pegSize, height: pegSize }}
          >
            <span className={styles.label}>Peg (w={pegWidth})</span>
          </div>
        </div>
      </div>
      
      <div className={styles.explanation}>
        {!useAdapter ? (
          <p>The Square Peg cannot directly interact with the Round Hole interface.</p>
        ) : (
          <p>
            The Adapter calculates the minimum circle radius needed to fit the square ({minPegDiagonal.toFixed(2)}). 
            {fits ? " It fits inside the hole!" : " Even with the adapter, it's too large for the hole."}
          </p>
        )}
      </div>
    </div>
  );
};
