var App = (function Helpers(App) {
  App.$ = $;

  return App;

  // ***************************

  function $(selector, context = document) {
    var elements = Array.from(context.querySelectorAll(selector));

    return {
      elements,
      attr,
      on,
      off,
      insertHTML,
      remove,
      txt
    };

    function attr(attribute, value) {
      this.elements.forEach(setAttr);

      return this;

      // *****************

      function setAttr(el) {
        typeof value == 'string' && (el[attribute] = value);
        isObject(el[attribute]) && Object.assign(el[attribute], value);
      }

      function isObject(a) {
        return a instanceof Object && typeof a == 'object';
      }
    }

    function insertHTML(position, text) {
      this.elements.forEach(element => {
        element.insertAdjacentHTML(position, text);
      });

      return this;
    }

    function on(event, handler, options) {
      this.elements.forEach(addEvent);

      return this;

      // *****************************

      function addEvent(el) {
        el.addEventListener(event, handler, options);
      }
    }

    function off(event, handler, options) {
      this.elements.forEach(addEvent);

      return this;

      // *****************************

      function addEvent(el) {
        el.removeEventListener(event, handler, options);
      }
    }

    function remove(child) {
      !child && this.elements.forEach(removeSelf);
      child && this.elements.forEach(removeChild);

      return this;

      // ********************

      function removeSelf(el) {
        el.remove();
      }

      function removeChild(el) {
        el.removeChild(child);
      }
    }

    function txt(text) {
      this.elements.forEach(changeText);

      return this;

      // *************

      function changeText(el) {
        el.innerText = text;
      }
    }
  }
})(App || {});
