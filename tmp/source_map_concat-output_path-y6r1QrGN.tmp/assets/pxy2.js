"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

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
define('pxy2/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'pxy2/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _pxy2ConfigEnvironment) {

  var name = _pxy2ConfigEnvironment['default'].APP.name;
  var version = _pxy2ConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('pxy2/electron/browser-qunit-adapter', ['exports'], function (exports) {
    (function (window) {
        'use strict';

        // Exit immediately if we're not running in Electron
        if (!window.ELECTRON) {
            return;
        }

        function setQUnitAdapter(serverURL) {
            var socket = io(serverURL);

            socket.on('connect', function () {
                return socket.emit('browser-login', 'Electron', 1);
            });
            socket.on('start-tests', function () {
                socket.disconnect();
                window.location.reload();
            });

            qunitAdapter(socket);
        }

        // Adapted from Testem's default qunit-adapter.
        function qunitAdapter(socket) {
            var currentTest = undefined,
                currentModule = undefined;
            var id = 1;
            var results = {
                failed: 0,
                passed: 0,
                total: 0,
                skipped: 0,
                tests: []
            };

            QUnit.log(function (details) {
                var item = {
                    passed: details.result,
                    message: details.message
                };

                if (!details.result) {
                    item.actual = details.actual;
                    item.expected = details.expected;
                }

                currentTest.items.push(item);
            });

            QUnit.testStart(function (details) {
                currentTest = {
                    id: id++,
                    name: (currentModule ? currentModule + ': ' : '') + details.name,
                    items: []
                };
                socket.emit('tests-start');
            });

            QUnit.testDone(function (details) {
                currentTest.failed = details.failed;
                currentTest.passed = details.passed;
                currentTest.total = details.total;

                results.total++;

                if (currentTest.failed > 0) {
                    results.failed++;
                } else {
                    results.passed++;
                }

                results.tests.push(currentTest);
                socket.emit('test-result', currentTest);
            });

            QUnit.moduleStart(function (details) {
                currentModule = details.name;
            });

            QUnit.done(function (details) {
                results.runDuration = details.runtime;
                socket.emit('all-test-results', results);
            });
        }

        window.addEventListener('load', function () {
            setQUnitAdapter(process.env.ELECTRON_TESTEM_SERVER_URL);
        });
    })(this);
});
define('pxy2/electron/reload', ['exports'], function (exports) {
    /* jshint browser: true */
    (function () {
        'use strict';

        // Exit immediately if we're not running in Electron
        if (!window.ELECTRON) {
            return;
        }

        // Reload the page when anything in `dist` changes
        var fs = window.requireNode('fs');
        var path = window.requireNode('path');

        /**
         * Watch a given directory for changes and reload
         * on change
         * 
         * @param sub directory
         */
        var watch = function watch(sub) {
            var dirname = __dirname || path.resolve(path.dirname());
            var isInTest = !!window.QUnit;

            if (isInTest) {
                // In tests, __dirname is `<project>/tmp/<broccoli-dist-path>/tests`.
                // In normal `ember:electron` it's `<project>/dist`.
                // To achieve the regular behavior in testing, go to parent dir, which contains `tests` and `assets`
                dirname = path.join(dirname, '..');
            }

            if (sub) {
                dirname = path.join(dirname, sub);
            }

            fs.watch(dirname, { recursive: true }, function (e) {
                window.location.reload();
            });
        };

        /**
         * Install Devtron in the current window.
         */
        var installDevtron = function installDevtron() {
            var devtron = window.requireNode('devtron');

            if (devtron) {
                devtron.install();
            }
        };

        document.addEventListener('DOMContentLoaded', function (e) {
            var dirname = __dirname || path.resolve(path.dirname());

            fs.stat(dirname, function (err, stat) {
                if (!err) {
                    watch();

                    // On linux, the recursive `watch` command is not fully supported:
                    // https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener
                    //
                    // However, the recursive option WILL watch direct children of the
                    // given directory.  So, this hack just manually sets up watches on
                    // the expected subdirs -- that is, `assets` and `tests`.
                    if (process.platform === 'linux') {
                        watch('/assets');
                        watch('/tests');
                    }
                }
            });

            installDevtron();
        });
    })();
});
define('pxy2/electron/tap-qunit-adapter', ['exports'], function (exports) {
    (function (window) {
        'use strict';

        // Exit immediately if we're not running in Electron
        if (!window.ELECTRON) {
            return;
        }

        // Log QUnit results to the console so they show up
        // in the `Electron` process output.
        function log(content) {
            console.log('[qunit-logger] ' + content);
            window.process.stdout.write('[qunit-logger] ' + content);
        }

        function setQUnitAdapter() {
            var testCount = 0;

            QUnit.begin(function (details) {
                if (details.totalTests >= 1) {
                    log('1..' + details.totalTests);
                }
            });

            QUnit.testDone(function (details) {
                testCount++;
                if (details.failed === 0) {
                    log('ok ' + testCount + ' - ' + details.module + ' # ' + details.name);
                }
            });

            QUnit.log(function (details) {
                if (details.result !== true) {
                    var actualTestCount = testCount + 1;
                    log('# ' + JSON.stringify(details));
                    log('not ok ' + actualTestCount + ' - ' + details.module + ' - ' + details.name);
                }
            });

            QUnit.done(function (details) {
                log('# done' + (details.failed === 0 ? '' : ' with errors'));
            });
        }

        window.addEventListener('load', setQUnitAdapter);
    })(this);
});
define('pxy2/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('pxy2/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('pxy2/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'pxy2/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _pxy2ConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_pxy2ConfigEnvironment['default'].APP.name, _pxy2ConfigEnvironment['default'].APP.version)
  };
});
define('pxy2/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('pxy2/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('pxy2/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('pxy2/initializers/export-application-global', ['exports', 'ember', 'pxy2/config/environment'], function (exports, _ember, _pxy2ConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_pxy2ConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _pxy2ConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_pxy2ConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('pxy2/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('pxy2/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('pxy2/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("pxy2/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('pxy2/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('pxy2/router', ['exports', 'ember', 'pxy2/config/environment'], function (exports, _ember, _pxy2ConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _pxy2ConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('help', { path: '/' });
  });

  exports['default'] = Router;
});
define('pxy2/routes/help', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('pxy2/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("pxy2/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "pxy2/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "mdl-layout mdl-js-layout mdl-layout--fixed-header");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        dom.setAttribute(el2, "class", "mdl-layout__header mdl-layout__header--scroll mdl-color--blue-200");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout--large-screen-only mdl-layout__header-row");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createTextNode("reverse proxy");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("main");
        dom.setAttribute(el2, "class", "mdl-layout__content");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout__tab-panel is-active");
        dom.setAttribute(el3, "id", "overview");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [9, 10], [9, 20]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("pxy2/templates/help", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "pxy2/templates/help.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('pxy2/config/environment', ['ember'], function(Ember) {
  var prefix = 'pxy2';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("pxy2/app")["default"].create({"name":"pxy2","version":"0.0.0+7b0f5655"});
}

/* jshint ignore:end */
//# sourceMappingURL=pxy2.map