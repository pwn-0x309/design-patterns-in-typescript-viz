
export const facadeCode = `class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Ready!";
  }
  public operationN(): string {
    return "Subsystem1: Go!";
  }
}

class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: Get ready!";
  }
  public operationZ(): string {
    return "Subsystem2: Fire!";
  }
}

class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
    let result = "Facade initializes subsystems:\\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade orders subsystems to perform the action:\\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

// Usage
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
console.log(facade.operation());`;

export const facadeExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you must make your code work with a broad set of objects that belong to a sophisticated library or framework. Normally, you'd need to initialize all of those objects, keep track of dependencies, execute methods in the correct order, and so on.
    </p>
    <p>
      As a result, the business logic of your classes would become tightly coupled to the implementation details of 3rd-party classes, making it hard to comprehend and maintain.
    </p>

    <h3>Solution</h3>
    <p>
      A facade is a class that provides a simple interface to a complex subsystem which contains lots of moving parts. A facade might provide limited functionality in comparison to working with the subsystem directly. However, it includes only those features that clients really care about.
    </p>
    <p>
      Having a facade is handy when you need to integrate your app with a sophisticated library that has dozens of features, but you just need a tiny bit of its functionality.
    </p>
  </div>
);
