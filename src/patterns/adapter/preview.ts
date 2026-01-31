export const adapterPreview = {
  id: 'adapter',
  name: 'Adapter',
  category: 'Structural' as const,
  description: `Convert the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.`,
  codePreview: `interface RoundPeg {
  getRadius(): number;
}

class RoundHole {
  constructor(private radius: number) {}

  public getRadius(): number {
    return this.radius;
  }

  public fits(peg: RoundPeg): boolean {
    return this.getRadius() >= peg.getRadius();
  }
}`,
};
