var App = (function AlarmPage(App, doc) {
  App.initAlarmPage = initAlarmPage;

  var html = `
    <div class="page-wrapper">
      <menu>
        <button class="link" id="add-alarm">Add alarm</button>
      </menu>
    </div>
  `;

  return App;

  // *************************

  function _enable() {
    doc
      .getElementById('add-alarm')
      .addEventListener('click', App.openConfigPageToAdd);
  }

  function initAlarmPage() {
    var page = doc.getElementById('alarm-page');
    page.insertAdjacentHTML('beforeend', html);
    _enable();
  }
})(App || {}, document);
