const routerName = ["path","components","redirect","name","meta"];
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
