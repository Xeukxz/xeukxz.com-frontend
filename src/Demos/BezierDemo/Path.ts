import { Vector2 } from "./Vector2"

const RecursionColorMapping = [
  [255, 80, 80, 0.5],
  [80, 255, 80, 0.5],
  [80, 80, 255, 0.5],
  [255, 255, 80, 0.5],
  [255, 80, 255, 0.5],
  [80, 255, 255, 0.5],
  [255, 255, 255, 0.5],
  [200, 200, 200, 0.5],
  [150, 150, 150, 0.5],
  [100, 100, 100, 0.5],
  [50, 50, 50, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  [25, 25, 25, 0.5],
  
].map(([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`)

export class Path {
  points: Vector2[] = []
  bezierPoints: Vector2[] = []
  bezierStep: number = 0.01
  fancyLines: Vector2[][] = []
  t: number = 0

  draw(ctx: CanvasRenderingContext2D, color?: string) {
    if(this.points.length < 1) return
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 1
    ctx.strokeStyle = color ?? 'rgba(255, 255, 255, 0.5)'
    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    ctx.stroke()

    ctx.strokeStyle = 'rgb(255, 255, 255)'
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.lineWidth = 5
    
    // ctx.shadowBlur = 10
    // ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
    if(this.bezierPoints.length === 0) return
    ctx.beginPath()
    ctx.moveTo(this.bezierPoints[0].x, this.bezierPoints[0].y)
    for (let i = 1; i < this.bezierPoints.length; i++) {
      ctx.lineTo(this.bezierPoints[i].x, this.bezierPoints[i].y)
    }
    ctx.stroke()
    // ctx.shadowBlur = 0
    let lastPoint = this.bezierPoints[this.bezierPoints.length - 1]
    ctx.beginPath()
    ctx.arc(lastPoint.x, lastPoint.y, 5, 0, Math.PI * 2)
    ctx.fill()
    
    for(const l of this.fancyLines) {
      ctx.strokeStyle = RecursionColorMapping[l.length-2]
      ctx.fillStyle = RecursionColorMapping[l.length-2]
      ctx.lineWidth = 1
      for(let i = 0; i < l.length - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(l[i].x, l[i].y)
        ctx.lineTo(l[i + 1].x, l[i + 1].y)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(l[i].x, l[i].y, 5, 0, Math.PI * 2)
        ctx.fill()
      }
      if(l.length === 1) continue
      ctx.beginPath()
      ctx.arc(l[l.length - 1].x, l[l.length - 1].y, 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  toBezier(p: number = this.t) {
    if(this.points.length < 1) return
    const bezierPoints: Vector2[] = []
    function recursiveLerp(self: Path, points: Vector2[], t: number, final: boolean = false) {
      if(points.length === 1) return points[0]
      const newPoints: Vector2[] = []
      for(let i = 0; i < points.length - 1; i++) newPoints.push(points[i].lerp(points[i + 1], t))
      if(final) self.fancyLines.push(newPoints)
      return recursiveLerp(self, newPoints, t, final)
    }

    for(let t = 0; t < 1; t+=this.bezierStep) {
      if(t+this.bezierStep >= p) {
        bezierPoints.push(recursiveLerp(this, this.points, p, true))
        this.bezierPoints = bezierPoints
        break;
      } else {
        this.fancyLines = []
        bezierPoints.push(recursiveLerp(this, this.points, t))
        // lines = this.fancyLines
      } 
    }

    this.bezierPoints = bezierPoints

    return bezierPoints
  }

}