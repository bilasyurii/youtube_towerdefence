import Entity from "../core/entity.js";
import Vector from "../core/math/vector.js";
import Path from "./path/path.js";

export default class Gameplay extends Entity {
  constructor(game) {
    super(game);

    this.path = null;

    this._init();
  }

  _init() {
    this._initPath();
  }

  _initPath() {
    const path = new Path(this.game);
    this.path = path;
    this.add(path);

    path.addPoint(new Vector(1, 0));
    path.addPoint(new Vector(1, 1));
    path.addPoint(new Vector(1, 2));
    path.addPoint(new Vector(1, 3));
    path.addPoint(new Vector(2, 3));
    path.addPoint(new Vector(3, 3));
    path.addPoint(new Vector(3, 2));
    path.addPoint(new Vector(4, 2));
    path.addPoint(new Vector(5, 2));
    path.addPoint(new Vector(5, 3));
    path.addPoint(new Vector(5, 4));
    path.addPoint(new Vector(5, 5));
  }
}
