
export const compositeCode = `interface Component {
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
    this.children.push(component);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
  }

  public operation(): void {
    console.log("Branch(");
    for (const child of this.children) {
      child.operation();
    }
    console.log(")");
  }
}

// Usage
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());

const branch2 = new Composite();
branch2.add(new Leaf());

tree.add(branch1);
tree.add(branch2);

tree.operation();`;

export const compositeExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
    </p>

    <h3>Problem</h3>
    <p>
      Using the Composite pattern makes sense only when the core model of your app can be represented as a tree.
    </p>
    <p>
      For example, imagine that you have two types of objects: <code>Products</code> and <code>Boxes</code>. A <code>Box</code> can contain several <code>Products</code> as well as a number of smaller <code>Boxes</code>. These little <code>Boxes</code> can also hold some <code>Products</code> or even smaller <code>Boxes</code>, and so on.
    </p>

    <h3>Solution</h3>
    <p>
      The Composite pattern suggests that you work with <code>Products</code> and <code>Boxes</code> through a common interface which declares a method for calculating the total price.
    </p>
    <p>
      For a product, it's simply returning the product's price. For a box, it's going through each item the box contains, asking its price and then returning a total for this box. If one of these items were a smaller box, that box would also start going over its contents and so on, until the prices of all inner components were calculated.
    </p>
  </div>
);
