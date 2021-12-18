import Entity from "../../core/entity.js";
import Config from "../data/config.js";

export default class Enemy extends Entity {
  constructor(game, path) {
    super(game);

    this._speed = 100;
    this._path = path;
    this._view = null;
    this._nextPoint = null;

    this._init();
  }

  onUpdate() {
    const nextPoint = this._nextPoint;

    if (!nextPoint) {
      return;
    }

    const position = this.position;
    const nextPosition = nextPoint.position;
    const direction = nextPosition
      .clone()
      .sub(position);
    const distance = direction.getLength();
    direction.normalize();
    const movement = this._speed * this.game.time.dt;

    if (movement >= distance) {
      position.copyFrom(nextPosition);
      this._setupNextPoint();
    } else {
      position.addXY(direction.x * movement, direction.y * movement);
    }
  }

  _init() {
    this._initView();
    this._setupNextPoint();
  }

  _initView() {
    const size = Config.EnemySize;
    const view = this.game.create.rectangle(size, size, 'red');
    this._view = view;
    this.add(view);
  }

  _setupNextPoint() {
    const nextPoint = this._path.getNext(this._nextPoint);
    this._nextPoint = nextPoint;
  }
}