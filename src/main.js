// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import axios from 'axios'
import Qs from 'qs'
import router from './router'


Vue.prototype.$Qs = Qs;
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios;

//const routers = new Proxy(routers,{});

/* eslint-disable no-new */
new Promise((resolve)=>{resolve()}).then(()=>{
	let a = new Vue({
		  el: '#app',
		  router,
		  components: { App },
		  template: '<App/>'
		})
	let b =a._route.matched;
	let c = Reflect.ownKeys(a._router);
})

