import Entity from "../../core/entity.js";
import Config from "../data/config.js";
import PathPoint from "./path-point.js";

export default class Path extends Entity {
  constructor(game) {
    super(game);

    this._points = [];
  }

  addPoint(vector) {
    const point = new PathPoint(this.game, vector);
    const size = Config.PathSize;
    point.position.set(vector.x * size, vector.y * size);
    this._points.push(point);
    this.add(point);
  }

  getNext(point) {
    const points = this._points;
    return points[points.indexOf(point) + 1];
  }
}
