
export const factoryMethodCode = `interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  public deliver(): void {
    console.log('Delivering by land in a box.');
  }
}

class Ship implements Transport {
  public deliver(): void {
    console.log('Delivering by sea in a container.');
  }
}

abstract class Logistics {
  public abstract createTransport(): Transport;

  public planDelivery(): void {
    const transport = this.createTransport();
    transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  public createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  public createTransport(): Transport {
    return new Ship();
  }
}

// Usage
const logistics = new RoadLogistics();
logistics.planDelivery(); // Delivering by land...`;

export const factoryMethodExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're creating a logistics management application. The first version of your app can only handle transportation by trucks, so the bulk of your code lives inside the <code>Truck</code> class.
    </p>
    <p>
      Later, your app becomes popular. Each day you receive dozens of requests from sea transportation companies to incorporate sea logistics into the app. Great news, right? But how about the code? At present, most of your code is coupled to the <code>Truck</code> class. Adding <code>Ships</code> into the app would require making changes to the entire codebase.
    </p>

    <h3>Solution</h3>
    <p>
      The Factory Method pattern suggests that you replace direct object construction calls (using the <code>new</code> operator) with calls to a special <i>factory</i> method. The objects are still created via the <code>new</code> operator, but it's being called from within the factory method.
    </p>
  </div>
);
