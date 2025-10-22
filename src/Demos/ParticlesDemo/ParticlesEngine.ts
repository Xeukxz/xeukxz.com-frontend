// import { documentEventListeners } from "../main";
import { DemoBox } from '../../CustomElements/DemoBox/DemoBox';
import { CanvasManager } from "../../CanvasManager";
import { fireColors } from './Colors';
import { Point } from './Enums';
import { PointArray } from './Types';
import { Vector2 } from "./Vector2";
import { BaseEngine } from '../../BaseEngine';

export class ParticlesEngine extends BaseEngine {
  points: PointArray[][] = [];
  colors: string[] = [];
  particleCount: number = 0;
  gIndex: number = 0.5;
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
  }
  lastTime: number = 0;
  endFrameTime: number = 0;
  bloomCanvas: CanvasManager;

  constructor(demoBox: DemoBox<any>, canvas: CanvasManager) {
    super(demoBox, canvas);

    const bloomCanvas = document.createElement("canvas");
    bloomCanvas.id = "bloomCanvas";
    demoBox.contentElement.appendChild(bloomCanvas);
    this.bloomCanvas = new CanvasManager(bloomCanvas);

    this.bloomCanvas.canvas.setAttribute('aria-label', 'Particles Demo Bloom Canvas For Glow Effect');


    this.colors = fireColors
    this.setPointCount(50000)
    this.canvas.ctx.globalCompositeOperation = 'lighter'
    
    this.canvas.canvas.addEventListener('mousedown', (event) => {
      this.mouse.down.left = true;
      this.mouse.posAtDown = new Vector2(event.clientX, event.clientY).sub(this.canvas.offset);
    });

    this.canvas.canvas.addEventListener('mouseup', () => {
      this.mouse.down.left = false;
    });

    this.canvas.canvas.addEventListener('mousemove', (event) => {
      // if (mousedown) {
        this.mouse.pos = new Vector2(event.clientX, event.clientY).sub(this.canvas.offset);
      // }
    });

    this.canvas.canvas.addEventListener('touchstart', (event) => {
      this.mouse.down.left = true;
      this.mouse.pos = new Vector2(event.touches[0].clientX, event.touches[0].clientY).sub(this.canvas.offset);
    });

    this.canvas.canvas.addEventListener('touchend', () => {
      this.mouse.down.left = false;
    });

    this.canvas.canvas.addEventListener('touchmove', (event) => {
      event.preventDefault();
      if (this.mouse.down.left) {
        this.mouse.pos = new Vector2(event.touches[0].clientX, event.touches[0].clientY).sub(this.canvas.offset);
      }
    });

    this.canvas.canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  public tick(): void {
    super.tick();
    const deltaTime = Math.min(10, Math.max(1, (performance.now() - this.lastTime) / (1000/60)));
    const newFrameTime = performance.now();
    this.lastTime = newFrameTime;


    // const [mouseX, mouseY] = mouse;
    const {
      x: mouseX,
      y: mouseY
    } = this.mouse.pos;
    const mousedown = this.mouse.down.left;

    for (let i = 0; i < this.points.length; i++) {
      const length = this.points[i].length;
      for (let ii = 0; ii < length; ii++) {
        const point = this.points[i][ii];
        const velocity = point[Point.velocity];

        // // Loop the points around the screen | Disabled for performance
        // if (point[Point.x] < 0) point[Point.x] += canvas.width;
        // if (point[Point.x] > canvas.width) point[Point.x] -= canvas.width;
        // if (point[Point.y] < 0) point[Point.y] += canvas.height;
        // if (point[Point.y] > canvas.height) point[Point.y] -= canvas.height;

        if (mousedown) {
          const diffX = point[Point.x] - mouseX;
          const diffY = point[Point.y] - mouseY;
            
          const distance = Math.hypot(diffX, diffY);

          const magnitude = (this.gIndex / (distance));

          let random = Math.random() * 0.2 + 0.8;
          velocity[0] += (diffX * magnitude) * random;
          velocity[1] += (diffY * magnitude) * random;
        }

        point[Point.x] -= velocity[0] * deltaTime;
        point[Point.y] -= velocity[1] * deltaTime;

        velocity[0] /= 1.01;
        velocity[1] /= 1.01;
        
      }
    }
  }

  public draw(): void {
    this.canvas.calculateOffset()
    const ctx = this.canvas.ctx;
    this.canvas.clear();
    for (let i = 0; i < this.points.length; i++) {
      ctx.fillStyle = this.colors[i];
      ctx.strokeStyle = this.colors[i];
      
      ctx.beginPath();
      const length = this.points[i].length;
      for (let ii = 0; ii < length; ii++) {
        const point = this.points[i][ii];
        const velocity = point[Point.velocity];

        ctx.moveTo(
          point[Point.x],
          point[Point.y]
        )
        ctx.lineTo(
          point[Point.x] - (velocity[0] * 2) - Math.sign(velocity[0] || 1),
          point[Point.y] - (velocity[1] * 2) - Math.sign(velocity[1] || 1),
        );
        
      }
      ctx.stroke();
    }

    this.bloomCanvas.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.bloomCanvas.ctx.drawImage(this.canvas.canvas, 0, 0);

    // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    // ctx.fillText('FPS: ' + Math.round(1000 / (performance.now() - newFrameTime)), 0, 10);
    // ctx.fillText('Particle count: ' + particleCount, 0, 20);
    // ctx.fillText('Frame time: ' + Math.round(performance.now() - newFrameTime) + 'ms', 0, 30);
    // ctx.fillText('Frame request time: ' + Math.round(newFrameTime - endFrameTime) + 'ms', 0, 40);
    // ctx.fillText('Delta: ' + deltaTime.toFixed(3), 0, 50);

    // console.log(1000/60, (performance.now() - endFrameTime));
    // this.endFrameTime = performance.now();
  }

  public run(): void {
    const animationLoop = (_t: number) => {
      if (this.state.paused) return requestAnimationFrame(animationLoop);
      // while (t > this._tick * 1000 / this.tps) this.tick();
      this.tick();
      this.draw();
      requestAnimationFrame(animationLoop);
    }
    requestAnimationFrame(animationLoop);
  }

  createRandomPoint() {
    // const colorIndex = Math.floor(Math.random() * colors.length);
    return [
      Math.floor(Math.random() * (this.canvas.width)),
      Math.floor(Math.random() * (this.canvas.height)),
      [0, 0],
    ] as PointArray;
  }

  
  setPointCount(n: number) {
    this.points.length = 0;

    let colorIndex = 0;
    let i = 0;
    while(i < n) {
      if(this.points[colorIndex] === undefined) this.points[colorIndex] = [];
      
      this.points[colorIndex].push(this.createRandomPoint());

      colorIndex++;
      
      if (colorIndex >= this.colors.length) colorIndex = 0;
      i++;
    }
  }

  public reload(): void {
    this.colors = fireColors
    this.setPointCount(50000)
  }
}