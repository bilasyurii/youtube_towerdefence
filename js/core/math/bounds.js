export default class Bounds {
  constructor() {
    this.left = Infinity;
    this.right = -Infinity;
    this.top = Infinity;
    this.bottom = -Infinity;
  }

  set(left, right, top, bottom) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    return this;
  }

  containsXY(x, y) {
    return !(
      x > this.right ||
      x < this.left ||
      y > this.bottom ||
      y < this.top
    );
  }

  extendsBounds(bounds) {
    this.left = Math.min(this.left, bounds.left);
    this.right = Math.max(this.right, bounds.right);
    this.top = Math.min(this.top, bounds.top);
    this.bottom = Math.max(this.bottom, bounds.bottom);
    return this;
  }

  translate(vec) {
    const { x, y } = vec;
    this.left += x;
    this.right += x;
    this.top += y;
    this.bottom += y;
    return this;
  }

  clone() {
    return new Bounds().set(this.left, this.right, this.top, this.bottom);
  }
}
