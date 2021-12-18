import Entity from "../../core/entity.js";
import Config from "../data/config.js";
import Enemy from "./enemy.js";
import EventEmitter from "../../core/events/event-emitter.js";

export default class EnemyBase extends Entity {
  constructor(game, path) {
    super(game);

    this.events = new EventEmitter();

    this._path = path;
    this._view = null;

    this._init();
  }

  spawnEnemy() {
    const enemy = new Enemy(this.game, this._path);
    this.events.emit('spawnEnemy', enemy);
  }

  _init() {
    this._initView();
  }

  _initView() {
    const size = Config.BaseSize;
    const view = this.game.create.rectangle(size, size, 'pink');
    this._view = view;
    this.add(view);
  }
}
