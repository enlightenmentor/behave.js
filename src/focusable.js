import observable from './observable.js';

/**
 * Adds focusable behavior to HTML element.
 * 
 * @param {HTMLElement} node
 * @param {number} [tabindex=-1] Value of tabindex attribute. Defaults to -1
 * @returns {HTMLElement} Same HTML element but with additional functionality
 */
function focusable(node, tabindex=-1) {
  node.setAttribute('data-focusable', '');
  node.setAttribute('tabindex', tabindex);
  const obs = observable(node);
  obs.on('focus', () => node.setAttribute('data-focused', ''));
  obs.on('blur', () => node.removeAttribute('data-focused'));
  return node;
}

export default focusable;