export const statePreview = {
  id: 'state',
  name: 'State',
  category: 'Behavioral' as const,
  description: `Lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.`,
  codePreview: `abstract class State {
  protected player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  public abstract clickLock(): void;
  public abstract clickPlay(): void;
  public abstract clickNext(): void;
  public abstract clickPrev(): void;
}

class AudioPlayer {
  private state: State;`,
};
