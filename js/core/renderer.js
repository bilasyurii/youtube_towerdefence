import Vector from "./math/vector.js";

export default class Renderer {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = game.canvas.getContext('2d');
  }

  render() {
    this._resetTransform();
    this._clear();
    this._renderEntity(this.game.world, new Vector());
  }

  _resetTransform() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  _clear() {
    const canvas = this.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  _renderEntity(entity, parentOffset) {
    const offset = parentOffset.clone().add(entity.position);
    this.ctx.setTransform(1, 0, 0, 1, offset.x, offset.y);
    entity.render(this.ctx);

    const children = entity.children;
    const count = children.length;

    for (let i = 0; i < count; ++i) {
      this._renderEntity(children[i], offset);
    }
  }
}