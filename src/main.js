import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import axios from 'axios'

//开启mint-ui
Vue.use(MintUI);
Vue.config.productionTip = false;
//解决移动端点击延迟
FastClick.attach(document.body);
//继承axios
Vue.prototype.$axios = axios;

//路由卫士
router.beforeEach(function (to, from, next) {
  //解决路由跳转不在顶部的问题
  window.scrollTo(0, 0);
  //正常进入
  next()
});

//定制分享
router.afterEach((to, from, next) => {

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
