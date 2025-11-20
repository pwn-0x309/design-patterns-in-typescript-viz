
export const chainOfResponsibilityCode = `interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Banana') {
      return \`Monkey: I'll eat the \${request}.\`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Nut') {
      return \`Squirrel: I'll eat the \${request}.\`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'MeatBall') {
      return \`Dog: I'll eat the \${request}.\`;
    }
    return super.handle(request);
  }
}

// Usage
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

console.log(monkey.handle('Nut')); // Squirrel: I'll eat the Nut.
console.log(monkey.handle('Banana')); // Monkey: I'll eat the Banana.
console.log(monkey.handle('Cup of coffee')); // null`;

export const chainOfResponsibilityExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're working on an online ordering system. You want to restrict access to the system so only authenticated users can create orders. Also, users who have administrative permissions must have full access to all orders.
    </p>
    <p>
      After a bit of planning, you realized that these checks must be performed sequentially. The application can attempt to authenticate a user to the system whenever it receives a request that contains the user's credentials. However, if those credentials aren't correct and authentication fails, there's no reason to proceed with any other checks.
    </p>

    <h3>Solution</h3>
    <p>
      The Chain of Responsibility relies on transforming particular behaviors into stand-alone objects called <i>handlers</i>. In our case, each check should be extracted to its own class with a single method that performs the check. The request, along with its data, is passed to this method as an argument.
    </p>
    <p>
      The pattern suggests that you link these handlers into a chain. Each linked handler has a field for storing a reference to the next handler in the chain. In addition to processing a request, handlers pass the request further along the chain. The request travels along the chain until all handlers have had a chance to process it.
    </p>
  </div>
);
