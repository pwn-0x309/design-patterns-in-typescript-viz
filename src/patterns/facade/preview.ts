export const facadePreview = {
  id: 'facade',
  name: 'Facade',
  category: 'Structural' as const,
  description: `Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.`,
  codePreview: `class Subsystem1 {
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
    return "Subsystem2: Fire!";`,
};
