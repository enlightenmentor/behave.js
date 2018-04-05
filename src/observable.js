/**
 * @typedef {Object} observable
 * @property {Function} on Adds event listener on HTML element
 * @property {Function} once Adds one time event listener on HTML element
 */

/**
 * Adds event listener on HTML element
 * 
 * @param {string} event
 * @param {Function} cb
 * @returns {Function} Function that removes event listener from HTML element
 */
function on(event, cb) {
  this.addEventListener(event, cb);
  return () => this.removeEventListener(event, cb);
}

/**
 * Adds one time event listener on HTML element
 * 
 * @param {string} event
 * @returns {Promise} Promise that is triggered by event
 */
function once(event) {
  return new Promise(resolve => {
      const cb = () => {
        this.removeEventListener(event, cb);
        resolve();
      };
      this.addEventListener(event, cb);
  })
}

/**
 * Emits custom event from HTML element
 * 
 * @param {string} event
 * @param {any} detail
 * @param {any} options
 */
function emit(event, detail, options) {
  const customEvent = new CustomEvent(event, Object.assign({
    detail
  }, options))
  this.dispatchEvent(customEvent);
}

/**
 * Adds observable behavior to HTML element.
 * 
 * @param {EventTarget} node
 * @param {boolean} [permanently=false] Indicates that behavior is added permanently. Defaults to false
 * @returns {(observable|EventTarget)} Object or the same HTML element with additional functionality
 */
function observable(node, permanently=false) {
  if (permanently) {
    node.setAttribute('data-observable', '');
    node.on = on.bind(node);
    node.once = once.bind(node);
    node.emit = emit.bind(node);
    return node;
  }
  return {
    on: on.bind(node),
    once: once.bind(node),
    emit: emit.bind(node)
  }
}

export default observable;