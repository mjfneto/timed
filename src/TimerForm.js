var App = (function TimerForm(App, doc) {
  var { $ } = App;
  App.initTimerForm = initTimerForm;
  App.endTimerForm = endTimerForm;

  function _html(value) {
    return `
        <form id="form">
            <h2>Timer Form</h2>
            <div>
              <div>
                <label for="hours">Hours</label>
                <input id="hours" type="number" min="0" max="24" value=${
                  Array.isArray(value) ? value[0] : value
                } required></input>
              </div>
              <div>
                <label for="minutes">Minutes</label>
                <input id="minutes" type="number" min="0" max="60" value=${
                  Array.isArray(value) ? value[1] : value
                }></input>
              </div>
              <div>
                <label for="seconds">Seconds</label>
                <input id="seconds" type="number" min="0" max="60" value=${
                  Array.isArray(value) ? value[2] : value
                }></input>
              </div>
            </div>
            <input type="submit" value="Submit"></input>
        </form>
    `;
  }

  return App;

  // ***********************************

  function _disable() {
    $('#form')
      .off('submit', _submitToAdd)
      .off('submit', _submitToEdit);
  }

  function _enableAddition() {
    $('#form').on('submit', _submitToAdd);
  }

  function _enableEditing(id) {
    var form = $('#form');
    form.attr('dataset', { editing: id });
    form.on('submit', _submitToEdit);
  }

  function endTimerForm() {
    _disable();
    $('#form-wrapper').remove(doc.getElementById('form'));
  }

  function initTimerForm(action, id) {
    var timer = App.findTimer(id);

    $('#form-wrapper').insertHTML(
      'beforeend',
      _html(timer ? timer.display : 0)
    );

    action == 'edit' && _enableEditing(id);
    action == 'add' && _enableAddition();
  }

  function _submitToAdd(e) {
    e.preventDefault();
    var inputs = e.target.elements;

    var display = [];
    for (let { type, value } of inputs) {
      type == 'number' && (display = [...display, value]);
    }

    var total =
      inputs[0].value * 3.6 * 10e2 +
      inputs[1].value * 60 +
      Number(inputs[2].value);

    App.closeConfigPage();
    App.initTimerWidget(total, display);
  }

  function _submitToEdit(e) {
    e.preventDefault();
    var inputs = e.target.elements;

    var display = [];
    for (let { type, value } of inputs) {
      type == 'number' && (display = [...display, value]);
    }

    var total =
      inputs[0].value * 3.6 * 10e2 +
      inputs[1].value * 60 +
      Number(inputs[2].value);

    var id = Number(e.target.dataset.editing);

    App.closeConfigPage();
    App.editTimerWidget(id, total, display);
  }

  // *******************
})(App || {}, document);
