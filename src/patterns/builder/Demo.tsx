import React, { useState } from 'react';
import { Bot, Cpu, Zap, Shield } from 'lucide-react';
import styles from './Demo.module.css';

// Product
interface Robot {
  head: string;
  body: string;
  arms: string;
  legs: string;
}

// Builder Interface
interface RobotBuilder {
  reset(): void;
  buildHead(type: string): void;
  buildBody(type: string): void;
  buildArms(type: string): void;
  buildLegs(type: string): void;
  getResult(): Robot;
}

// Concrete Builder
class ConcreteRobotBuilder implements RobotBuilder {
  private robot: Robot;

  constructor() {
    this.robot = this.createEmptyRobot();
  }

  private createEmptyRobot(): Robot {
    return { head: 'none', body: 'none', arms: 'none', legs: 'none' };
  }

  public reset(): void {
    this.robot = this.createEmptyRobot();
  }

  public buildHead(type: string): void {
    this.robot.head = type;
  }

  public buildBody(type: string): void {
    this.robot.body = type;
  }

  public buildArms(type: string): void {
    this.robot.arms = type;
  }

  public buildLegs(type: string): void {
    this.robot.legs = type;
  }

  public getResult(): Robot {
    const result = this.robot;
    this.reset();
    return result;
  }
}

export const BuilderDemo: React.FC = () => {
  const [builder] = useState(new ConcreteRobotBuilder());
  const [currentRobot, setCurrentRobot] = useState<Robot>({ head: 'none', body: 'none', arms: 'none', legs: 'none' });
  const [builtRobots, setBuiltRobots] = useState<Robot[]>([]);

  const updatePart = (part: keyof Robot, type: string) => {
    // In a real app, we'd call builder methods here, but for React state we simulate it
    // to show the "building" process visually before "getResult"
    setCurrentRobot(prev => ({ ...prev, [part]: type }));
  };

  const handleBuild = () => {
    // Actually use the builder pattern logic
    builder.reset();
    if (currentRobot.head !== 'none') builder.buildHead(currentRobot.head);
    if (currentRobot.body !== 'none') builder.buildBody(currentRobot.body);
    if (currentRobot.arms !== 'none') builder.buildArms(currentRobot.arms);
    if (currentRobot.legs !== 'none') builder.buildLegs(currentRobot.legs);
    
    const robot = builder.getResult();
    setBuiltRobots([...builtRobots, robot]);
    setCurrentRobot({ head: 'none', body: 'none', arms: 'none', legs: 'none' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.builder}>
        <h3>Robot Configuration</h3>
        
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label><Bot size={16} /> Head</label>
            <div className={styles.options}>
              {['Classic', 'Smart', 'Cyclops'].map(type => (
                <button 
                  key={type}
                  className={`${styles.optionBtn} ${currentRobot.head === type ? styles.active : ''}`}
                  onClick={() => updatePart('head', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label><Shield size={16} /> Body</label>
            <div className={styles.options}>
              {['Steel', 'Carbon', 'Gold'].map(type => (
                <button 
                  key={type}
                  className={`${styles.optionBtn} ${currentRobot.body === type ? styles.active : ''}`}
                  onClick={() => updatePart('body', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label><Zap size={16} /> Arms</label>
            <div className={styles.options}>
              {['Claws', 'Lasers', 'Drills'].map(type => (
                <button 
                  key={type}
                  className={`${styles.optionBtn} ${currentRobot.arms === type ? styles.active : ''}`}
                  onClick={() => updatePart('arms', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label><Cpu size={16} /> Legs</label>
            <div className={styles.options}>
              {['Wheels', 'Tracks', 'Legs'].map(type => (
                <button 
                  key={type}
                  className={`${styles.optionBtn} ${currentRobot.legs === type ? styles.active : ''}`}
                  onClick={() => updatePart('legs', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className={styles.buildBtn} onClick={handleBuild}>
          Construct Robot
        </button>
      </div>

      <div className={styles.preview}>
        <h3>Assembly Line</h3>
        <div className={styles.robotList}>
          {/* Current Robot Preview */}
          <div className={`${styles.robotCard} ${styles.previewCard}`}>
            <div className={styles.robotVisual}>
              <div className={`${styles.part} ${styles.head} ${styles[currentRobot.head.toLowerCase()]}`}></div>
              <div className={`${styles.part} ${styles.body} ${styles[currentRobot.body.toLowerCase()]}`}></div>
              <div className={`${styles.part} ${styles.arms} ${styles[currentRobot.arms.toLowerCase()]}`}></div>
              <div className={`${styles.part} ${styles.legs} ${styles[currentRobot.legs.toLowerCase()]}`}></div>
            </div>
            <span>In Progress</span>
          </div>

          {/* Built Robots */}
          {builtRobots.map((robot, i) => (
            <div key={i} className={styles.robotCard}>
              <div className={styles.robotVisual}>
                <div className={`${styles.part} ${styles.head} ${styles[robot.head.toLowerCase()]}`}></div>
                <div className={`${styles.part} ${styles.body} ${styles[robot.body.toLowerCase()]}`}></div>
                <div className={`${styles.part} ${styles.arms} ${styles[robot.arms.toLowerCase()]}`}></div>
                <div className={`${styles.part} ${styles.legs} ${styles[robot.legs.toLowerCase()]}`}></div>
              </div>
              <span>Robot #{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
