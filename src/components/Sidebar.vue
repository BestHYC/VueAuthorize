<template>
	<div id="sidebar">
		<div class="page-sidebar-wrapper">
			<div class="page-sidebar">
				<div class="tdr-leftIcon">
					<div class="sidebar-toggle el-icon-tickets"></div>
				</div>
				<ul class="page-sidebar-menu"  v-for="(item,index) in items" 
					:key="item.name" v-show="currentIndex == index">
					<li class="nav-item" v-for="(item1, index1) in item['children']" :key="item1.name" >
						<a href="#" class="nav-link nav-toggle" @click="clickLi(item1,index,index1)"
							v-bind:class="{active:current[currentIndex][0]===index1}">
							<i :class="[item1['iconName']]"></i>
							<span>{{item1.descriptor}}</span>
							<span v-if="item1['children']" class="el-icon-more-outline iconleft"></span>
						</a>
						<ul class="sub-menu" v-if="item1['children']" 
							:class="{'showToggle':index1!=current}">
							<li class="nav-item" v-for="(i,index2) in item1['children']" :key="i.name" >
								<a @click.prevent="clickLi(i)" 
									:class="{active:current[currentIndex][1]===index2}">
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
			},
			"currentIndex":{
				type:Number,
				required: true
			}
		},
		created(){
			for(let i =0, len = this.items.length; i < len; i++){
				this.current.push([]);
			}
		},
		computed:{
		},
		methods:{
			toRoute:function(name){
				this.$emit("updateroute",name);
			},
			toggleUl:function(index){
				this.current == index?(this.current=NaN):(this.current=index);
			},
			clickLi:function(item, index,index1, index2){
				this.current[index][0]=index1				
				if(!item["children"]){
					this.current[index][1]=index2;
					this.toRoute(item)
				}
				
			}
		},
		data:function(){
			return {
				current:[]
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