define('pxy2/routes/manager', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            return [{
                url: 'http://localhost:8080',
                target: '/rm-server'
            }, {
                url: 'http://localhost:3000',
                target: '/'
            }];
        }
    });
});