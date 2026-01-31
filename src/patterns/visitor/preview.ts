export const visitorPreview = {
  id: 'visitor',
  name: 'Visitor',
  category: 'Behavioral' as const,
  description: `Lets you separate algorithms from the objects on which they operate.`,
  codePreview: `interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;
  visitConcreteComponentB(element: ConcreteComponentB): void;
}

interface Component {
  accept(visitor: Visitor): void;
}

class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }

  public exclusiveMethodOfConcreteComponentA(): string {`,
};
