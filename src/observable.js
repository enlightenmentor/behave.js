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
 * Adds observable behavior to HTML element.
 * 
 * @param {HTMLElement} node
 * @param {boolean} [permanently=false] Indicates that behavior is added permanently
 * @returns {HTMLElement} Same HTML element but with additional functionality
 */
function observable(node, permanently=false) {
  if (permanently) {
    node.setAttribute('data-observable', '');
    node.on = on.bind(node);
    node.once = once.bind(node);
    return node;
  }
  return {
    on: on.bind(node),
    once: once.bind(node)
  }
}

export default observable;