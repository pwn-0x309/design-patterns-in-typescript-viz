export const commandPreview = {
  id: 'command',
  name: 'Command',
  category: 'Behavioral' as const,
  description: `Turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.`,
  codePreview: `interface Command {
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
  public undo() { this.light.off(); }`,
};
