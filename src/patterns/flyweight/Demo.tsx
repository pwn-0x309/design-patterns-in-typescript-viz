import React, { useState, useEffect, useRef } from 'react';
import { Trees } from 'lucide-react';
import styles from './Demo.module.css';

// Flyweight
class TreeType {
  // @ts-expect-error Intrinsic state reserved for pattern demonstration
  private _name: string;
  private color: string;
  // @ts-expect-error Intrinsic state reserved for pattern demonstration
  private _texture: string;

  constructor(
    name: string,
    color: string,
    texture: string
  ) {
    this._name = name;
    this.color = color;
    this._texture = texture;
  }

  public draw(canvas: CanvasRenderingContext2D, x: number, y: number) {
    canvas.fillStyle = this.color;
    // Simple tree representation: Triangle for leaves, Rect for trunk
    
    // Trunk
    canvas.fillStyle = '#8B4513';
    canvas.fillRect(x - 2, y, 4, 10);

    // Leaves
    canvas.fillStyle = this.color;
    canvas.beginPath();
    canvas.moveTo(x, y - 20);
    canvas.lineTo(x - 10, y);
    canvas.lineTo(x + 10, y);
    canvas.fill();
  }
}

// Flyweight Factory
class TreeFactory {
  static treeTypes: { [key: string]: TreeType } = {};

  static getTreeType(name: string, color: string, texture: string) {
    const key = `${name}_${color}_${texture}`;
    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(name, color, texture);
    }
    return this.treeTypes[key];
  }
}

// Context
class Tree {
  private x: number;
  private y: number;
  private type: TreeType;

  constructor(
    x: number,
    y: number,
    type: TreeType
  ) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  public draw(canvas: CanvasRenderingContext2D) {
    this.type.draw(canvas, this.x, this.y);
  }
}

// Client
class Forest {
  private trees: Tree[] = [];

  public plantTree(x: number, y: number, name: string, color: string, texture: string) {
    const type = TreeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  public draw(canvas: CanvasRenderingContext2D) {
    this.trees.forEach(tree => tree.draw(canvas));
  }

  public getTreeCount() {
    return this.trees.length;
  }
}

export const FlyweightDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [treeCount, setTreeCount] = useState(0);
  const [memorySaved, setMemorySaved] = useState(0);
  
  const forest = useRef(new Forest());

  const plantForest = (count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear previous trees
    forest.current = new Forest(); // Reset forest
    ctx.clearRect(0, 0, width, height);

    const types = [
      { name: 'Oak', color: '#228B22', texture: 'Rough' },
      { name: 'Pine', color: '#006400', texture: 'Smooth' },
      { name: 'Birch', color: '#9ACD32', texture: 'Striped' },
    ];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      forest.current.plantTree(
        Math.random() * width,
        Math.random() * height,
        type.name,
        type.color,
        type.texture
      );
    }

    forest.current.draw(ctx);
    setTreeCount(count);
    
    // Rough estimation: 
    // Without Flyweight: (20 bytes coords + 100 bytes type data) * count
    // With Flyweight: (20 bytes coords * count) + (100 bytes type data * 3 types)
    const sizeWithout = (20 + 100) * count;
    const sizeWith = (20 * count) + (100 * 3);
    setMemorySaved(sizeWithout - sizeWith);
  };

  useEffect(() => {
    // eslint-disable-next-line
    plantForest(100);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Forest Generator</h3>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Trees Planted</span>
            <span className={styles.statValue}>{treeCount.toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Flyweight Objects</span>
            <span className={styles.statValue}>3</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Memory Saved (est)</span>
            <span className={styles.statValue}>{(memorySaved / 1024).toFixed(2)} KB</span>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.btn} onClick={() => plantForest(100)}>
            Plant 100 Trees
          </button>
          <button className={styles.btn} onClick={() => plantForest(1000)}>
            Plant 1,000 Trees
          </button>
          <button className={styles.btn} onClick={() => plantForest(10000)}>
            Plant 10,000 Trees
          </button>
        </div>
      </div>

      <div className={styles.canvasContainer}>
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400} 
          className={styles.canvas}
        />
        <div className={styles.overlay}>
          <Trees size={24} />
          <span>Canvas Rendering</span>
        </div>
      </div>
    </div>
  );
};
