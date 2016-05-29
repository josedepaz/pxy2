define('pxy2/tests/helpers/start-app', ['exports', 'ember', 'pxy2/app', 'pxy2/config/environment'], function (exports, _ember, _pxy2App, _pxy2ConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _pxy2ConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _pxy2App['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});