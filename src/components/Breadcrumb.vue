<template>
	<div id="breadcrumb">
		<div class="page-bar-wrap">
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li v-for='(item,index) in items' :key="index" :class="{'active':current==index}">
						<a @click="clickBtn(item,index)" class="link-nav">{{item.descriptor}}</a>
						<a @click="closeBtn(item)" class="link-close"><i class="el-icon-close"></i></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			'items':{
				require:true
			}
		},
		mounted(){
		},
		watch:{
			items:function(){
				this.current=this.items.length -1;
			}
		},
		methods:{
			clickBtn:function(item,index){
				this.$emit("clickEvent",item)
				this.current = index;
			},
			closeBtn:function(item){
				if(this.items.length == 1)return;
				this.$emit("closeEvent",item)
				this.current='';
			}
		},
		data(){
			return{
				current:''
			}
		}
	}
</script>

<style>
	.link-close{
		padding-left: 5px;
	}
</style>