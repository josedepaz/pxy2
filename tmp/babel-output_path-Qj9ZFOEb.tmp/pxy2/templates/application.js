define("pxy2/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
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
        dom.setAttribute(el2, "class", "mdl-layout__header mdl-layout__header--scroll mdl-color--primary");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout--large-screen-only mdl-layout__header-row");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout--large-screen-only mdl-layout__header-row");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createTextNode("Name & Title");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout--large-screen-only mdl-layout__header-row");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#overview");
        dom.setAttribute(el4, "class", "mdl-layout__tab is-active");
        var el5 = dom.createTextNode("Overview");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#features");
        dom.setAttribute(el4, "class", "mdl-layout__tab");
        var el5 = dom.createTextNode("Features");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#features");
        dom.setAttribute(el4, "class", "mdl-layout__tab");
        var el5 = dom.createTextNode("Details");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#features");
        dom.setAttribute(el4, "class", "mdl-layout__tab");
        var el5 = dom.createTextNode("Technology");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#features");
        dom.setAttribute(el4, "class", "mdl-layout__tab");
        var el5 = dom.createTextNode("FAQ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent");
        dom.setAttribute(el4, "id", "add");
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "material-icons");
        dom.setAttribute(el5, "role", "presentation");
        var el6 = dom.createTextNode("add");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "visuallyhidden");
        var el6 = dom.createTextNode("Add");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
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
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1, "id", "title");
        var el2 = dom.createTextNode("Pxy2");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [25, 0], [25, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});