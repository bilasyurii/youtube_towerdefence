import InputHandler from "./input/input-handler.js";
import Bounds from "./math/bounds.js";
import Vector from "./math/vector.js";

export default class Entity {
  constructor(game) {
    this.game = game;
    this.visible = true;
    this.position = new Vector();
    this.worldPosition = new Vector();
    this.parent = null;
    this.children = [];
    this.input = null;
    this._selfBounds = new Bounds();
  }

  get worldVisible() {
    if (this.visible === false) {
      return false;
    }

    const parent = this.parent;

    if (parent) {
      return parent.worldVisible;
    }

    return true;
  }

  add(child) {
    child.parent = this;
    this.children.push(child);
  }

  remove(child) {
    child.parent = null;
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

  getBounds() {
    const children = this.children;
    const count = children.length;

    if (count === 0) {
      return this._selfBounds.clone();
    }

    const bounds = this._selfBounds.clone();

    for (let i = 0; i < count; ++i) {
      const childBounds = children[i].getBounds();
      bounds.extendsBounds(childBounds);
    }

    return bounds;
  }

  getWorldBounds() {
    const bounds = this.getBounds();
    this.updateWorldPosition();
    bounds.translate(this.worldPosition);
    return bounds;
  }

  updateWorldPosition() {
    const parent = this.parent;

    if (!parent) {
      this.worldPosition.copyFrom(this.position);
    } else {
      parent.updateWorldPosition();
      this.worldPosition
        .copyFrom(parent.worldPosition)
        .add(this.position);
    }
  }

  alignAnchor(x = 0.5, y = x) {
    const bounds = this.getBounds();
    this.position.set(bounds.width * -x, bounds.height * -y);
  }

  getCenter() {
    const bounds = this.getBounds();
    return this.position
      .clone()
      .addXY(bounds.width * 0.5, bounds.height * 0.5);
  }

  addInput() {
    const handler = new InputHandler(this);
    this.input = handler;
  }

  render(ctx) {
    // may be implemented in derived classes
  }

  onUpdate() {
    // may be implemented in derived classes
  }
}
