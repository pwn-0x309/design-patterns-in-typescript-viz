import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Box, 
  Layers, 
  LayoutTemplate, 
  Activity 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const patterns = [
  {
    category: 'Creational',
    icon: <Box size={18} />,
    items: [
      { name: 'Singleton', path: '/patterns/singleton' },
      { name: 'Prototype', path: '/patterns/prototype' },
      { name: 'Builder', path: '/patterns/builder' },
      { name: 'Factory Method', path: '/patterns/factory-method' },
      { name: 'Abstract Factory', path: '/patterns/abstract-factory' },
    ]
  },
  {
    category: 'Structural',
    icon: <LayoutTemplate size={18} />,
    items: [
      { name: 'Adapter', path: '/patterns/adapter' },
      { name: 'Bridge', path: '/patterns/bridge' },
      { name: 'Composite', path: '/patterns/composite' },
      { name: 'Decorator', path: '/patterns/decorator' },
      { name: 'Facade', path: '/patterns/facade' },
      { name: 'Flyweight', path: '/patterns/flyweight' },
      { name: 'Proxy', path: '/patterns/proxy' },
    ]
  },
  {
    category: 'Behavioral',
    icon: <Activity size={18} />,
    items: [
      { name: 'Chain of Resp.', path: '/patterns/chain-of-responsibility' },
      { name: 'Command', path: '/patterns/command' },
      { name: 'Interpreter', path: '/patterns/interpreter' },
      { name: 'Iterator', path: '/patterns/iterator' },
      { name: 'Mediator', path: '/patterns/mediator' },
      { name: 'Memento', path: '/patterns/memento' },
      { name: 'Observer', path: '/patterns/observer' },
      { name: 'State', path: '/patterns/state' },
      { name: 'Strategy', path: '/patterns/strategy' },
      { name: 'Template Method', path: '/patterns/template-method' },
      { name: 'Visitor', path: '/patterns/visitor' },
    ]
  }
];

export const Sidebar: React.FC = () => {
  return (
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
  );
};
