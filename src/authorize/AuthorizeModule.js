import ModuleName,{MenuName,jsonName} from './ModuleEnum'
import {ModuleMap} from './DataStructure'
import axios from 'axios'
import QS from "qs"
import API from '../path'

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
 		let _set = new Set();//保存同一个对象,如果对象相同,则只保存一份
 		let _map = new Map();//如果是一个页面下的按钮,那么拼接成字符串保存至数据库中
 		let _module=[];
 		//得到按钮的所有的父对象
 		let _parent = item =>{
 			if(item['isBtn']){//这个为true则表明是按钮,那么就拼接成字符串,保存到菜单module的methodname中
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
 			_module.push(_obj);
 		})
 		let obj_1={Id:1, str:JSON.stringify(_module)};
 		axios.post(API.post, QS.stringify(obj_1))
 		.then(response =>{
 			console.log(response);
 		}).catch(e=>{
 			console.log(e);
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
 			if(!item)return
	 		let obj = item.data()[ModuleName];
	 		obj['src'] = item['__file'].replace(/^src\\/ig,"").replace(/\\/ig,'/');
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

const Tdr_Module = new AuthorizeModule;
export default Tdr_Module