export class Vector2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  sub(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  mul(s: number) {
    return new Vector2(this.x * s, this.y * s)
  }

  div(s: number) {
    return new Vector2(this.x / s, this.y / s)
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    return this.div(this.mag())
  }

  lerp(v: Vector2, t: number) {
    return this.mul(1 - t).add(v.mul(t))
  }

  dot(v: Vector2) {
    return this.x * v.x + this.y * v.y
  }

  distance(v: Vector2) {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2)
  }
  
  difference(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  equal(v: Vector2) {
    return this.x === v.x && this.y === v.y
  }

  toArr() {
    return [this.x, this.y]
  }
}
