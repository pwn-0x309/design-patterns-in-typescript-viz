
export const commandCode = `interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  public on() { console.log('Light is ON'); }
  public off() { console.log('Light is OFF'); }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  public execute() { this.light.on(); }
  public undo() { this.light.off(); }
}

class RemoteControl {
  private history: Command[] = [];

  public execute(command: Command) {
    command.execute();
    this.history.push(command);
  }

  public undo() {
    const command = this.history.pop();
    if (command) command.undo();
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();
const lightOn = new LightOnCommand(light);

remote.execute(lightOn); // Light is ON
remote.undo(); // Light is OFF`;

export const commandExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're working on a new text-editor app. Your current task is to create a toolbar with a bunch of buttons for various operations of the editor. You created a very neat <code>Button</code> class that can be used for buttons on the toolbar, as well as for generic buttons in various dialogs.
    </p>
    <p>
      While all of these buttons look similar, they're all supposed to do different things. Where would you put the code for the various click handlers of these buttons? The simplest solution is to create tons of subclasses for each place where the button is used. These subclasses would contain the code that would have to be executed on a button click.
    </p>

    <h3>Solution</h3>
    <p>
      Good software design is often based on the <i>principle of separation of concerns</i>, which usually results in breaking an app into layers. The most common example: a layer for the graphical user interface and another layer for the business logic.
    </p>
    <p>
      The Command pattern suggests that GUI objects shouldn't send these requests directly. Instead, you should extract all of the request details, such as the object being called, the name of the method and the list of arguments into a separate <i>command</i> class with a single method that triggers this request.
    </p>
  </div>
);
