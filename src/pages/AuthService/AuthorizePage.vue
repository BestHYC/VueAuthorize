<template>
	<div id="authopage">
		<el-tree
		  :data="treeNode"
		  show-checkbox
		  node-key="name"
		  ref="tree"
		  highlight-current
		  :props="defaultProps">
		</el-tree>
		<div class="buttons">
		  <el-button @click="getCheckedNodes">添加权限</el-button>
		</div>
	</div>
</template>

<script>
	import Authorize,{MenuName} from '../../authorize/moduleEnum'
	//import Auth_Menu from '../../authorize/Authorize'
	import Auth from '../../authorize/Authorize'
	export default {
		data:function(){
			return{
				[Authorize]:{
					name:"authopage",
					parent:"AccountPage",
					descriptor:"权限配置",
					iconName:"el-icon-edit"
				},
				defaultProps: {
		          children: 'children',
		          label: 'descriptor'
		        }
			}
		},
		computed:{
			treeNode:function(){
				let a = [Auth.getMapValues()];
				debugger
				return [Auth.getMapValues()];
			}
		},
		methods:{
			getCheckedNodes() {
				let _select = this.$refs.tree.getCheckedNodes();
				Auth.setValues(_select);
				console.log();
//				let _memuName=['name','src','parent','descriptor','iconName','meta','components','path','redirect','methodname'];
//				let _map = new Map();
//				let _arr =[];
//				_select.forEach(item =>{
//					if(item['isBtn']){
//						let _m = _map.get(item['parent']);
//						if(_m){
//							_map.set(item['parent'],_m+','+item['name']);
//						}else{
//							_map.set(item['parent'],item['name']);
//						}
//					}
//					else{
//						let _obj={};
//						_memuName.forEach(_inner =>{
//							_obj[_inner] = item[_inner]||'';
//						})
//						_arr.push(_obj)
//					}
//				});
//				_arr.forEach(item =>{
//					if(_map.has(item['name'])){
//						item['methodname']=_map.get(item['name'])
//					}
//				});
//				_arr.forEach(item =>{
//					this.$http.post('http://localhost:5500/authorize/',item).then(resolve =>{
//					}).catch(e =>{
//					});
//				})
	      	}
		},
		[MenuName]:{
			'T01':'新增'
		}
	}
</script>

<style>
</style>