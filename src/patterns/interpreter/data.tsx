
export const interpreterCode = `interface Expression {
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
}

class MinusExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  public interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

// Usage
// Represents: 5 + (10 - 3)
const expression = new PlusExpression(
  new NumberExpression(5),
  new MinusExpression(
    new NumberExpression(10),
    new NumberExpression(3)
  )
);

console.log(expression.interpret()); // 12`;

export const interpreterExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
    </p>

    <h3>Problem</h3>
    <p>
      If a particular kind of problem occurs often enough, then it might be worthwhile to express instances of the problem as sentences in a simple language. Then you can build an interpreter that solves the problem by interpreting these sentences.
    </p>
    <p>
      For example, searching for strings that match a pattern is a common problem. Regular expressions are a standard language for specifying patterns of strings. Rather than building custom algorithms for each pattern, you can create a general search algorithm that interprets a regular expression.
    </p>

    <h3>Solution</h3>
    <p>
      The Interpreter pattern describes how to define a grammar for simple languages, represent sentences in the language, and interpret these sentences. In this example, the language is simple arithmetic expressions.
    </p>
    <p>
      The pattern uses a class to represent each grammar rule. Symbols on the right side of the rule are instance variables of these classes.
    </p>
  </div>
);
