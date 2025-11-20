
export const prototypeCode = `interface Shape {
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
      this.radius = 10;
      this.color = 'blue';
    }
  }

  public clone(): Shape {
    return new Circle(this);
  }

  public draw(): void {
    console.log(\`Drawing a \${this.color} circle with radius \${this.radius}\`);
  }
}

// Usage
const circle = new Circle();
circle.color = 'red';

const anotherCircle = circle.clone();
anotherCircle.draw(); // Drawing a red circle...`;

export const prototypeExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.
    </p>

    <h3>Problem</h3>
    <p>
      Say you have an object, and you want to create an exact copy of it. How would you do it? First, you have to create a new object of the same class. Then you have to go through all the fields of the original object and copy their values over to the new object.
    </p>
    <p>
      Not all objects can be copied that way because some of the object's fields may be private and not visible from outside of the object itself.
    </p>

    <h3>Solution</h3>
    <p>
      The Prototype pattern delegates the cloning process to the actual objects that are being cloned. The pattern declares a common interface for all objects that support cloning. This interface lets you clone an object without coupling your code to the class of that object.
    </p>
  </div>
);
