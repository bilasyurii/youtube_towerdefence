import Entity from "../entity.js";

export default class Circle extends Entity {
  constructor(game, radius, fill) {
    super(game);

    this.radius = 0;
    this.fill = fill;

    this.setRadius(radius);
  }

  setRadius(radius) {
    this.radius = radius;
    const position = this.position;
    const { x, y } = position;
    this._selfBounds.set(x - radius, x + radius, y - radius, y + radius);
  }

  render(ctx) {
    const position = this.position;
    ctx.beginPath();
    ctx.arc(position.x, position.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
}
