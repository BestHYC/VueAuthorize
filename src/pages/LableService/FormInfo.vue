<template>
</template>

<script>
	import Authorize from '../../authorize/moduleEnum'
	export default{
		data:function(){
			return{
				[Authorize]:{
					name:"FormInfo",
					parent:"LabelService",
					descriptor:"表单配置",
					iconName:"el-icon-bell"
				}
			}
		}
	}
</script>

<style>
</style>