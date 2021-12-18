import Entity from "../entity.js";

export default class Rectangle extends Entity {
  constructor(game, width, height, fill) {
    super(game);

    this.width = width;
    this.height = height;
    this.fill = fill;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}
