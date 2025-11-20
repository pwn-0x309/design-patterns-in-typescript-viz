
export const abstractFactoryCode = `interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
  public createButton(): Button {
    return new WinButton();
  }
  public createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

class MacFactory implements GUIFactory {
  public createButton(): Button {
    return new MacButton();
  }
  public createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Client code works with factories and products only through abstract types
function Application(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  button.paint();
  checkbox.paint();
}`;

export const abstractFactoryExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're creating a furniture shop simulator. Your code consists of classes that represent:
    </p>
    <ol>
      <li>A family of related products, say: <code>Chair</code> + <code>Sofa</code> + <code>CoffeeTable</code>.</li>
      <li>Several variants of this family. For example, products <code>Chair</code> + <code>Sofa</code> + <code>CoffeeTable</code> are available in these variants: <code>Modern</code>, <code>Victorian</code>, <code>ArtDeco</code>.</li>
    </ol>
    <p>
      You need a way to create individual furniture objects so that they match other objects of the same family. Customers get quite mad when they receive non-matching furniture.
    </p>

    <h3>Solution</h3>
    <p>
      The Abstract Factory pattern suggests that you declare interfaces for each distinct product of the product family (e.g., Chair, Sofa or CoffeeTable). Then you can create separate factory classes for each variant (ModernFurnitureFactory, VictorianFurnitureFactory, etc.).
    </p>
  </div>
);
