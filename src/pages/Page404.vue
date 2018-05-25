<template>
<div id="error">
	<span style="color: black;">错误页面</span>
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
					descriptor:"错误页",
					path:"/"
				}
			}
		}
	}
</script>

<style>
	body{
		background-color: #0DB1F5;
	}
</style>