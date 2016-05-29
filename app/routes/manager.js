import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return [
            {
                url: 'http://localhost:8080',
                target: '/rm-server'
            },
            {
                url: 'http://localhost:3000',
                target: '/'
            }
        ]
    }
});
