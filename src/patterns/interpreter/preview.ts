export const interpreterPreview = {
  id: 'interpreter',
  name: 'Interpreter',
  category: 'Behavioral' as const,
  description: `Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.`,
  codePreview: `interface Expression {
  interpret(): number;
}

class NumberExpression implements Expression {
  constructor(private number: number) {}
  public interpret(): number { return this.number; }
}

class PlusExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  public interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}`,
};
