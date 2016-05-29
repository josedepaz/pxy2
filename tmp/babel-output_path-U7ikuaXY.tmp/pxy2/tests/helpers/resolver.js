define('pxy2/tests/helpers/resolver', ['exports', 'pxy2/resolver', 'pxy2/config/environment'], function (exports, _pxy2Resolver, _pxy2ConfigEnvironment) {

  var resolver = _pxy2Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: _pxy2ConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pxy2ConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});