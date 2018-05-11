<template>
	<div id="Organ">
		<span>组织机构管理</span>
	</div>
</template>

<script>
	import Authorize from '../../authorize/moduleEnum'
	export default{
		data:function(){
			return{
				[Authorize]:{
					name:"OrganizeManage",
					parent:"CitySet",
					descriptor:"组织机构管理",
					iconName:"el-icon-date"
				}
			}
		}
	}
</script>

<style>
</style>