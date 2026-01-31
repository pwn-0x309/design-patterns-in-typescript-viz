export const flyweightPreview = {
  id: 'flyweight',
  name: 'Flyweight',
  category: 'Structural' as const,
  description: `Lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.`,
  codePreview: `class TreeType {
  constructor(
    private name: string,
    private color: string,
    private texture: string
  ) {}

  public draw(canvas: any, x: number, y: number) {
    // Draw tree at x, y using shared color and texture
  }
}

class TreeFactory {
  static treeTypes: { [key: string]: TreeType } = {};
`,
};
