
export const strategyCode = `interface Strategy {
  execute(a: number, b: number): number;
}

class ConcreteStrategyAdd implements Strategy {
  public execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategySubtract implements Strategy {
  public execute(a: number, b: number): number {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  public execute(a: number, b: number): number {
    return a * b;
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}

// Usage
const context = new Context(new ConcreteStrategyAdd());
console.log("10 + 5 = " + context.executeStrategy(10, 5));

context.setStrategy(new ConcreteStrategySubtract());
console.log("10 - 5 = " + context.executeStrategy(10, 5));

context.setStrategy(new ConcreteStrategyMultiply());
console.log("10 * 5 = " + context.executeStrategy(10, 5));`;

export const strategyExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.
    </p>

    <h3>Problem</h3>
    <p>
      One day you decided to create a navigation app for casual travelers. The app was centered around a beautiful map which helped users orient themselves in any city.
    </p>
    <p>
      One of the most requested features for the app was automatic route planning. A user should be able to enter an address and see the fastest route to that destination displayed on the map.
    </p>
    <p>
      The first version of the app could only build routes over roads. People who traveled by car were bursting with joy. But apparently, not everybody likes to drive on their vacation. So with the next update, you added an option to build walking routes. Right after that, you added another option to let people use public transport in their routes.
    </p>
    <p>
      However, that was only the beginning. Later you planned to add route building for cyclists. And even later, another option for building routes through all of a city's tourist attractions.
    </p>
    <p>
      While from a business perspective the app was a success, the technical part caused you many headaches. Each time you added a new routing algorithm, the main class of the navigator doubled in size. At some point, the beast became too hard to maintain.
    </p>

    <h3>Solution</h3>
    <p>
      The Strategy pattern suggests that you take a class that does something specific in a lot of different ways and extract all of these algorithms into separate classes called <i>strategies</i>.
    </p>
    <p>
      The original class, called <i>context</i>, must have a field for storing a reference to one of the strategies. The context delegates the work to a linked strategy object instead of executing it on its own.
    </p>
  </div>
);
