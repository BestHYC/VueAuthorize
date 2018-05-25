import ModuleName,{MenuName} from './ModuleEnum'
import {ModuleMap} from './DataStructure'
import axios from 'axios'
const Auth_Key = Symbol.for("权限单例");

const routerName = ["path","components",,"redirect","name","meta"];
const jsonName = ['components','meta','redirect'];//针对对象进行序列化,然后存放至数据库中

/*
 * 
 单例模式方便从全局属性中获取权限的所有的MenuList及当前的Component标识
 * */
class AuthorizeRoute{
	promise=''
	authData=[];
	routeArr=[];
	moduleMap = new ModuleMap();
	menuMap = new ModuleMap();
	constructor(){
		this.promise = axios.get('http://localhost:5500/authorize')
	}
	Init(fun){
		this.promise.then(resolve =>{
			this._setData(resolve.data);
			this._setRoute();
			fun(this.routeArr);
		}).catch(e =>{console.log(e)});
	}
	getMenuMap(){
		return this.menuMap;
	}
	getModule(){
		return [...this.moduleMap.values()];
		//return this.routeArr;
	}
	//这段代码写的不错,我喜欢
	_setRoute(){
		this.authData.forEach(item =>{
			let _obj ={};
			this._getRouteObj(item, _obj, (item,val) =>{
				if(item=="path"&&!val.startsWith('/'))return '/'+val;
				return val;});//初始化头部
			if(item["children"])this._getRouteChild(item["children"], _obj);
			this.routeArr.push(_obj);
		})
	}
	_getRouteObj(obj, route,fun){
		routerName.forEach(item =>{
			let val = obj[item];
			 if(val || item=="path"){
			 	if(item=='path'){
			 		if(!val)val = obj['name'];//所有的path为空,都默认为其name的值
			 		if(val=="Index"||val=="index")val='';//此处约定path='index',是默认加载第一个页面即path=''的页面
			 	}
			 	if(jsonName.indexOf(item)>-1) val = JSON.parse(val);
			 	if(fun)val=fun(item,val);//添加函数扩展,此处是对path的值进行添加/
			 	route[item] = val;
			 }
		});
		if(!route['components']){
			route['component']=this._require(obj['src']);
		}
	}
	_getRouteChild(arr, route){
 		arr.forEach(item =>{
 			if(item["children"]){
 				if(!route["children"])route["children"]=[];
 				this._getRouteChild(item["children"], route);
 			}else{
 				let _obj={};
 				this._getRouteObj(item, _obj);
 				route["children"].push(_obj);
 			}
 		})
	}
	_setData(data){
		data.forEach(item =>{
			this.moduleMap.set(item['name'],item);
			if(item['methodname']){
				let _arr = item['methodname'].split(',')
				this.menuMap.set(item['name'],_arr)
				return;
			}//如果有methodname的对象则只可能是菜单,就没有子菜单了,并且也有
			let obj = data.filter(current =>{
				return current['parent'] == item['name'];
			});
			if(obj.length){
				item['children'] = obj;
			}
		});
		this.authData = data.filter(current =>{
			return current['parent']==='';
		})
	}
	_require(src){
		return resolve=>require([`../${src}`], resolve);
	}
}

const Tdr_Authorize = Symbol.for("权限模块单例");

if(!global[Tdr_Authorize]){
	global[Tdr_Authorize] = new AuthorizeRoute();
}
export default global[Tdr_Authorize]