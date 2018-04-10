import observable from './observable.js';

/**
 * Adds focusable behavior to HTML element
 * 
 * @param {HTMLElement} node
 * @param {number} [tabindex=-1] Value of tabindex attribute. Defaults to -1
 * @returns {HTMLElement} Same HTML element but with additional functionality
 */
function focusable(node, tabindex) {
  tabindex = (tabindex == undefined) ? -1 : tabindex;
  node.setAttribute('data-focusable', '');
  node.setAttribute('tabindex', tabindex);
  const obs = observable(node);
  obs.on('focus', function() {
    this.setAttribute('data-focused', '');
  });
  obs.on('blur', function() {
    this.removeAttribute('data-focused');
  });
  return node;
}

export default focusable;