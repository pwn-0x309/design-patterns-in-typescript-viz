
export const mementoCode = `class Memento {
  constructor(private state: string) {}
  public getState(): string { return this.state; }
}

class Originator {
  private state: string;

  constructor(state: string) { this.state = state; }

  public save(): Memento {
    return new Memento(this.state);
  }

  public restore(memento: Memento) {
    this.state = memento.getState();
  }
}

class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup() {
    this.mementos.push(this.originator.save());
  }

  public undo() {
    if (!this.mementos.length) return;
    const memento = this.mementos.pop();
    this.originator.restore(memento!);
  }
}`;

export const mementoExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Lets you save and restore the previous state of an object without revealing the details of its implementation.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're creating a text editor app. In addition to simple text editing, your editor can format text, insert inline images, etc.
    </p>
    <p>
      At some point, you decided to let users undo any operations carried out on the text. This feature has become so common over the years that nowadays users expect every app to have it. For the implementation, you chose to take the direct approach. Before performing any operation, the app records the state of all objects and saves it in some storage. Later, when a user decides to revert an action, the app fetches the latest snapshot from the history and uses it to restore the state of all objects.
    </p>

    <h3>Solution</h3>
    <p>
      The Memento pattern delegates creating the state snapshots to the actual owner of that state, the <i>originator</i> object. Hence, instead of other objects trying to copy the editor's state from the "outside," the editor class itself can make the snapshot since it has full access to its own state.
    </p>
    <p>
      The pattern suggests storing the copy of the object's state in a special object called <i>memento</i>. The contents of the memento aren't accessible to any other object except the one that produced it. Other objects must communicate with mementos using a limited interface which may allow fetching the snapshot's metadata (creation time, name of the performed operation, etc.), but not the original object's state contained in the snapshot.
    </p>
  </div>
);
