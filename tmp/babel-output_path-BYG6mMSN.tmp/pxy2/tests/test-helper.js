define('pxy2/tests/test-helper', ['exports', 'pxy2/tests/helpers/resolver', 'ember-qunit'], function (exports, _pxy2TestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_pxy2TestsHelpersResolver['default']);
});