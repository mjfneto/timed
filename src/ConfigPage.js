var App = (function ConfigPage(App, doc) {
  var { $ } = App;
  App.initConfigPage = initConfigPage;
  App.openConfigPageToAdd = openConfigPageToAdd;
  App.openConfigPageToEdit = openConfigPageToEdit;
  App.closeConfigPage = closeConfigPage;

  var html = `
        <div class="page-wrapper">
            <menu>
                <button class="link" id="close-btn">Close</button>
            </menu>
            <div id="form-wrapper"></div>
        </div>
    `;

  return App;

  // ***********************

  function closeConfigPage() {
    doc.getElementById('form') && App.endTimerForm();
    var configPageClasses = doc.getElementById('config-page').classList;
    configPageClasses.contains('active') && configPageClasses.remove('active');
  }

  function _enable() {
    $('#close-btn').on('click', App.closeConfigPage);
  }

  function initConfigPage() {
    $('#config-page').insertHTML('beforeend', html);
    _enable();
  }

  function openConfigPageToAdd(e) {
    var [action, type] = e.target.id.split('-');

    type == 'timer' && App.initTimerForm(action);

    var configPageClasses = doc.getElementById('config-page').classList;
    !configPageClasses.contains('active') && configPageClasses.add('active');
  }

  function openConfigPageToEdit([type, id, action]) {
    type == 'timer' && App.initTimerForm(action, id);

    var configPageClasses = doc.getElementById('config-page').classList;
    !configPageClasses.contains('active') && configPageClasses.add('active');
  }
})(App || {}, document);
