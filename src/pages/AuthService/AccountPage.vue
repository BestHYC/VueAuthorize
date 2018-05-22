<template>
<div id="account">
<span>测试数据</span>
</div>
</template>

<script>
	import ModuleName from '../../authorize/ModuleEnum'
	export default{
		data:function(){
			return{
				[ModuleName]:{
					name:"AccountPage",
					parent:"AuthorizeService",
					descriptor:"账户配置",
					iconName:"el-icon-edit"
				}
			}
		}
	}
</script>

<style>
</style>