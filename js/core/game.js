import Renderer from "./renderer.js";
import Time from "./time.js";
import World from "./world.js";
import ScreenManager from "./screen/screen-manager.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.screen = null;
    this.time = null;
    this.world = null;
    this.renderer = null;

    this._init();
  }

  start() {
    console.log('wroom');
    this._raf();
  }

  _init() {
    this._initScreenManager();
    this._initTime();
    this._initWorld();
    this._initRenderer();
  }

  _initScreenManager() {
    this.screen = new ScreenManager(this.canvas);
  }

  _initTime() {
    this.time = new Time(this);
  }

  _initWorld() {
    this.world = new World(this);
  }

  _initRenderer() {
    this.renderer = new Renderer(this);
  }

  _raf() {
    requestAnimationFrame(() => this._tick());
  }

  _tick() {
    this.time.update();
    this.world.update();
    this.renderer.render();
    this._raf();
  }
}
