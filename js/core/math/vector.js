export default class Vector {
  constructor(x = 0, y = x) {
    this.x = x;
    this.y = y;
  }

  set(x, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }

  addXY(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  getLength() {
    const x = this.x;
    const y = this.y;
    return Math.sqrt(x * x + y * y);
  }

  normalize() {
    const lenInv = 1 / this.getLength();
    this.x = this.x * lenInv;
    this.y = this.y * lenInv;
    return this;
  }

  copyFrom(vec) {
    this.x = vec.x;
    this.y = vec.y;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}
