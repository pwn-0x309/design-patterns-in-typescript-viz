export const observerPreview = {
  id: 'observer',
  name: 'Observer',
  category: 'Behavioral' as const,
  description: `Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.`,
  codePreview: `interface Observer {
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

  public attach(observer: Observer): void {`,
};
