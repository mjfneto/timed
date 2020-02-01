var App = (function App(App, doc, win) {
  var { $ } = App;
  App.init = init;

  var html = `
    <menu id="page-menu">
        <ul>
            <li class="link active" id="timer">Timer</li>
            <li class="link" id="stopwatch">Stopwatch</li>
            <li class="link" id="alarm">Alarm</li>
        </ul>
    </menu>
    <main>
      <div class="page" id="config-page"></div>
      <div class="page active" id="timer-page"></div>
      <div class="page" id="stopwatch-page"></div>
      <div class="page" id="alarm-page"></div>
    </main>
  `;

  win.addEventListener('load', App.init);

  return App;

  // ************************

  function _enable() {
    $('#page-menu li').on('click', _handlePageSelection);
    $('#page-menu li').on('click', _handleItemSelection);
  }

  function _handleItemSelection(e) {
    var items = doc.querySelectorAll('#page-menu li');
    items.forEach(activateItem);

    // **********************

    function activateItem(item) {
      if (item.id == e.target.id) {
        !item.classList.contains('active') && item.classList.add('active');
        return;
      }

      item.classList.contains('active') && item.classList.remove('active');
    }
  }

  function _handlePageSelection(e) {
    var pages = doc.querySelectorAll('.page');

    App.closeConfigPage();

    pages.forEach(matchActivePageToClickedItem);

    // **********************

    function matchActivePageToClickedItem(page) {
      var pageId = page.id.replace('-page', '');
      if (pageId == e.target.id) {
        !page.classList.contains('active') && page.classList.add('active');
        return;
      }

      page.classList.contains('active') && page.classList.remove('active');
    }
  }

  function init() {
    $('#app').insertHTML('beforeend', html);
    _enable();

    App.initConfigPage();
    App.initTimerPage();
    App.initStopwatchPage();
    App.initAlarmPage();
  }
})(App || {}, document, window);
