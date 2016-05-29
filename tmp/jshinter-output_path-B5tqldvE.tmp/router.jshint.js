QUnit.module('JSHint | router.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 9, col 34, Missing semicolon.\n\n1 error');
});
