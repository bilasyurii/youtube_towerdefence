import Entity from "../../core/entity.js";
import Config from "../data/config.js";

export default class PathPoint extends Entity {
  constructor(game, vector) {
    super(game);

    this.vector = vector;
    this._view = null;

    this._init();
  }

  getCenter() {
    const halfSize = Config.PathSize * 0.5;
    return this.position.clone().addXY(halfSize, halfSize);
  }

  _init() {
    this._initView();
  }

  _initView() {
    const size = Config.PathSize;
    const view = this.game.create.rectangle(size, size, 'brown');
    this._view = view;
    this.add(view);
  }
}
