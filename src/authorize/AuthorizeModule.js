import ModuleName,{MenuName} from './moduleEnum'
import axios from 'axios'

const memuName=['name','src','parent','descriptor','iconName','meta','components','path','redirect','methodname'];

class AuthorizeModule
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
 		return [...this.moduleMap.values()].filter(item =>{
 			return item["parent"] === "";
 		});
 	}
 	//获取每个对象上的值信息,并保存在Map中
 	_setModule(arg){
 		arg.forEach(item =>{
	 		let obj = item.data()[ModuleName];
	 		obj['src'] = item['__file'].replace(/^src/ig,"..").replace(/\\/ig,'/');
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
const Tdr_Module = new AuthorizeModule;
export default Tdr_Module