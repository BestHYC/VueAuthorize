import Vue from 'vue'
import Router from 'vue-router'
import Authorize from '../authorize/Authorize'
//import AuthorizePage from '../pages/AuthService/AccountPage'
Vue.use(Router)
//export default new Promise(resolve =>{
//	Authorize.Init(data =>{
//		resolve(new Router({
//			routes: data
//		}))
//		debugger
//	})
//})

//const aa="../pages/Page404.vue"
//global["IMPORT"] = function(src){return import(src)};
////const _fun = new Function('return import("../pages/Page404.vue")');
//
const func1 = function(src){
	return () =>import("" + src)
}
//const func2 = function(){
//	return resolve=> IMPORT(["../pages/Page404.vue"], resolve);
//}
//const func3 = function(src){
//	let a = eval('()=>import("'+src+'")');
//	debugger
//	return eval('resolve=> IMPORT(["'+src+'"], resolve);')
//}
//const Name = function(src){return src;}
//const t1 = () => import("../pages/Page404.vue");
const t2 = func1("../pages/Page404.vue")
//const t3 = func2()
//const t4 = func3("../pages/Page404.vue")
//debugger
export default new Promise(resolve =>{
	resolve(
		new Router({
			routes: [
	    	{
		      	path:'/',
		      	name:'AuthorizePage',
		      	component:t2
      		}]
		}))

})

//export default new Router({
//	routes: GetRoutePath()
//})
//export default new Router({
//	routes: [
//	    {
//	      	path:'/',
//	      	name:'AuthorizePage',
//	      	component:resolve=>require(['../pages/Layout.vue'], resolve)
//    	}
//	]
//})
Vue.prototype.MenuValid = function(...arg){
	let a = arg;
	let b = this._data;
	return true;
}
