export const strategyPreview = {
  id: 'strategy',
  name: 'Strategy',
  category: 'Behavioral' as const,
  description: `Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.`,
  codePreview: `interface Strategy {
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
}`,
};
