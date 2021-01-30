// Custom event emitter 
class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === "undefined") {
      this.events[eventName]  = new Set();
    }
    return this.events[eventName];
  }

  once(eventName, fn) {
    const onceFn = (...args) => {
      this.removeListener(eventName, onceFn);
      fn.apply(this, args);
    }
    this.on(eventName, onceFn);
  }

  removeListener(event, fn) {
    this._getEventListByName(eventName).delete(fn);
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(fn => {
      fn.apply(this, args);
    });
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;