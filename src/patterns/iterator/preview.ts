export const iteratorPreview = {
  id: 'iterator',
  name: 'Iterator',
  category: 'Behavioral' as const,
  description: `Lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).`,
  codePreview: `interface Iterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

interface Aggregator {
  getIterator(): Iterator<string>;
}

class AlphabeticalOrderIterator implements Iterator<string> {
  private collection: WordsCollection;
  private position: number = 0;`,
};
