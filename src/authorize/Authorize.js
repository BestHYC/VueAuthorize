import ModuleName,{MenuName} from './moduleEnum'
import axios from 'axios'
const Auth_Key = Symbol.for("权限单例");

const routerName = ["path","components",,"redirect","name","meta"];
const jsonName = ['components','meta','redirect'];

/*
 * 
 单例模式方便从全局属性中获取权限的所有的MenuList及当前的Component标识
 * */
class AuthorizeRoute{
	promise=''
	authData=[];
	routeArr=[];
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
	getRoute(){
		return this.routeArr;
	}
	//这段代码写的不错,我喜欢
	_setRoute(){
		let _data = this.authData;
		_data.forEach(item =>{
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
			if(item['methodname'])return;
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
		return ()=>import(""+src.toString());
	}
}

const Tdr_Authorize = Symbol.for("权限模块单例0");

if(!global[Tdr_Authorize]){
	global[Tdr_Authorize] = new AuthorizeRoute();
}
export default global[Tdr_Authorize]