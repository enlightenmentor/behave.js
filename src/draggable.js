import observable from './observable.js';

/**
 * Produces dragging event details object
 * 
 * @param {Event} e
 * @param {number} sX
 * @param {number} sY
 * @param {number} pX
 * @param {number} pY
 * @returns {Object} Dragging event details
 */
function dragEventDetail(e, sX, sY, pX, pY) {
  return {
    x: e.x,
    y: e.y,
    clientX: e.clientX,
    clientY: e.clientY,
    layerX: e.layerX,
    layerY: e.layerY,
    offsetX: e.offsetX,
    offsetY: e.offsetY,
    pageX: e.pageX,
    pageY: e.pageY,
    screenX: e.screenX,
    screenY: e.screenY,
    movementX: e.x - sX,
    movementY: e.y - sY,
    diffX: e.x - pX,
    diffY: e.y - pY
  };
}

/**
 * Adds draggable behavior to HTML element
 * 
 * @param {HTMLElement} node
 * @returns {HTMLElement} Same HTML element but with additional functionality
 */
function draggable(node) {
  node.setAttribute('data-draggable', '');
  const nodeObs = observable(node);
  const windObs = observable(window);
  
  nodeObs.on('mousedown', function(e) {
    if (e.which === 1) {
      const sX = e.x;
      const sY = e.y;
      let pX = e.x;
      let pY = e.y;

      const moveOff = windObs.on('mousemove', function(e) {
        e.preventDefault();
        nodeObs.emit('dragging', dragEventDetail(e, sX, sY, pX, pY), {
          bubbles: true,
          cancelable: true
        });
        pX = e.x;
        pY = e.y;
      });
      const upOff = windObs.on('mouseup', function(e) {
        moveOff();
        upOff();
        pX = null;
        pY = null;
        nodeObs.emit('draggingend', dragEventDetail(e, sX, sY, pX, pY), {
          bubbles: true,
          cancelable: true
        });
      });

      nodeObs.emit('draggingstart', dragEventDetail(e, sX, sY, pX, pY), {
        bubbles: true,
        cancelable: true
      });
    }
  });

  return node;
}

export default draggable;