
export const observerCode = `interface Observer {
  update(subject: Subject): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class ConcreteSubject implements Subject {
  public state: number = 0;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) return;
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) return;
    this.observers.splice(observerIndex, 1);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public someBusinessLogic(): void {
    this.state = Math.floor(Math.random() * 10 + 1);
    this.notify();
  }
}

class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reacted to the event.');
    }
  }
}

// Usage
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserverA();

subject.attach(observer1);
subject.someBusinessLogic();`;

export const observerExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you have two types of objects: a <code>Customer</code> and a <code>Store</code>. The customer is very interested in a particular brand of product (say, it's a new model of the iPhone) which should become available in the store very soon.
    </p>
    <p>
      The customer could visit the store every day and check product availability. But while the product is still en route, most of these trips would be pointless.
    </p>
    <p>
      On the other hand, the store could send tons of emails (which might be considered spam) to all customers each time a new product becomes available. This would save some customers from endless trips to the store. At the same time, it'd upset other customers who aren't interested in new products.
    </p>

    <h3>Solution</h3>
    <p>
      The object that has some interesting state is often called <i>subject</i>, but since it's also going to notify other objects about the changes to its state, we'll call it <i>publisher</i>. All other objects that want to track changes to the publisher's state are called <i>subscribers</i>.
    </p>
    <p>
      The Observer pattern suggests that you add a subscription mechanism to the publisher class so individual objects can subscribe to or unsubscribe from a stream of events coming from that publisher.
    </p>
  </div>
);
