import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../public/motion.js', import.meta.url), 'utf8');

function harness(reduced = false) {
  const listeners = new Map(), observers = [], frames = new Map(), values = new Map();
  const classes = new Set();
  const media = { matches: reduced, addEventListener(_event, callback) { this.change = callback; } };
  const mobile = { matches: false, addEventListener() {} };
  let top = 0, frameId = 0;
  const hero = {
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    style: { setProperty: (name, value) => values.set(name, value) },
    removeAttribute: () => values.clear(),
    getBoundingClientRect: () => ({ top, height: 1000 }),
  };
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    unobserve() {}
    disconnect() { this.disconnected = true; }
  }
  const window = {
    innerHeight: 800, IntersectionObserver: Observer,
    matchMedia: query => query.includes('reduced') ? media : mobile,
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: event => listeners.delete(event),
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId; },
  };
  vm.runInNewContext(source, {
    window, document: { querySelector: () => hero, querySelectorAll: () => [] },
    IntersectionObserver: Observer, cancelAnimationFrame: id => frames.delete(id),
  });
  return {
    observers, values, classes, listeners, media, frames,
    scrollTo(value) { top = -value; listeners.get('scroll')?.(); },
    flush() { const queue = [...frames.values()]; frames.clear(); queue.forEach(callback => callback()); },
  };
}

test('reduced motion never initializes scroll effects or observers', () => {
  const h = harness(true);
  assert.equal(h.observers.length, 0);
  assert.equal(h.values.size, 0);
  assert.equal(h.classes.size, 0);
  assert.equal(h.listeners.has('scroll'), false);
});

test('scroll motion is bounded and repeated scroll events share one frame', () => {
  const h = harness();
  h.observers[0].callback([{ isIntersecting: true }]);
  h.scrollTo(400); h.scrollTo(400); h.flush();
  assert.equal(h.values.get('--portrait-scale'), '1.0175');
  assert.equal(h.values.get('--headline-y'), '-12.00px');
  h.scrollTo(100000); h.flush();
  assert.equal(h.values.get('--portrait-scale'), '1.0350');
  assert.equal(h.values.get('--headline-y'), '-24.00px');
  assert.equal(h.values.get('--mobile-y'), '-6.00px');
  assert.equal(h.frames.size, 0);
  h.observers[0].callback([{ isIntersecting: false }]);
  assert.equal(h.listeners.has('scroll'), false);
});

test('changing to reduced motion immediately clears transforms and pending frames', () => {
  const h = harness();
  h.observers[0].callback([{ isIntersecting: true }]);
  h.scrollTo(200);
  h.media.matches = true; h.media.change();
  assert.equal(h.frames.size, 0);
  assert.equal(h.values.size, 0);
  assert.equal(h.classes.size, 0);
  assert.equal(h.listeners.has('scroll'), false);
  assert.ok(h.observers.every(observer => observer.disconnected));
});
