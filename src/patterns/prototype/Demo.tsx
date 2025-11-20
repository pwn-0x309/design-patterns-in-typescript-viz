import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import styles from './Demo.module.css';

// Prototype Interface
interface Shape {
  clone(): Shape;
  draw(): React.ReactNode;
  id: string;
  x: number;
  y: number;
  color: string;
}

// Concrete Prototype
class Circle implements Shape {
  public id: string;
  public x: number;
  public y: number;
  public color: string;
  public radius: number;

  constructor(source?: Circle) {
    if (source) {
      this.id = Math.random().toString(36).substr(2, 9);
      this.x = source.x + 20;
      this.y = source.y + 20;
      this.color = source.color;
      this.radius = source.radius;
    } else {
      this.id = Math.random().toString(36).substr(2, 9);
      this.x = 0;
      this.y = 0;
      this.color = '#3b82f6';
      this.radius = 40;
    }
  }

  public clone(): Shape {
    return new Circle(this);
  }

  public draw(): React.ReactNode {
    return (
      <div
        key={this.id}
        className={styles.shape}
        style={{
          width: this.radius * 2,
          height: this.radius * 2,
          backgroundColor: this.color,
          borderRadius: '50%',
          left: this.x,
          top: this.y,
        }}
      >
        <span className={styles.shapeId}>{this.id.substr(0, 4)}</span>
      </div>
    );
  }
}

export const PrototypeDemo: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([new Circle()]);
  const [selectedId, setSelectedId] = useState<string>(shapes[0].id);

  const handleClone = () => {
    const original = shapes.find(s => s.id === selectedId);
    if (original) {
      const clone = original.clone();
      setShapes([...shapes, clone]);
      setSelectedId(clone.id);
    }
  };

  const handleReset = () => {
    const initial = new Circle();
    setShapes([initial]);
    setSelectedId(initial.id);
  };

  const updateColor = (color: string) => {
    setShapes(shapes.map(s => {
      if (s.id === selectedId) {
        const newShape = Object.assign(Object.create(Object.getPrototypeOf(s)), s);
        newShape.color = color;
        return newShape;
      }
      return s;
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Selected Shape: {selectedId.substr(0, 4)}</label>
          <div className={styles.colorPicker}>
            {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(c => (
              <button
                key={c}
                className={styles.colorBtn}
                style={{ backgroundColor: c }}
                onClick={() => updateColor(c)}
              />
            ))}
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.btn} onClick={handleClone}>
            <Copy size={16} /> Clone
          </button>
          <button className={styles.btn} onClick={handleReset}>
            <RefreshCw size={16} /> Reset
          </button>
        </div>
      </div>

      <div className={styles.canvas}>
        {shapes.map(shape => (
          <div 
            key={shape.id} 
            onClick={() => setSelectedId(shape.id)}
            className={`${styles.shapeWrapper} ${selectedId === shape.id ? styles.selected : ''}`}
            style={{ transform: `translate(${shape.x}px, ${shape.y}px)` }}
          >
            {shape.draw()}
          </div>
        ))}
      </div>
    </div>
  );
};
