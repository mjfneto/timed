var App = (function StopwatchPage(App, doc) {
  App.initStopwatchPage = initStopwatchPage;

  var html = `
    <div class="page-wrapper">
      <menu>
        <button class="link" id="add-stopwatch">Add stopwatch</button>
      </menu>
    </div>
  `;

  return App;

  // *************************

  function _enable() {
    doc
      .getElementById('add-stopwatch')
      .addEventListener('click', App.openConfigPageToAdd);
  }

  function initStopwatchPage() {
    var page = doc.getElementById('stopwatch-page');
    page.insertAdjacentHTML('beforeend', html);
    _enable();
  }
})(App || {}, document);
