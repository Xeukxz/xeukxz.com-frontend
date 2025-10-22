// import { documentEventListeners } from "../main";
import { DemoBox } from '../../CustomElements/DemoBox/DemoBox';
import { CanvasManager } from "../../CanvasManager";
import { Path } from "./Path";
import { Vector2 } from "./Vector2";
import { BaseEngine } from '../../BaseEngine';

export class BezierEngine extends BaseEngine {
  path: Path = new Path();
  state = {
    progress: 0,
    tab: {
      open: true,
      awaitQueue: [] as (() => void)[],
      awaitOpen: async () => {
        return new Promise<void>((resolve) => {
          if (!this.state.paused) return resolve();
          this.state.tab.awaitQueue.push(resolve);
        })
      },
      setOpened: () => {
        this.state.paused = false;
        for (const f of this.state.tab.awaitQueue) f();
        this.state.tab.awaitQueue = [];
      }
    },
    paused: false,
    pausedByTabSwitch: false,
    timeAtPause: performance.now()
  };
  mouse: {
    pos: Vector2 
    down: {
      left: boolean,
      right: boolean
    }
    dragPointIndex?: number
    posAtDown?: Vector2
    origionalPointPos?: Vector2
  } = {
    pos: new Vector2(0, 0),
    down: {
      left: false,
      right: false
    }
  };

  constructor(demoBox: DemoBox<BezierEngine>, canvas: CanvasManager) {
    super(demoBox, canvas);

    let jump = ((this.canvas.width - 100) / 5)
    let y = this.canvas.height / 2

    this.path.points.push(...[
      [0     , y+(y - 50)],
      [jump*1, y-(y - 50)],
      [jump*4, y-(y - 50)],
      [jump*5, y+(y - 50)],
      [jump*2.5, y+(y - 50)],

    ].map(([x, y]) => new Vector2(x+ 50, y)))

    let pointAtMouse = (leniency?: number): number => this.path.points.findIndex(p => p.distance(this.mouse.pos) < 10 + (leniency ?? 0) );

    this.canvas.canvas.addEventListener("mousemove", (event) => {
      this.mouse.pos = new Vector2(event.clientX - this.canvas.offset.x, event.clientY - this.canvas.offset.y);
      if (this.mouse.down && this.mouse.dragPointIndex !== undefined) {
        this.path.points[this.mouse.dragPointIndex] = this.mouse.origionalPointPos!.add(this.mouse.pos.difference(this.mouse.posAtDown!));
      }
    });
    this.canvas.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    this.canvas.canvas.addEventListener("mousedown", (event) => {
      if(event.button == 0) {
        this.mouse.down.left = true;
        this.mouse.posAtDown = this.mouse.pos;
        this.path.points.forEach((p, i) => {
          if (p.distance(this.mouse.pos) < 10) {
            this.mouse.dragPointIndex = i;
            this.mouse.origionalPointPos = p;
          }
        });
      } else if(event.button == 2) {
        let point = pointAtMouse();
        if(point >= 0) {
          this.path.points.splice(point, 1);
          this.mouse.down.right = true;
        }
        else this.path.points.push(this.mouse.pos);
      }
      
    });
    this.canvas.canvas.addEventListener("mouseup", (event) => {
      if(event.button == 0) this.mouse.down.left = false;
      if(event.button == 2) this.mouse.down.right = false;
      this.mouse.dragPointIndex = undefined;
    });

    let timeAtLastTouch = 0;

    this.canvas.canvas.addEventListener("touchstart", (event) => {
      if (event.touches.length === 1) {
        timeAtLastTouch = performance.now();
        this.mouse.pos = new Vector2(event.touches[0].clientX - this.canvas.offset.x, event.touches[0].clientY - this.canvas.offset.y);
        this.mouse.posAtDown = this.mouse.pos;
        let point = pointAtMouse(10);
        if (point >= 0) {
          this.mouse.dragPointIndex = point;
          this.mouse.origionalPointPos = this.path.points[point];
        }
      }
    });

    this.canvas.canvas.addEventListener("touchend", (event) => {
      if (event.touches.length === 0) {
        let point = pointAtMouse(10);
        if (timeAtLastTouch + 200 > performance.now()) {
          if (point >= 0) {
            this.path.points.splice(point, 1);
          } else {
            this.path.points.push(this.mouse.pos);
          }
        }
        this.mouse.dragPointIndex = undefined;
      }
    });

    this.canvas.canvas.addEventListener("touchmove", (event) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        
      this.mouse.pos = new Vector2(event.touches[0].clientX - this.canvas.offset.x, event.touches[0].clientY - this.canvas.offset.y);
      if (this.mouse.dragPointIndex !== undefined) {
        this.path.points[this.mouse.dragPointIndex] = this.mouse.origionalPointPos!.add(this.mouse.pos.difference(this.mouse.posAtDown!));
      }
      }
    });

  }

  public tick(): void {
    super.tick();
    if(this.state.progress == 1) return void (this.state.progress = 0);
    // this.state.progress += this.path.bezierStep;
    this.state.progress += 0.002;
    if(this.state.progress > 1) this.state.progress = 1;
    this.path.toBezier(this.state.progress);
    this._tick++;
  }

  public draw(): void {
    this.canvas.calculateOffset();
    let ctx = this.canvas.ctx;
    this.canvas.clear();
    this.path.draw(this.canvas.ctx);
    this.path.points.forEach((p, i) => {
      let isMouseOver = p.distance(this.mouse.pos) < 10;
      if(isMouseOver && this.mouse.down.right) this.path.points.splice(i, 1);
      ctx.strokeStyle = this.mouse.dragPointIndex === i ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)";
      // ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.beginPath();
      ctx.lineWidth = isMouseOver ? 3 : 1;
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.stroke();
    });
    // console.log("draw")
  }

  public run(): void {
    const animationLoop = (t: number) => {
      if (this.state.paused) return requestAnimationFrame(animationLoop);
      while (t > this._tick * 1000 / this.tps) {
        this.tick();
      }
      let canvasSize = new Vector2(this.canvas.canvas.width, this.canvas.canvas.height);
      let newBounds = this.canvas.canvas.getBoundingClientRect();
      let newSize = new Vector2(Math.floor(newBounds.width), Math.floor(newBounds.height));
      if (!canvasSize.equal(newSize) && !this.state.paused) {
        // move all points to there relative position on the new canvas
        this.path.points = this.path.points.map(p => new Vector2(p.x / canvasSize.x * newSize.x, p.y / canvasSize.y * newSize.y));
        this.canvas.updateSize(newBounds.width, newBounds.height);
      }
      this.draw();
      this.path.points.forEach((p, _i) => {
        // if point is outside of canvas, move it to the edge
        if(p.x < 0) p.x = 0;
        if(p.y < 0) p.y = 0;
        if(p.x > this.canvas.width) p.x = this.canvas.width;
        if(p.y > this.canvas.height) p.y = this.canvas.height;
      });
      requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop);
  }

  public reload(): void {
    // this.canvas.updateSize(50,50);
    console.log(this.path)
    let jump = ((this.canvas.width - 100) / 5)
    let y = this.canvas.height / 2
    this.path.points= [
      [0     , y+(y - 50)],
      [jump*1, y-(y - 50)],
      [jump*4, y-(y - 50)],
      [jump*5, y+(y - 50)],
      [jump*2.5, y+(y - 50)],
    ].map(([x, y]) => new Vector2(x+ 50, y))
    this.state.progress = 0;
  }
}