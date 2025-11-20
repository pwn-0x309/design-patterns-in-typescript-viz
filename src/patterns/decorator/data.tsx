
export const decoratorCode = `interface Coffee {
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
  public getDescription() { return this.coffee.getDescription(); }
}

class MilkDecorator extends CoffeeDecorator {
  public getCost() { return super.getCost() + 2; }
  public getDescription() { return super.getDescription() + ', Milk'; }
}

class SugarDecorator extends CoffeeDecorator {
  public getCost() { return super.getCost() + 1; }
  public getDescription() { return super.getDescription() + ', Sugar'; }
}

// Usage
let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.getDescription()); // Simple Coffee, Milk, Sugar
console.log(coffee.getCost()); // 8`;

export const decoratorExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're working on a notification library which lets other programs notify their users about important events.
    </p>
    <p>
      The initial version of the library was based on the <code>Notifier</code> class that had only a few fields, a constructor and a single <code>send</code> method. The method could accept a message argument from a client and send the message to a list of emails that were passed to the notifier via its constructor. A third-party app which acted as a client was supposed to create and configure the notifier object once, and then use it each time something important happened.
    </p>
    <p>
      At some point, you realize that users of the library expect more than just email notifications. Many of them would like to receive an SMS about critical issues. Others would like to be notified on Facebook, and some corporate users would love to get Slack notifications.
    </p>

    <h3>Solution</h3>
    <p>
      Extending a class is the first thing that comes to mind when you need to alter an object's behavior. However, inheritance has several serious caveats that you need to be aware of.
    </p>
    <p>
      One of the ways to overcome these caveats is by using <i>Aggregation</i> or <i>Composition</i> instead of <i>Inheritance</i>. One object has a reference to another and delegates it some work, whereas with inheritance, the object itself is able to do that work, inheriting the behavior from its superclass.
    </p>
    <p>
      "Wrapper" is the alternative nickname for the Decorator pattern that clearly expresses the main idea of the pattern. A wrapper is an object that can be linked with some target object. The wrapper contains the same set of methods as the target and delegates to it all requests it receives. However, the wrapper may alter the result by doing something either before or after it passes the request to the target.
    </p>
  </div>
);
