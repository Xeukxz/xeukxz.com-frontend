import { CanvasManager } from './CanvasManager';
import { DemoBox } from './CustomElements/DemoBox/DemoBox';

export abstract class BaseEngine {
  tps: number = 60*1;
  protected _tick: number = 0;
  abstract state: {
    [key: string]: any
    tab: {
      open: boolean,
      awaitQueue: (() => void)[],
      awaitOpen: () => Promise<void>,
      setOpened: () => void
    }
    paused: boolean
    pausedByTabSwitch: boolean
    timeAtPause: number
  };
  private tickCallbacks: [number, () => void][] = [];
  
  constructor(public demoBox: DemoBox<any>, public canvas: CanvasManager) {
  
    document.addEventListener("visibilitychange", (_event) => {
      // console.log(document.visibilityState);
      if (document.visibilityState == "visible") {

        let ticksMissed = this.ticksMissed;
        for(const c of this.tickCallbacks) c[0] += ticksMissed;
        
        this.unpause();
      } else if (!this.state.paused) {
        this.pause();
        this.state.pausedByTabSwitch = true;
      }
    });
  }

  get ticksMissed(): number {
    return Math.floor((performance.now() - this.state.timeAtPause) / (1000 / this.tps));
  }

  tick(){
    for (const c of this.tickCallbacks) 
      if (this._tick >= c[0]) {
        c[1]();
        this.tickCallbacks.splice(this.tickCallbacks.indexOf(c), 1);
      }
  }

  public pause(delay?: number): void {
    if(this.state.paused) return;
    console.log("Paused");
    if(delay) setTimeout(() => {
      this.state.paused = true;
      this.state.timeAtPause = performance.now();
    }, delay);
    else {
      this.state.paused = true;
      this.state.timeAtPause = performance.now();
    }
  }

  public unpause(delay?: number, adjustTick: boolean = true): void {
    if(!this.state.paused) return;
    if(!this.state.tab.open || this.demoBox.collapsed || this.demoBox.classList.contains("notVisible")) return;
    console.log("Unpaused");
    this.state.pausedByTabSwitch = false;
    if(delay) setTimeout(() => {
      this.state.paused = false;
      if (adjustTick) this._tick += this.ticksMissed;
    }, delay);
    else {
      this.state.paused = false;
      if (adjustTick) this._tick += this.ticksMissed;
    }
  }
}