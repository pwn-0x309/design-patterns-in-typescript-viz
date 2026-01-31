export const mementoPreview = {
  id: 'memento',
  name: 'Memento',
  category: 'Behavioral' as const,
  description: `Lets you save and restore the previous state of an object without revealing the details of its implementation.`,
  codePreview: `class Memento {
  constructor(private state: string) {}
  public getState(): string { return this.state; }
}

class Originator {
  private state: string;

  constructor(state: string) { this.state = state; }

  public save(): Memento {
    return new Memento(this.state);
  }

  public restore(memento: Memento) {`,
};
