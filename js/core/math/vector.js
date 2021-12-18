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

  clone() {
    return new Vector(this.x, this.y);
  }
}
