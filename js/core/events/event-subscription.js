export default class EventSubscription {
  constructor() {
    this.emitter = null;
    this.name = '';
    this.callback = null;
    this.context = null;
    this.once = false;
  }

  emit(...args) {
    this.callback.call(this.context, ...args);

    if (this.once === true) {
      this.detach();
    }
  }

  detach() {
    const emitter = this.emitter;

    if (emitter) {
      emitter.detachSubscription(this);
      this.emitter = null;
    }
  }
}