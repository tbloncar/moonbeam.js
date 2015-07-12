/* 
 * dom | moonbeam.js
 *
 * DOM helpers inspired by youmightnotneedjquery.com
 */

var dom = (function __ut__() {
  function _getCurrentSelection() {
    var selection;

    if(window.getSelection) {
      selection = window.getSelection();
    } else if(document.selection && document.selection.type !== 'Control') {
      selection = document.selection; 
    }

    return selection;
  }

  /*
   * Add a class to an element
   *
   * @param {Element} node - The element
   * @param {string} className - The class name
   */
  function addClass(node, className) {
    if(node.classList) {
      node.classList.add(className); 
    } else {
      node.className += '' + className; 
    }
  }

  /*
   * Remove a class (or all classes) from
   * an element.
   *
   * @param {Element} node - The element
   * @param {string|boolean} className - The class name or true (remove all classes)
   */
  function removeClass(node, className) {
    if(node.classList) {
      if(className === true) {
        node.classList = []; 
      } else {
        node.classList.remove(className);
      }
    } else {
      if(className === true) {
        node.className = ''; 
      } else {
        node.className = node.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
  }

  /*
   * Create a node tree from an HTML string.
   * Returns top-level node.
   *
   * @param {string} htmlStr - The HTML string
   */
  function createNodeTree(htmlStr) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = htmlStr;
    return tmp.body.children[0];
  }

  /*
   * Get the current range
   */
  function getActiveRange() {
    var selection = _getCurrentSelection();
    var range; 
    
    if(selection.rangeCount > 0) {
      range = selection.getRangeAt(0); 
    }

    return range;
  }

  /*
   * Transfer ID and class attributes from one element
   * to another
   *
   * @param {Element} nodeFrom - The element to transfer from
   * @param {Element} nodeTo - The element to transfer to
   */
  function transferAttrs(nodeFrom, nodeTo) {
    var id = nodeFrom.getAttribute('id');
    var classStr = nodeFrom.getAttribute('class');
    var classes = classStr ? classStr.split(' ') : [];

    nodeTo.setAttribute('id', nodeFrom.getAttribute('id'));
    for(var i = 0, l = classes.length; i < l; ++i) {
      addClass(nodeTo, classes[i]);
    }

    nodeFrom.setAttribute('id', '');
    removeClass(nodeFrom, true);
  }

  return {
    addClass: addClass,
    removeClass: removeClass,
    createNodeTree: createNodeTree,
    transferAttrs: transferAttrs,
    getActiveRange: getActiveRange
  };
})();
