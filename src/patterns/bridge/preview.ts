export const bridgePreview = {
  id: 'bridge',
  name: 'Bridge',
  category: 'Structural' as const,
  description: `Split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.`,
  codePreview: `interface Device {
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
`,
};
