export const prototypePreview = {
  id: 'prototype',
  name: 'Prototype',
  category: 'Creational' as const,
  description: `Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.`,
  codePreview: `interface Shape {
  clone(): Shape;
  draw(): void;
}

class Circle implements Shape {
  public radius: number;
  public color: string;

  constructor(source?: Circle) {
    if (source) {
      this.radius = source.radius;
      this.color = source.color;
    } else {
      this.radius = 10;`,
};
