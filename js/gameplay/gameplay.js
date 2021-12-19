import Entity from "../core/entity.js";
import Vector from "../core/math/vector.js";
import Config from "./data/config.js";
import EnemyBase from "./enemy/enemy-base.js";
import Path from "./path/path.js";
import Tile from "./tiles/tile.js";
import TowerSelector from "./towers/tower-selector.js";

export default class Gameplay extends Entity {
  constructor(game) {
    super(game);

    this._path = null;
    this._enemyBase = null;
    this._selector = null;
    this._enemies = [];
    this._tiles = [];
    this._mapLayer = null;
    this._uiLayer = null;

    this._init();
  }

  _init() {
    this.position.addXY(100, 100);
    this._initLayers();
    this._initPath();
    this._initEnemyBase();
    this._initTiles();
    this._initSelector();
    this._setupEvents();

    this._enemyBase.spawnEnemy();
  }

  _initLayers() {
    const mapLayer = new Entity(this.game);
    this._mapLayer = mapLayer;
    this.add(mapLayer);

    const uiLayer = new Entity(this.game);
    this._uiLayer = uiLayer;
    this.add(uiLayer);
  }

  _initPath() {
    const path = new Path(this.game);
    this._path = path;
    this._mapLayer.add(path);

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
    this._mapLayer.add(base);
  }

  _initTiles() {
    const tilePositions = [
      new Vector(2, 0),
      new Vector(2, 1),
      new Vector(2, 2),
      new Vector(3, 1),
      new Vector(4, 1),
      new Vector(5, 1),
      new Vector(0, 1),
      new Vector(0, 2),
      new Vector(0, 3),
      new Vector(0, 4),
      new Vector(1, 4),
      new Vector(2, 4),
      new Vector(3, 4),
      new Vector(4, 3),
      new Vector(4, 4),
      new Vector(4, 5),
    ];
    const count = tilePositions.length;
    const size = Config.TileSize;
    const tiles = this._tiles;

    for (let i = 0; i < count; ++i) {
      const tilePos = tilePositions[i];
      const tile = new Tile(this.game);
      tiles.push(tile);
      tile.position.set(tilePos.x * size, tilePos.y * size);
      this._mapLayer.add(tile);
    }
  }

  _initSelector() {
    const selector = new TowerSelector(this.game);
    this._selector = selector;
    this._uiLayer.add(selector);
  }

  _setupEvents() {
    this._enemyBase.events.on('spawnEnemy', this._onEnemySpawned, this);
    const selectorEvents = this._selector.events;
    selectorEvents.on('towerSelected', this._onTowerSelected, this);
    selectorEvents.on('close', this._onSelectorClose, this);

    const tiles = this._tiles;
    const count = tiles.length;

    for (let i = 0; i < count; ++i) {
      tiles[i].events.on('down', this._onTileDown, this);
    }
  }

  _onEnemySpawned(enemy) {
    this._enemies.push(enemy);
    this._mapLayer.add(enemy);
  }

  _onTowerSelected(towerType) {
    console.log(towerType);
    this._selector.hide();
  }

  _onSelectorClose() {
    this._selector.hide();
  }

  _onTileDown(tile) {
    const selector = this._selector;

    if (selector.visible === true) {
      return;
    }

    selector.show();
    selector.position.copyFrom(tile.getCenter());
  }
}
