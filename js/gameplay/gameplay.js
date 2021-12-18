import Entity from "../core/entity.js";
import Vector from "../core/math/vector.js";
import EnemyBase from "./enemy/enemy-base.js";
import Path from "./path/path.js";

export default class Gameplay extends Entity {
  constructor(game) {
    super(game);

    this._path = null;
    this._enemyBase = null;
    this._enemies = [];

    this._init();
  }

  _init() {
    this._initPath();
    this._initEnemyBase();
    this._setupEvents();

    this._enemyBase.spawnEnemy();
  }

  _initPath() {
    const path = new Path(this.game);
    this._path = path;
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

  _initEnemyBase() {
    const base = new EnemyBase(this.game, this._path);
    this._enemyBase = base;
    this.add(base);
  }

  _setupEvents() {
    this._enemyBase.events.on('spawnEnemy', this._onEnemySpawned, this);
  }

  _onEnemySpawned(enemy) {
    this._enemies.push(enemy);
    this.add(enemy);
  }
}
