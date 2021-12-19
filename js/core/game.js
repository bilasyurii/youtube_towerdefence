import Renderer from "./renderer.js";
import Time from "./time.js";
import World from "./world.js";
import ScreenManager from "./screen/screen-manager.js";
import ObjectFactory from "./graphics/object-factory.js";
import Input from "./input/input.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.screen = null;
    this.time = null;
    this.world = null;
    this.renderer = null;
    this.create = null;
    this.input = null;

    this._init();
  }

  add(entity) {
    this.world.add(entity);
  }

  start() {
    this._raf();
  }

  _init() {
    this._initScreenManager();
    this._initTime();
    this._initWorld();
    this._initInput();
    this._initRenderer();
    this._initObjectFactory();
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

  _initInput() {
    this.input = new Input(this);
  }

  _initRenderer() {
    this.renderer = new Renderer(this);
  }

  _initObjectFactory() {
    this.create = new ObjectFactory(this);
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
