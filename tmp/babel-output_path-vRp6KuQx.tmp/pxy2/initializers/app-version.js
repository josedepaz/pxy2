define('pxy2/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'pxy2/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _pxy2ConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_pxy2ConfigEnvironment['default'].APP.name, _pxy2ConfigEnvironment['default'].APP.version)
  };
});