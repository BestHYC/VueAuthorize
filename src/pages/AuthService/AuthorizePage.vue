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
	import ModuleName,{MenuName} from '../../authorize/ModuleEnum'
	import Module from '../../authorize/AuthorizeModule'
	import Authorize from '../../authorize/Authorize'
	export default {
		data:function(){
			return{
				[ModuleName]:{
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
		beforeCreate(){
			import('../../router/PageInit').then(()=>{
				if(!Authorize.getMenuMap().size())this.$router.push('/')
			})
		},
		computed:{
			treeNode:function(){
				let a = Module.getMapValues();
				console.log(a);
				return a;
			}
		},
		methods:{
			getCheckedNodes() {
				let _select = this.$refs.tree.getCheckedNodes();
				Module.setValues(_select);
				console.log();
	      	}
		},
		[MenuName]:{
			'T01':'新增'
		}
	}
//第一代代码,对得到的数据进行拼接,然后存储至数据库
	
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
</script>

<style>
</style>