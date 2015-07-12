/* 
 * tmpl | moonbeam.js
 *
 * Retrieve templates from the JS cache.
 */

var tmpl = (function __tmpl__() {
  /*
   * Retrieve template from cache by name
   *
   * @param {string} name - Template name
   */
  function get(name) {
    // We expect a global TEMPLATECACHE to exist
    return TEMPLATECACHE[name];  
  }

  return {
    get: get 
  };
})();
