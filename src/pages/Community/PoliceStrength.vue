<template>
	<div id="PoliceStrength">
		<span>
			实时警力平台
		</span>
		<button @click="T01" v-if="MenuValid('T01')">点击确认</button>
	</div>
</template>

<script>
	import Authorize,{MenuName} from '../../authorize/moduleEnum'
	export default{
		data:function(){
			return{
				[Authorize]:{
					name:"PoliceStrength",
					parent:"Monitor",
					descriptor:"实时警力",
					iconName:"el-icon-time"
				}
			}
		},
		methods:{
			T01:function(){
				alert("测试");
			}
		},
		[MenuName]:{
			'T01':'新增'
		}
	}
</script>

<style>
</style>