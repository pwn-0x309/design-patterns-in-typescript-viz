export const factoryMethodPreview = {
  id: 'factory-method',
  name: 'Factory Method',
  category: 'Creational' as const,
  description: `Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.`,
  codePreview: `interface Transport {
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
}`,
};
