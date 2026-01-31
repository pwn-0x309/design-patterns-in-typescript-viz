export const builderPreview = {
  id: 'builder',
  name: 'Builder',
  category: 'Creational' as const,
  description: `Separate the construction of a complex object from its representation so that the same construction process can create different representations.`,
  codePreview: `interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  private product: Product1;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();`,
};
