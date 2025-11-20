
export const flyweightCode = `class TreeType {
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

  static getTreeType(name: string, color: string, texture: string) {
    const key = \`\${name}_\${color}_\${texture}\`;
    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(name, color, texture);
    }
    return this.treeTypes[key];
  }
}

class Tree {
  constructor(
    private x: number,
    private y: number,
    private type: TreeType
  ) {}

  public draw(canvas: any) {
    this.type.draw(canvas, this.x, this.y);
  }
}

class Forest {
  private trees: Tree[] = [];

  public plantTree(x: number, y: number, name: string, color: string, texture: string) {
    const type = TreeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  public draw(canvas: any) {
    this.trees.forEach(tree => tree.draw(canvas));
  }
}`;

export const flyweightExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.
    </p>

    <h3>Problem</h3>
    <p>
      To have some fun after long working hours, you decided to create a simple video game: players would be moving around a map and shooting each other. You chose to implement a realistic particle system and make it a distinctive feature of the game. Vast quantities of bullets, missiles, and shrapnel from explosions should fly all over the map and deliver a thrilling experience to the player.
    </p>
    <p>
      Upon its completion, you pushed the last commit, built the game and sent it to your friend for a test drive. Although the game was running flawlessly on your machine, your friend could not play for long. On his computer, the game kept crashing after a few minutes of gameplay. After digging into the debug logs, you discovered that the game crashed because it ran out of RAM. It turned out that the particle system was the culprit.
    </p>

    <h3>Solution</h3>
    <p>
      The Flyweight pattern suggests that you stop storing the extrinsic state inside the object. Instead, you should pass this state to specific methods which rely on it. The object itself should only contain the intrinsic state, which is invariant and context-independent.
    </p>
  </div>
);
