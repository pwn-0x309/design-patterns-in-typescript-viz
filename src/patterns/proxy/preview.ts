export const proxyPreview = {
  id: 'proxy',
  name: 'Proxy',
  category: 'Structural' as const,
  description: `Provide a surrogate or placeholder for another object to control access to it.`,
  codePreview: `interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;`,
};
