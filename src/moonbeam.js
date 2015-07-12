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
    var container = dom.getNodeTree(tmpl.get('container'))[0];
    var button = dom.getNodeTree(tmpl.get('button'))[0];

    container.style.position = 'relative';
    button.style.position = 'absolute';
    button.style.top = '0';
    button.style.right = '5px';

    dom.transferAttrs(node, container);

    container.appendChild(button);
    container.appendChild(node.cloneNode(true));

    button.addEventListener('click', function(e) {
      var range = dom.getActiveRange();
      var wrapper = dom.getNodeTree('<span class="mb-hl"></span>')[0];
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
