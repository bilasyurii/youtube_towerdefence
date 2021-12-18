import Rectangle from "./rectangle.js";

export default class ObjectFactory {
  constructor(game) {
    this.game = game;
  }

  rectangle(width, height, fill) {
    return new Rectangle(this.game, width, height, fill);
  }
}
