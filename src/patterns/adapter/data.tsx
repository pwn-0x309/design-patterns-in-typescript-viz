
export const adapterCode = `interface RoundPeg {
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
}

class SquarePeg {
  constructor(private width: number) {}

  public getWidth(): number {
    return this.width;
  }
}

class SquarePegAdapter implements RoundPeg {
  private peg: SquarePeg;

  constructor(peg: SquarePeg) {
    this.peg = peg;
  }

  public getRadius(): number {
    // Calculate minimum circle radius that can fit the square
    return (this.peg.getWidth() * Math.sqrt(2)) / 2;
  }
}

// Usage
const hole = new RoundHole(5);
const smallSqPeg = new SquarePeg(5);
const largeSqPeg = new SquarePeg(10);

const smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
const largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);

console.log(hole.fits(smallSqPegAdapter)); // true
console.log(hole.fits(largeSqPegAdapter)); // false`;

export const adapterExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Convert the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
    </p>

    <h3>Problem</h3>
    <p>
      Imagine that you're creating a stock market monitoring app. The app downloads the stock data from multiple sources in XML format and then displays nice-looking charts and diagrams for the user.
    </p>
    <p>
      At some point, you decide to improve the app by integrating a smart 3rd-party analytics library. But there's a catch: the analytics library only works with data in JSON format.
    </p>

    <h3>Solution</h3>
    <p>
      You can create an adapter. This is a special object that converts the interface of one object so that another object can understand it.
    </p>
    <p>
      An adapter wraps one of the objects to hide the complexity of conversion happening behind the scenes. The wrapped object isn't even aware of the adapter. For example, you can wrap an object that operates in meters and kilometers with an adapter that converts all of the data to imperial units such as feet and miles.
    </p>
  </div>
);
