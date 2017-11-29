import Vue from 'vue'
import VueRouter from './jslib/vue-router'
import routes from './routes'
import $ from 'jquery'
import MintUI from 'mint-ui'
import './assets/js/LArea.min'

import 'mint-ui/lib/style.css'
import './assets/css/LArea.min.css'

window.$ = $

require('./jslib/UIAdapter');

Vue.use(VueRouter);
Vue.use(MintUI);

const router = new VueRouter({
    routes
});

new Vue({
    router,
}).$mount('#app');