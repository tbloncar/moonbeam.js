/**
 *
 *   __ _  ___  ___  ___  / /  ___ ___ ___ _ 
 *  /  ' \/ _ \/ _ \/ _ \/ _ \/ -_) _ `/  ' \
 * /_/_/_/\___/\___/_//_/_.__/\__/\_,_/_/_/_/
 *                                          
 * moonbeam.js | version 0.0.1
 * (c) Travis Loncar (https://github.com/tbloncar)
 */

var moonbeam = (function __moonbeam__() {
  /*
   * Bind moonbeam to a containing element
   *
   * @param {Element} node - The text container node
   */
  function bind(node) {
    var container = dom.createNodeTree(tmpl.get('container'));
    var button = dom.createNodeTree(tmpl.get('button'));

    dom.transferAttrs(node, container);

    container.appendChild(button);
    container.appendChild(node.cloneNode(true));

    button.addEventListener('click', function(e) {
      var range = dom.getActiveRange();
      var wrapper = dom.createNodeTree(tmpl.get('highlight'));
      var node;

      // Handle double click
      wrapper.addEventListener('dblclick', function(e) {
        var parentNode = wrapper.parentNode;
        console.log(wrapper.childNodes);

        parentNode.replaceChild(wrapper.childNodes[0], wrapper);
        parentNode.normalize();
      });

      wrapper.addEventListener('click', function(e) {
                    
      });

      if(range) {
        console.log(range.toString());
        range.surroundContents(wrapper);
      }
    });

    node.parentNode.replaceChild(container, node);
  }

  return {
    bind: bind
  };
})();
