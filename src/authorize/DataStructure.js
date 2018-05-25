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

export {ModuleMap}
