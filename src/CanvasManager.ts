import { Vector2 } from "./Demos/ParticlesDemo/Vector2";

export class CanvasManager {
  ctx: CanvasRenderingContext2D;
  offset: Vector2 = new Vector2(0, 0);
  parentElement: HTMLElement | null = null;
  constructor(public canvas: HTMLCanvasElement, public globalCompositeOperation: CanvasCompositing["globalCompositeOperation"] = "source-over") {
    console.log(canvas);
    // // append canvas to body if not already
    // if (!document.body.contains(canvas)) {
    //   document.body.appendChild(canvas);
    // }
    // canvas.style.position = "absolute";
    this.parentElement = canvas.parentElement;
    const parentDimensions = this.parentElement?.getBoundingClientRect();
    this.updateSize(parentDimensions?.width, parentDimensions?.height);
    this.offset = new Vector2(parentDimensions?.left ?? 0, parentDimensions?.top ?? 0);
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.translate(0.5, 0.5);
  }
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  get center() {
    return new Vector2(this.width / 2, this.height / 2);
  }
  clear() {
    this.ctx.clearRect(-0.5, -0.5, this.canvas.width, this.canvas.height);
  }
  updateSize(x?: number, y?: number) {
    const parentDimensions = this.parentElement?.getBoundingClientRect();
    // console.log(this.parentElement, parentDimensions?.width, parentDimensions?.height);
    this.canvas.width = x ?? parentDimensions?.width ?? window.innerWidth;
    this.canvas.height = y ?? parentDimensions?.height ?? window.innerHeight;
    if (this.ctx) this.ctx.globalCompositeOperation = this.globalCompositeOperation;
  }

  calculateOffset() {
    const parentDimensions = this.parentElement?.getBoundingClientRect();
    this.offset = new Vector2(parentDimensions?.left ?? 0, parentDimensions?.top ?? 0);
  }
}