define('pxy2/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'pxy2/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _pxy2ConfigEnvironment) {

  var name = _pxy2ConfigEnvironment['default'].APP.name;
  var version = _pxy2ConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});