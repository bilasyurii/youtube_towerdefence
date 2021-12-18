import Vector from "./math/vector.js";

export default class Entity {
  constructor(game) {
    this.game = game;
    this.position = new Vector();
    this.parent = null;
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const children = this.children;
    children.splice(children.indexOf(child), 1);
  }

  update() {
    const children = this.children;
    const count = children.length;

    for (let i = 0; i < count; ++i) {
      children[i].update();
    }

    this.onUpdate();
  }

  render(ctx) {
    // may be implemented in derived classes
  }

  onUpdate() {
    // may be implemented in derived classes
  }
}
