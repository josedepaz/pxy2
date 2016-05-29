QUnit.module('JSHint | routes/manager.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/manager.js should pass jshint.\nroutes/manager.js: line 14, col 10, Missing semicolon.\n\n1 error');
});
