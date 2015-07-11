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
  var dom = (function __ut__() {
    function getSelectedText() {
      var text = ''; 

      if(window.getSelection) {
        text = window.getSelection().toString(); 
      } else if(document.selection && document.selection.type !== 'Control') {
        text = document.selection.createRange().text; 
      }

      return text;
    }

    function addClass(node, className) {
      if(node.classList) {
        node.classList.add(className); 
      } else {
        node.className += '' + className; 
      }
    }

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

    function getNodeTree(htmlStr) {
      var tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = htmlStr;
      return tmp.body.children;
    }

    function transferStyles(nodeFrom, nodeTo) {
      var cs = window.getComputedStyle(nodeFrom, null);
      var styles = {};
      var prop;

      for(var i = 0, l = cs.length; i < l; ++i) {
        prop = cs[i];
        styles[prop] = cs.getPropertyValue(prop);  
      }
      
      for(var key in styles) {
        nodeTo.style[key] = styles[key];    
      }
    }

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
      getSelectedText: getSelectedText,
      addClass: addClass,
      removeClass: removeClass,
      getNodeTree: getNodeTree,
      transferStyles: transferStyles,
      transferAttrs: transferAttrs
    };
  })();

  function Container(node) {
    this.node = node; 
  }

  function bind(node) {
    var container = dom.getNodeTree('<div class="moonbeamed"></div>')[0];
    var button = dom.getNodeTree('<a href="javascript:void(0)" class="btn">comment</a>')[0];

    dom.transferAttrs(node, container);

    container.appendChild(button);
    container.appendChild(node.cloneNode(true));

    button.addEventListener('click', function(e) {
      console.log(dom.getSelectedText()); 
    });

    node.parentNode.replaceChild(container, node);
  }

  return {
    bind: bind
  };
})();
