<template>
<div id="error">
	<span>错误页面</span>
</div>
</template>

<script>
	import Authorize from '../authorize/ModuleEnum'
	export default{
		data(){
			return{
				[Authorize]:{
					name:"Page404",
					parent:"",
					descriptor:"错误页"
				}
			}
		}
	}
</script>

<style>
</style>