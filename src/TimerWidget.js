var App = (function TimerWidget(App) {
  var { $ } = App;
  App.initTimerWidget = initTimerWidget;
  App.editTimerWidget = editTimerWidget;
  App.lastId = 0;

  function _html(id, time) {
    return `
        <div class="widget" id="timer-${id}">
            <p id="timer-${id}-display">${_secondsToTimerFormat(time)}</p>
            <div>
              <button id="timer-${id}-start">▶️</button>
              <button id="timer-${id}-pause">⏸️</button>
              <button id="timer-${id}-reset">🔄️</button>
              <button id="timer-${id}-edit">✏️</button>
              <button id="timer-${id}-remove">✖️</button>
            </div>
        </div>
    `;
  }

  return App;

  // ************************************

  function editTimerWidget(id, time, display) {
    var { prefixedId } = App.findTimer(id);
    App.timers = App.timers.map(matchId);

    $(prefixedId + '-start').on('click', _start);
    $(prefixedId + '-edit').on('click', _edit);
    $(prefixedId + '-remove').on('click', _disable);

    $(prefixedId + '-display').txt(_secondsToTimerFormat(time));

    // ******************************

    function matchId(timer) {
      if (timer.id == id) {
        timer.time = time;
        timer.elapsed = time;
        timer.display = display;
        timer.interval = null;
      }
      return timer;
    }
  }

  function _disable(e) {
    var [, id] = e.target.id.split('-');
    var timer = App.findTimer(id);
    var { prefixedId, interval } = timer;

    if (interval) {
      timer.interval = null;
      clearInterval(interval);
    }

    _shutDown(prefixedId);

    $(prefixedId).remove();

    App.removeTimer(Number(id));
  }

  function _edit(e) {
    var [, id] = e.target.id.split('-');
    var timer = App.findTimer(id);
    var { prefixedId, interval } = timer;

    _shutDown(prefixedId);

    if (interval) {
      clearInterval(interval);
      timer.interval = null;
    }

    App.openConfigPageToEdit(e.target.id.split('-'));
  }

  function _enable(id) {
    var { prefixedId } = App.findTimer(id);

    $(prefixedId + '-start').on('click', _start);
    $(prefixedId + '-edit').on('click', _edit);
    $(prefixedId + '-remove').on('click', _disable);
  }

  function initTimerWidget(time, display) {
    var id = App.lastId++;
    App.timers = [
      ...App.timers,
      {
        id,
        time,
        prefixedId: `#timer-${id}`,
        elapsed: time,
        display,
        interval: null
      }
    ];

    $('#timers').insertHTML('beforeend', _html(id, time));
    _enable(id);
  }

  function _pause(e) {
    var [, id] = e.target.id.split('-');
    var timer = App.findTimer(id);
    var { prefixedId, interval } = timer;

    $(prefixedId + '-start').on('click', _start);
    $(prefixedId + '-pause').off('click', _pause);

    clearInterval(interval);
    timer.interval = null;
  }

  function _reset(e) {
    var [, id] = e.target.id.split('-');
    var timer = App.findTimer(id);
    var { prefixedId, interval } = timer;

    $(prefixedId + '-start').on('click', _start);
    $(prefixedId + '-reset').off('click', _reset);

    clearInterval(interval);
    timer.interval = null;

    timer.elapsed !== timer.time && (timer.elapsed = timer.time);
    $(`#timer-${id}-display`).txt(_secondsToTimerFormat(timer.time));
  }

  function _secondsToTimerFormat(sec) {
    let toTimerFormat = (num, zeros = 2) => ('00' + num).slice(-zeros);
    return (
      toTimerFormat((sec / 3600) | 0) +
      ':' +
      toTimerFormat(((sec % 3600) / 60) | 0) +
      ':' +
      toTimerFormat(sec % 60 | 0)
    );
  }

  function _shutDown(prefixedId) {
    $(prefixedId + '-start').off('click', _start);
    $(prefixedId + '-pause').off('click', _pause);
    $(prefixedId + '-reset').off('click', _reset);
    $(prefixedId + '-edit').off('click', _edit);
    $(prefixedId + '-remove').off('click', _disable);
  }

  function _start(e) {
    var [, id] = e.target.id.split('-');
    var timer = App.findTimer(id);
    var { prefixedId } = timer;

    timer.interval = setInterval(_decrease, 1000);

    $(prefixedId + '-start').off('click', _start);
    $(prefixedId + '-pause').on('click', _pause);
    $(prefixedId + '-reset').on('click', _reset);

    // ***********

    function _decrease() {
      $(`#timer-${id}-display`).txt(_secondsToTimerFormat(--timer.elapsed));
    }
  }
})(App || {});
