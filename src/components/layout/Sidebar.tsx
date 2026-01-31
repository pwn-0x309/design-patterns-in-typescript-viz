import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Box, 
  Layers, 
  LayoutTemplate, 
  Activity 
} from 'lucide-react';
import { PatternPreview } from '../ui/PatternPreview';
import { usePatternPrefetch } from '../../hooks/usePatternPrefetch';
import styles from './Sidebar.module.css';

const patterns = [
  {
    category: 'Creational',
    icon: <Box size={18} />,
    items: [
      { name: 'Singleton', path: '/patterns/singleton', id: 'singleton' },
      { name: 'Prototype', path: '/patterns/prototype', id: 'prototype' },
      { name: 'Builder', path: '/patterns/builder', id: 'builder' },
      { name: 'Factory Method', path: '/patterns/factory-method', id: 'factory-method' },
      { name: 'Abstract Factory', path: '/patterns/abstract-factory', id: 'abstract-factory' },
    ]
  },
  {
    category: 'Structural',
    icon: <LayoutTemplate size={18} />,
    items: [
      { name: 'Adapter', path: '/patterns/adapter', id: 'adapter' },
      { name: 'Bridge', path: '/patterns/bridge', id: 'bridge' },
      { name: 'Composite', path: '/patterns/composite', id: 'composite' },
      { name: 'Decorator', path: '/patterns/decorator', id: 'decorator' },
      { name: 'Facade', path: '/patterns/facade', id: 'facade' },
      { name: 'Flyweight', path: '/patterns/flyweight', id: 'flyweight' },
      { name: 'Proxy', path: '/patterns/proxy', id: 'proxy' },
    ]
  },
  {
    category: 'Behavioral',
    icon: <Activity size={18} />,
    items: [
      { name: 'Chain of Resp.', path: '/patterns/chain-of-responsibility', id: 'chain-of-responsibility' },
      { name: 'Command', path: '/patterns/command', id: 'command' },
      { name: 'Interpreter', path: '/patterns/interpreter', id: 'interpreter' },
      { name: 'Iterator', path: '/patterns/iterator', id: 'iterator' },
      { name: 'Mediator', path: '/patterns/mediator', id: 'mediator' },
      { name: 'Memento', path: '/patterns/memento', id: 'memento' },
      { name: 'Observer', path: '/patterns/observer', id: 'observer' },
      { name: 'State', path: '/patterns/state', id: 'state' },
      { name: 'Strategy', path: '/patterns/strategy', id: 'strategy' },
      { name: 'Template Method', path: '/patterns/template-method', id: 'template-method' },
      { name: 'Visitor', path: '/patterns/visitor', id: 'visitor' },
    ]
  }
];

export const Sidebar: React.FC = () => {
  const [hoveredPattern, setHoveredPattern] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { prefetchPattern, cancelPrefetch } = usePatternPrefetch();

  const handleMouseEnter = (patternId: string, event: React.MouseEvent) => {
    setHoveredPattern(patternId);
    setMousePosition({ x: event.clientX, y: event.clientY });
    prefetchPattern(patternId);
  };

  const handleMouseLeave = (patternId: string) => {
    setHoveredPattern(null);
    cancelPrefetch(patternId);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <Layers className={styles.logo} size={24} />
          <span className={styles.title}>Design Patterns</span>
        </div>
        
        <nav className={styles.nav}>
          {patterns.map((group) => (
            <div key={group.category} className={styles.group}>
              <div className={styles.groupTitle}>
                {group.icon}
                <span>{group.category}</span>
              </div>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `${styles.link} ${isActive ? styles.active : ''}`
                      }
                      onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
                      onMouseMove={handleMouseMove}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <PatternPreview
        patternId={hoveredPattern}
        position={mousePosition}
        isVisible={hoveredPattern !== null}
      />
    </>
  );
};
