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