import Rectangle from "./rectangle.js";
import Circle from "./circle.js";

export default class ObjectFactory {
  constructor(game) {
    this.game = game;
  }

  rectangle(width, height, fill) {
    return new Rectangle(this.game, width, height, fill);
  }

  circle(radius, fill) {
    return new Circle(this.game, radius, fill);
  }
}
