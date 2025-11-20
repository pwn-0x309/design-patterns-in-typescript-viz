
export const bridgeCode = `interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
}

class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }
}

class AdvancedRemoteControl extends RemoteControl {
  public mute(): void {
    this.device.setVolume(0);
  }
}

// Usage
const tv = new Tv();
const remote = new RemoteControl(tv);
remote.togglePower();

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.mute();`;

export const bridgeExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.
    </p>

    <h3>Problem</h3>
    <p>
      Say you have a geometric <code>Shape</code> class with a pair of subclasses: <code>Circle</code> and <code>Square</code>. You want to extend this class hierarchy to incorporate colors, so you plan to create <code>Red</code> and <code>Blue</code> shape subclasses. However, since you already have two subclasses, you'll need to create four class combinations such as <code>BlueCircle</code> and <code>RedSquare</code>.
    </p>
    <p>
      Adding new shape types and colors to the hierarchy will grow it exponentially. For example, to add a triangle shape you'd need to introduce two subclasses, one for each color. And after that, adding a new color would require creating three subclasses, one for each shape type.
    </p>

    <h3>Solution</h3>
    <p>
      The Bridge pattern attempts to solve this problem by switching from inheritance to composition. What this means is that you extract one of the dimensions into a separate class hierarchy, so that the original classes will reference an object of the new hierarchy, instead of having all of its state and behaviors within one class.
    </p>
  </div>
);
