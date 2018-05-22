<template>
	<div id="CommunityIndex">
	<span>
		社区首页图表展示
	</span>
	</div>
</template>

<script>
	import ModuleName from '../../authorize/ModuleEnum'
	export default{
		data:function(){
			return{
				[ModuleName]:{
					name:"CommunityIndex",
					parent:"CommunityPlatform",
					descriptor:"系统首页",
					iconName:"el-icon-bell",
					path:"Index"
				}
			}
		}
	}
</script>

<style>
</style>