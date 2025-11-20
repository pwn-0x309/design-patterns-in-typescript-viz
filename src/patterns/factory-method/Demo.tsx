import React, { useState } from 'react';
import { Truck, Ship, Package } from 'lucide-react';
import styles from './Demo.module.css';

// Product Interface
interface Transport {
  deliver(): React.ReactNode;
  type: string;
}

// Concrete Products
class TruckTransport implements Transport {
  public type = 'Truck';
  public deliver(): React.ReactNode {
    return (
      <div className={`${styles.transport} ${styles.truck}`}>
        <Truck size={24} />
        <span>Delivering by land</span>
      </div>
    );
  }
}

class ShipTransport implements Transport {
  public type = 'Ship';
  public deliver(): React.ReactNode {
    return (
      <div className={`${styles.transport} ${styles.ship}`}>
        <Ship size={24} />
        <span>Delivering by sea</span>
      </div>
    );
  }
}

// Creator
abstract class Logistics {
  public abstract createTransport(): Transport;

  public planDelivery(): React.ReactNode {
    const transport = this.createTransport();
    return (
      <div className={styles.deliveryPlan}>
        <div className={styles.planHeader}>
          <Package size={16} />
          <span>Delivery Plan Created</span>
        </div>
        {transport.deliver()}
      </div>
    );
  }
}

// Concrete Creators
class RoadLogistics extends Logistics {
  public createTransport(): Transport {
    return new TruckTransport();
  }
}

class SeaLogistics extends Logistics {
  public createTransport(): Transport {
    return new ShipTransport();
  }
}

export const FactoryMethodDemo: React.FC = () => {
  const [logisticsType, setLogisticsType] = useState<'road' | 'sea'>('road');
  const [deliveries, setDeliveries] = useState<React.ReactNode[]>([]);

  const handleCreate = () => {
    let logistics: Logistics;
    if (logisticsType === 'road') {
      logistics = new RoadLogistics();
    } else {
      logistics = new SeaLogistics();
    }
    setDeliveries([logistics.planDelivery(), ...deliveries]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h3>Logistics Management</h3>
        <div className={styles.typeSelector}>
          <button 
            className={`${styles.typeBtn} ${logisticsType === 'road' ? styles.active : ''}`}
            onClick={() => setLogisticsType('road')}
          >
            <Truck size={20} /> Road Logistics
          </button>
          <button 
            className={`${styles.typeBtn} ${logisticsType === 'sea' ? styles.active : ''}`}
            onClick={() => setLogisticsType('sea')}
          >
            <Ship size={20} /> Sea Logistics
          </button>
        </div>
        <button className={styles.createBtn} onClick={handleCreate}>
          Create Delivery Plan
        </button>
      </div>

      <div className={styles.feed}>
        <h3>Active Deliveries</h3>
        <div className={styles.deliveryList}>
          {deliveries.length === 0 && (
            <div className={styles.emptyState}>No deliveries planned yet.</div>
          )}
          {deliveries.map((delivery, index) => (
            <div key={index} className={styles.deliveryItem}>
              {delivery}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
