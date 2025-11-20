
export const stateCode = `abstract class State {
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
  private state: State;
  private playing: boolean = false;

  constructor() {
    this.state = new ReadyState(this);
  }

  public changeState(state: State) {
    this.state = state;
  }

  public clickLock() { this.state.clickLock(); }
  public clickPlay() { this.state.clickPlay(); }
  public clickNext() { this.state.clickNext(); }
  public clickPrev() { this.state.clickPrev(); }

  public setPlaying(playing: boolean) { this.playing = playing; }
  public isPlaying(): boolean { return this.playing; }
}

class LockedState extends State {
  public clickLock() {
    if (this.player.isPlaying()) {
      this.player.changeState(new PlayingState(this.player));
    } else {
      this.player.changeState(new ReadyState(this.player));
    }
  }
  public clickPlay() { /* Locked */ }
  public clickNext() { /* Locked */ }
  public clickPrev() { /* Locked */ }
}

class ReadyState extends State {
  public clickLock() {
    this.player.changeState(new LockedState(this.player));
  }
  public clickPlay() {
    this.player.setPlaying(true);
    this.player.changeState(new PlayingState(this.player));
  }
  public clickNext() { /* Next song */ }
  public clickPrev() { /* Prev song */ }
}

class PlayingState extends State {
  public clickLock() {
    this.player.changeState(new LockedState(this.player));
  }
  public clickPlay() {
    this.player.setPlaying(false);
    this.player.changeState(new ReadyState(this.player));
  }
  public clickNext() { /* Next song */ }
  public clickPrev() { /* Prev song */ }
}`;

export const stateExplanation = (
  <div>
    <h3>Intent</h3>
    <p>
      Lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.
    </p>

    <h3>Problem</h3>
    <p>
      The State pattern is closely related to the concept of a Finite-State Machine.
    </p>
    <p>
      The main idea is that, at any given moment, there's a finite number of states which a program can be in. Within any unique state, the program behaves differently, and the program can be switched from one state to another. However, depending on a current state, the program may or may not switch to certain other states. These switching rules, called transitions, are also finite and predetermined.
    </p>
    <p>
      Imagine that you have a <code>Document</code> class. A document can be in one of three states: <code>Draft</code>, <code>Moderation</code> and <code>Published</code>. The <code>publish</code> method of the document works a little bit differently in each state:
    </p>
    <ul>
      <li>In <code>Draft</code>, it moves the document to moderation.</li>
      <li>In <code>Moderation</code>, it makes the document public, but only if the current user is an administrator.</li>
      <li>In <code>Published</code>, it doesn't do anything at all.</li>
    </ul>

    <h3>Solution</h3>
    <p>
      The State pattern suggests that you create new classes for all possible states of an object and extract all state-specific behaviors into these classes.
    </p>
    <p>
      Instead of implementing all behaviors on its own, the original object, called <i>context</i>, stores a reference to one of the state objects that represents its current state, and delegates all the state-related work to that object.
    </p>
  </div>
);
