import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout'
//import Index from '../pages/Index'
//社区路由配置
import CommunityPlatform from '../pages/Community/CommunityPlarform'
import CommunityIndex from '../pages/Community/CommunityIndex'
import Monitor from '../pages/Community/Monitor'
import PoliceStrength from '../pages/Community/PoliceStrength'

//数据中心路由配置
import DataCenter from '../pages/DataCenter/DataCenter'
import CitySet from '../pages/DataCenter/CitySet'
import OrganizeManage from '../pages/DataCenter/OrganizeManage'

//Demo示例卡
import AuthorizeService from '../pages/AuthService/AuthorizeService'
import AccountPage from '../pages/AuthService/AccountPage'
import AuthorizePage from '../pages/AuthService/AuthorizePage'
import myNew from '../pages/AuthService/myNew'

import LableService from '../pages/LableService/LableService'
import FormInfo from '../pages/LableService/FormInfo'

import Authorize from '../authorize/Authorize'
Vue.use(Router)
let a = PoliceStrength;
//debugger
const community = [CommunityPlatform,CommunityIndex, Monitor,PoliceStrength];
const datacenter=[DataCenter,CitySet,OrganizeManage];
const lableService=[AuthorizeService,AccountPage,AuthorizePage,myNew];
const formInfo = [LableService,FormInfo];

Authorize.Init([Layout,...community,...datacenter,...lableService,...formInfo]);

const routerName = ["path","components","redirect","name","meta"];
//export default new Router({
//	routes: Authorize.getRoute()
//})
//export default new Router({
//	routes: GetRoutePath()
//})
export default new Router({
routes: [
    {
      path: '/Layout',
      component: Layout,
      children:[
      ]
    },
    {
      	path:'/AuthorizePage',
      	name:'AuthorizePage',
      	component:AuthorizePage////resolve=>require([Index], resolve)
      }
]
})
Vue.prototype.MenuValid = function(...arg){
	let a = arg;
	let b = this._data;
	return true;
}
function GetRoutePath(){
	
	/*
	 * 针对路由的对象进行拆分,获取子路由对象,仅仅用来测试可行,后期会修改
	 */
	menu.forEach(item=>{item["myroute"]["children"]=
			menu.filter(currentValue =>{
				if(currentValue["myroute"]["parent"] == item["myroute"]["name"]){
					return currentValue
				}
			})
	});
	let menuarr = [];
	//获取parent=""/undefined的作为根节点
	menuarr = menu.filter(currentValue =>{
		if(!currentValue["myroute"]["parent"]){
			return currentValue
		}
	});
	
	//针对父路由设置所有的子路由
	let childarr =[];
	GetChildren(menuarr,childarr);
	return childarr;
}

function GetChildren(arr, route){
	arr.forEach(item =>{
		let {myroute}=item, _obj = {};
		if(!myroute["parent"]){
			routerName.forEach(_item =>{
				if(!(myroute[_item]===undefined)&&!(myroute[_item]===null)){
					_obj[_item]=myroute[_item];
				}
			});
			_obj["component"]=item
		}
		if(myroute["children"].length != 0){
			//当route不是数组的时候,表明是传子对象,那么就在子对象的children上进行push,否则直接在数组上进行push
			if((route instanceof Array)&&!_obj["children"]){
				_obj["children"]=[];
				GetChildren(myroute["children"],_obj);
			}else{
				GetChildren(myroute["children"],route);
			}
		}else{
			routerName.forEach(_item =>{
				if(!(myroute[_item]===undefined)&&!(myroute[_item]===null)){
					_obj[_item]=myroute[_item];
				}
			});
			_obj["component"]=item
		}
		if(_obj["path"] !== undefined){
			route["children"]?route["children"].push(_obj):route.push(_obj)
		}
	})
}
