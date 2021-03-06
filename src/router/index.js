import Vue from 'vue'
import Router from 'vue-router'
import Authorize from '../authorize/Authorize'
import ModuleName from '../authorize/ModuleEnum'
Vue.use(Router)
export default new Promise(resolve =>{
	Authorize.Init(data =>{
		resolve(new Router({
			routes: data
		}))
	})
})
Vue.prototype.MenuValid = function(arg){
	if(Authorize.getMenuMap().get(this._data[ModuleName]["name"]).includes(arg)){
		return true;
	}
	return false;
}
