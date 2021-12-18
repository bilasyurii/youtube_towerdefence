import EventSubscription from "./event-subscription.js";

export default class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(name, callback, context) {
    return this._on(name, callback, context, false);
  }

  once(name, callback, context) {
    return this._on(name, callback, context, true);
  }

  emit(name, ...args) {
    const subscriptions = this._events[name];

    if (!subscriptions) {
      return;
    }

    const count = subscriptions.length;

    for (let i = 0; i < count; ++i) {
      subscriptions[i].emit(...args);
    }
  }

  _on(name, callback, context, once) {
    const events = this._events;
    const subscription = new EventSubscription();
    subscription.emitter = this;
    subscription.name = name;
    subscription.callback = callback;
    subscription.context = context;
    subscription.once = once;

    let subscriptions = events[name];

    if (!subscriptions) {
      subscriptions = [];
      events[name] = subscriptions;
    }

    subscriptions.push(subscription);

    return subscription;
  }
}
