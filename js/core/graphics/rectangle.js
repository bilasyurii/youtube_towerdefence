import Entity from "../entity.js";

export default class Rectangle extends Entity {
  constructor(game, width, height, fill) {
    super(game);

    this.width = 0;
    this.height = 0;
    this.fill = fill;

    this.setSize(width, height);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    const position = this.position;
    const { x, y } = position;
    this._selfBounds.set(x, x + width, y, y + height);
  }

  render(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}
