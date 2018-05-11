<template>
</template>

<script>
	import Authorize from '../../authorize/moduleEnum'
	export default{
		data:function(){
			return{
				[Authorize]:{
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