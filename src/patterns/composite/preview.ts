export const compositePreview = {
  id: 'composite',
  name: 'Composite',
  category: 'Structural' as const,
  description: `Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.`,
  codePreview: `interface Component {
  operation(): void;
}

class Leaf implements Component {
  public operation(): void {
    console.log("Leaf");
  }
}

class Composite implements Component {
  protected children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);`,
};
