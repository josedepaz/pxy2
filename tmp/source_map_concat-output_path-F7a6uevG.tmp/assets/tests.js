define('pxy2/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('pxy2/tests/electron', ['exports'], function (exports) {
    /* jshint undef: false */

    var _require = require('electron');

    var BrowserWindow = _require.BrowserWindow;
    var app = _require.app;

    var mainWindow = null;

    app.on('window-all-closed', function onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('ready', function onReady() {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600
        });

        delete mainWindow.module;

        if (process.env.EMBER_ENV === 'test') {
            mainWindow.loadURL('file://' + __dirname + '/index.html');
        } else {
            mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
        }

        mainWindow.on('closed', function onClosed() {
            mainWindow = null;
        });
    });

    /* jshint undef: true */
});
define('pxy2/tests/electron.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | electron.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'electron.js should pass jshint.');
  });
});
define('pxy2/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('pxy2/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('pxy2/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'pxy2/tests/helpers/start-app', 'pxy2/tests/helpers/destroy-app'], function (exports, _qunit, _pxy2TestsHelpersStartApp, _pxy2TestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _pxy2TestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _pxy2TestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('pxy2/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('pxy2/tests/helpers/resolver', ['exports', 'pxy2/resolver', 'pxy2/config/environment'], function (exports, _pxy2Resolver, _pxy2ConfigEnvironment) {

  var resolver = _pxy2Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: _pxy2ConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pxy2ConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('pxy2/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
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
define('pxy2/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('pxy2/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('pxy2/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('pxy2/tests/test-helper', ['exports', 'pxy2/tests/helpers/resolver', 'ember-qunit'], function (exports, _pxy2TestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_pxy2TestsHelpersResolver['default']);
});
define('pxy2/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('pxy2/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map