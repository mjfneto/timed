var App = (function TimerPage(App) {
  var { $ } = App;
  App.initTimerPage = initTimerPage;
  App.findTimer = findTimer;
  App.removeTimer = removeTimer;
  App.timers = [];

  var html = `
    <div class="page-wrapper">
      <menu>
        <button class="link" id="add-timer">Add timer</button>
      </menu>
      <main id="timers"></main>
    </div>
  `;

  return App;

  // *************************

  function _enable() {
    $('#add-timer').on('click', App.openConfigPageToAdd);
  }

  function findTimer(id) {
    return App.timers.find(matchId);

    // *****************

    function matchId(timer) {
      return timer.id == id;
    }
  }

  function removeTimer(id) {
    App.timers = App.timers.filter(exceptId);

    // *******************

    function exceptId(timer) {
      return timer.id !== id;
    }
  }

  function initTimerPage() {
    $('#timer-page').insertHTML('beforeend', html);
    _enable();
  }
})(App || {});
