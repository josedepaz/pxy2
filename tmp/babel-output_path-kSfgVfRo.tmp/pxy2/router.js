define('pxy2/router', ['exports', 'ember', 'pxy2/config/environment'], function (exports, _ember, _pxy2ConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _pxy2ConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('help', { path: '/' });
  });

  exports['default'] = Router;
});