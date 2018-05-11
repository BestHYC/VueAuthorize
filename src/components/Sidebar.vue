<template>
	<div id="sidebar">
		<div class="page-sidebar-wrapper">
			<div class="page-sidebar">
					<div class="tdr-leftIcon">
						<div class="sidebar-toggle el-icon-tickets"></div>
					</div>
		<ul class="page-sidebar-menu">
			<li class="nav-item" v-for="(item,index) in items">
				<a href="#" class="nav-link nav-toggle" @click="toggleUl(index)">
					<i :class="[item['iconName']]"></i>
					<span>{{item.descriptor}}</span>
					<span v-if="item['children']" class="el-icon-more-outline iconleft"></span>
				</a>
				<ul class="sub-menu" v-if="item['children']" :class="{'showToggle':index!=current}">
					<li class="nav-item active" v-for="i in item['children']">
						<a @click.prevent="toRoute(i)">
							<i :class="[i['iconName']]"></i>
							<span>{{i.descriptor}}</span>
						</a>
					</li>
				</ul>
			</li>
		</ul>
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			"items":{
				type:Array,
				required: true
			}
		},
		mounted(){
			
		},
		computed:{
			menulist:function(){
				let a = this.items.filter(currentValue =>{return currentValue.parent==="";});
				if(a.length>0){
					return a[0]["children"];
				}else{
					return a;
				}
			}
		},
		methods:{
			toRoute:function(name){
				this.$emit("updateroute",name);
			},
			toggleUl:function(index){
				this.current == index?(this.current=NaN):(this.current=index);
			}
		},
		data:function(){
			return {
				current:''
			}
		}
	}
</script>

<style>
	.showToggle{
		display: none;
	}
	.iconleft{
		float: right;
	}
</style>