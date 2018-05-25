<template>
	<div id="header" class="page-header navbar">
		<div style="margin-right:40px!important;width: 175px;" class="page-img">
			<a id='logo'>
				<img src="http://10.130.0.205:8293/resource/tdr/images/tdr_logo02.png" alt="logo" class="logo-default">
			</a>
		</div>
		<ul id="navMenu" class="nav">
			<li class="tdr-xmtab" v-for="(item,index) in items">
				<a :class="{'active':current==index}" @click="currentHead(index)">{{item.descriptor}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:["items"],
		data(){
			return{
				current:''
			}
		},
		methods:{
			currentHead:function(index){
				this.$emit('updateHead',index);
				this.current = index;
			}
		}
	}
</script>

<style>
	.page-img{
		float: left !important;
		margin-left: 20px !important;
		margin-top:10px !important;
	}
	.page-header.navbar{
		background-color:#2b3643;
		margin: 0;
		border: 0;
		padding: 0;
		height: 46px;
		filter: none;
	}
	.nav li:hover, .nav li>.active{
		background-color: #3e4b5c !important;
	}
	#navMenu.nav{
		float: left;
		width: 1100px;
		height: 46px;
		overflow: hidden;
		list-style: none;
	}
	#navMenu.nav, #navMenu.nav li{
		float: left;
	}
	.tdr-xmtab{
		width: 110px;
		height: 46px;
		line-height: 46px;
		text-align: center;
		color: #FFFFFF;
	}
	#navMenu.nav, #navMenu.nav li a{
		display: block;
	}
	#navMenu.nav a{
		padding: 0 !important;
		color: #fff !important;
	}
	.nav>li>a{
		position: relative;
	}
	a:hover{
		cursor: pointer;
	}
	li{
		list-style-type: none;
	}
</style>