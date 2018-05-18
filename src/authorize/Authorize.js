import Authorize,{MenuName} from './moduleEnum'
import axios from 'axios'
const Auth_Key = Symbol.for("权限单例");

const routerName = ["path","components",,"redirect","name","meta"];
const memuName=['name','src','parent','descriptor','iconName','meta','components','path','redirect','methodname'];
/*
 * 
 单例模式方便从全局属性中获取权限的所有的MenuList及当前的Component标识
 * */
const setModule = Symbol("设置私有moduleMap");
const updateModule = Symbol("设置私有权限属性对象");
const setRoute=Symbol("设置路由的值");
const setMap=Symbol("设置路由的值");
class Auth_Module
{
 	moduleMap = new ModuleMap();//获取组件对象Map的Key-value值,这里其实不需要保存当前组件的对象的值,因为是异步加载
 	module = [];//获取Authorize的配置的值,方便生成菜单
 	routerArr=[];//获取路由值数组
 	//参数为各个对象,放置进入Map数组内
 	constructor(){
 	}
 	Init(arg){
		this._setModule(arg);
 	}
 	setValues(obj){
 		let _set = new Set();
 		let _map = new Map();
 		//得到值的所有的父对象
 		let _parent = item =>{
 			if(item['isBtn']){
 				let _m = _map.get(item['parent']);
 				let _split = item['name'].split('$');
 				let _itemName = _split[_split.length -1];
 				if(_m){
 					_map.set(item['parent'],_m+','+_itemName);
 				}else{
 					_map.set(item['parent'],_itemName);
 				}
 			}else{
 				_set.add(item);
 			}
 			if(item.parent)_parent(this.moduleMap.get(item['parent']))
 		}
 		obj.forEach(item =>{
 			_parent(item);
 		});
 		_set.forEach(item =>{
 			let _obj = {};
 			memuName.forEach(_item =>{
 				if(_item == "methodname"){
 					if(_map.has(item['name'])){
 						_obj['methodname'] = _map.get(item['name']);
 					}
 				}else{
 					_obj[_item] = item[_item]?item[_item]:'';
 				}
 			})
 			axios.post('http://localhost:5500/authorize/',_obj).then(resolve=>{console.log(resolve)}).catch(e =>{
 				console.log(e);
 			})
 		})
 	}
 	getMapValues(){
 		return [...this.moduleMap.values()].find(item =>{
 			return item["parent"] === "";
 		});
 	}
 	//获取每个对象上的值信息,并保存在Map中
 	_setModule(arg){
 		arg.forEach(item =>{
	 		let obj = item.data()[Authorize];
	 		obj['src'] = item['__file'].replace(/^src(.*).vue$/ig,"..$1").replace(/\\/ig,'/');
			if(item[MenuName]){
				let _arr=[],_obj = item[MenuName];
				for(let i in _obj){
	 				_arr.push({'name':obj['name']+'$'+i, 'descriptor':_obj[i],'parent':obj['name'],'isBtn':true});
	 			}
				obj["children"] = _arr;
			}
			//将所有的对象放置在Map数组内
			this.moduleMap.set(obj["name"], obj);
 		})
 		this.moduleMap._updateValues();
 	}
 }

class AuthorizeRoute{
	constructor(){
		
	}
}


class ModuleMap extends Map
{
	constructor(){
		super();
	}
 	_updateValues(){
 		let menu = [...this.values()];
		menu.forEach(item=>{
			let _arr = menu.filter(currentValue =>{
				if(currentValue["parent"] == item["name"]){
					return currentValue
				}
			});
			if(_arr.length != 0){
				item["children"]=_arr;
			}
		});
 	}
}
const Tdr_Authorize = Symbol.for("权限模块单例");
if(!global[Tdr_Authorize]){
	global[Tdr_Authorize] = new Auth_Module();
}
export default global[Tdr_Authorize]



