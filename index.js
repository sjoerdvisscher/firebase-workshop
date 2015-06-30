var Vue = require('vue')
var Firebase = require('./firebase.js')

var vueFire = require('vue-fire');
Vue.use(vueFire, { app: 'vivid-heat-8925' });

var appOptions = require('./app.vue')
var app = new Vue(appOptions).$mount('#app')
