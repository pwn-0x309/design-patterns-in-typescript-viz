export const decoratorPreview = {
  id: 'decorator',
  name: 'Decorator',
  category: 'Structural' as const,
  description: `Attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.`,
  codePreview: `interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  public getCost() { return 5; }
  public getDescription() { return 'Simple Coffee'; }
}

class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  public getCost() { return this.coffee.getCost(); }
  public getDescription() { return this.coffee.getDescription(); }`,
};
