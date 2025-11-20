
export const visitorCode = `interface Visitor {
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

  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

class ConcreteComponentB implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(\`\${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1\`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(\`\${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1\`);
  }
}

// Usage
const components = [
  new ConcreteComponentA(),
  new ConcreteComponentB(),
];

const visitor1 = new ConcreteVisitor1();

for (const component of components) {
  component.accept(visitor1);
}`;

export const visitorExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Lets you separate algorithms from the objects on which they operate.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that your team develops an app which works with geographic information structured as a colossal graph. Each node of the graph represents a complex entity such as a city, but also things like industries, sightseeing areas, etc.
    </p>
    <p>
      At some point, you got a task to implement exporting the graph into XML format. At first, the job seemed pretty straightforward. You planned to add an export method to each node class and then leverage recursion to go over each node of the graph and execute the export method. The solution was simple and elegant: thanks to polymorphism, you weren't coupling the code that called the export method to concrete classes of nodes.
    </p>
    <p>
      Unfortunately, the system architect refused to allow you to alter existing node classes. He said that the code was already in production and he didn't want to risk breaking it.
    </p>
    <p>
      Besides, he questioned whether it makes sense to have the XML export code inside the node classes. The primary job of these classes was to work with geodata. The XML export behavior would look alien there.
    </p>

    <h3>Solution</h3>
    <p>
      The Visitor pattern suggests that you place the new behavior into a separate class called <i>visitor</i>, instead of trying to integrate it into existing classes. The original object that has to perform the behavior is now passed to one of the visitor's methods as an argument, providing the method access to all necessary data contained within the object.
    </p>
  </div>
);