class Auth_Module_01{
 	moduleMap = new ModuleMap();//获取组件对象Map的Key-value值,这里其实不需要保存当前组件的对象的值,因为是异步加载
 	method=new Map();
 	module = [];//获取Authorize的配置的值,方便生成菜单
 	routerArr=[];//获取路由值数组
 	//参数为各个对象,放置进入Map数组内
 	constructor(){
 	}
 	Init(arg){
 		arg.forEach(item =>{
 			this._setModule(item);
 		})
 		this[updateModule]();
 		this[setRoute]();
 	}
 	getComponent(){
 		return this.component;
 	}
 	getModule(){
 		return this.module;
 	}
 	getCopyModule(){
 		return JSON.parse(JSON.stringify(this.module));
 	}
 	getCopyRoute(){
 		let a = this.getCopyModule();
 		let b = (obj, propName)=>{
 			if(obj instanceof Array){
 				obj.forEach(item =>{
 					b(item, propName)
 				})
 			}
 			else{
 				if(obj['children']){
 					obj['children'].forEach(item =>{
 						b(item, propName)
 					})
 				}
 				let _menu = this._getMenu(this.component.get(obj['name']),obj)
 				if(_menu.length){
 					obj[propName] = _menu;
 				}
 			}
 		}
 		b(a, 'children');
 		return a;
 	}
 	
 	//获取每个对象上的菜单信息
 	_getMenu(arg,parent){
 		if(!arg)return[];
 		let _obj = arg[MenuName], _arr = [];
 		for(let i in _obj){
 			_arr.push({'name':i, 'descriptor':_obj[i],'parent':parent['name'],'isBtn':true});
 		}
 		return _arr;
 	}
 	getRoute(){
 		return this.routerArr;
 	}
 	 	/*
 	 * 次数是针对路由进行整合,找出最顶层及最底层路由信息,即暂时支持2级路由,若后期需要3级路由数据,则针对数据优化即可
 	 */
 	[setRoute](obj){
 		this.module.forEach(item =>{
 			let _route={};
 			this._addRouteData(item, _route)._selectRoute(item["children"], _route);
 			this.routerArr.push(_route);
 		})
 	}
 	//将所有的对象放置在Map数组内,方便在component时获取对应的对象,目前暂定使用name为唯一标识符,后期会修改
 	[setMap](name, comp){
		this.moduleMap.set(name, comp);
 	}
 	/*
 	 * 若path的值为undefined及null,则为默认为name的值,否则默认为path的默认值
 	 * 此处原本是想自己设置类似 '/'这样的开始头路由,但是最终还是自己设置比较好,虽然比较繁琐
 	 */
 	_addRouteData(obj, route){
 		routerName.forEach(item =>{
 			if(!(obj[item]===undefined||obj[item]===null)){
 				route[item]=obj[item];
 			}
 		});
 		if(route["path"]===undefined || route["path"]===null){
 			route["path"] = route["name"];
 		}
 		if(!route["components"]){
 			route["component"] = this.component.get(obj["name"])
 		}
 		return this;
 	}
 	/*
 	 * 针对路由进行遍历,获取所有路由数据
 	 * 因为只有2层路由,所以直接获取顶层路由及底层路由(无children的对象)即可
 	 * 建议后期使用递归循环路由,
 	 */
 	_selectRoute(arr, route){
 		if(!arr)return;
 		arr.forEach(item =>{
 			if(item["children"]){
 				if(!route["children"])route["children"]=[];
 				this._selectRoute(item["children"], route);
 			}else{
 				let _obj={};
 				this._addRouteData(item, _obj);
 				route["children"].push(_obj);
 			}
 		})
 	}
 	//获取每个对象上的值信息
 	_setModule(arg){
 		let _obj = arg.data()[Authorize];
		this[setMap](_obj["name"], _obj);
 	}
 	//获取对应的Object,不进行拷贝,针对操作的时候可以直接遍历对象
 	[updateModule](){
 		let menu = this.module;
		menu.forEach(item=>{
			let _arr = menu.filter(currentValue =>{
				if(currentValue["parent"] == item["name"]){
					return currentValue
				}
			});
			if(_arr.length != 0){
				item["children"]=_arr;
			}
		});
		this.module = menu.filter(currentValue =>{return currentValue.parent==="";})
		return this.module;
 	}
 }