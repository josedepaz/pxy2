define('pxy2/app', ['exports', 'ember', 'pxy2/resolver', 'ember-load-initializers', 'pxy2/config/environment'], function (exports, _ember, _pxy2Resolver, _emberLoadInitializers, _pxy2ConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _pxy2ConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pxy2ConfigEnvironment['default'].podModulePrefix,
    Resolver: _pxy2Resolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _pxy2ConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});