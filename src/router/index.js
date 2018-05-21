import Vue from 'vue'
import Router from 'vue-router'
import Authorize from '../authorize/Authorize'
//import AuthorizePage from '../pages/AuthService/AccountPage'
Vue.use(Router)
export default new Promise(resolve =>{
	Authorize.Init(data =>{
		resolve(new Router({
			routes: data
		}))
	})
})


//export default new Router({
//	routes: GetRoutePath()
//})
//export default new Router({
//	routes: [
//	    {
//	      	path:'/',
//	      	name:'AuthorizePage',
//	      	component:resolve=>require(['../pages/AuthService/AccountPage'], resolve)
//    	}
//	]
//})
Vue.prototype.MenuValid = function(...arg){
	let a = arg;
	let b = this._data;
	return true;
}
