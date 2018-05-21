<template>
	<div id="Organ">
		<span>组织机构管理</span>
	</div>
</template>

<script>
	import ModuleName from '../../authorize/moduleEnum'
	export default{
		data:function(){
			return{
				[ModuleName]:{
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