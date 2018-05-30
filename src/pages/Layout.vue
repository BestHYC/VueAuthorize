<template>
	<div id="layout">
		<Headers :items="Module"  @updateHead="updateHead"/>
		<div class="page-container">
			<Sidebar :items="Module" :currentIndex="current" @updateroute="updateRoute" />
			<div class="page-content-wrapper">
				<div class="page-content">
					<Breadcrumb :items="BreadList" @clickEvent="updateRoute" @closeEvent="deleteBread"/>
					<div class="page-content-wrap">
						<router-view />
					</div>
				</div>
			</div>
	   	</div>
	   <Footers />
	</div>
</template>

<script>
	import Headers from '../components/Header'
	import Footers from '../components/Footer'
	import Sidebar from '../components/Sidebar'
	import Breadcrumb from '../components/Breadcrumb'
	import ModuleName from '../authorize/ModuleEnum'
	import Authorize from '../authorize/Authorize'
	export default {
		components:{
			Headers,
			Sidebar,
			Breadcrumb,
			Footers
		},
		mounted(){
		},
		beforeRouteEnter(to, from ,next){
			console.log(to);
			next(vm =>{
				if(!vm.BreadList.find(n=>{
					return n.name == to["name"];
				})){
					vm.BreadList.push(Authorize.getModuleObj(to["name"]))
				}
				
			});
		},
		watch:{
			'$route'(to, from){
				console.log('$route');
				if(!this.BreadList.find(n=>{
					return n.name == to["name"];
				})){
					this.BreadList.push(Authorize.getModuleObj(to["name"]));
				}
			}
		},
		computed:{
			Module:function(){
				return Authorize.getModule().find(n=>{
					return n["name"]==this.$data[ModuleName]["name"];
				})["children"];
			},
			MenuList:function(){
				return this.Module.find(n =>{
					return n["name"]==this.currentHead
				})["children"];
			}
		},
		methods:{
			updateRoute:function(obj){
				this.routePage(obj);
			},
			updateHead:function(index){
				this.current = index;
			},
			deleteBread:function(obj){
				let _list = this.BreadList
				let _index = _list.findIndex(n=>{
					return n["name"] ==obj["name"];
				})
				_list.splice(_index,1);
				this.routePage(_list[_list.length -1]);
			},
			routePage(obj){
				this.$router.push({name:obj["name"]});
			}
		},
		data:function(){
			return{
				[ModuleName]:{
					name:"Layout",
					parent:"",
					descriptor:"社区",
					path:"/",
					redirect:{name:"CommunityIndex"}
				},
				current:0,
				BreadList:[{descriptor:"系统首页",name:"CommunityIndex"}]
			}
		}
	}
</script>

<style>
	.page-container{
		min-width: 988px !important;
		position: relative;
		padding: 0;
	}
	.tdr-leftIcon{
		width: 100% !important;
		height: 30px !important;
		text-align: center;
		position: relative !important;
	}
	.page-sidebar{
		display: block !important;
		height: auto !important;
		overflow: visible !important;
		width: 235px !important;
		float: left;
		position: relative;
		background-color: #364150;
		padding: 0px;
		margin-right: -100% !important;
	}
	.page-sidebar-menu{
		display: block;
		margin: 0px;
		padding: 0px;
	}
	.page-sidebar .page-sidebar-menu>li>a{
		color: #b4bcc8;
		padding: 10px 15px 10px 30px;
		border-top: 1px solid #3d4957;
		font-size: 16px;
		display: block;
		position: relative;
		margin:0;
		border:0;
		text-decoration: none;
	}
	.sub-menu{
		display: block;
		list-style: none;
		padding: 0;
		margin: 8px 0;
	}
	.sub-menu li{
		background: 0;
		margin: 0;
		padding: 0;
		margin-top: 1px;
		list-style-type: none;
	}
	.sub-menu li.active>a{
		border-left: 2px solid #0DB1F5;
		background-color: #3E4B5C;
	}
	.sub-menu li>a{
		padding: 6px 15px 6px 46px;
		display: block;
		margin: 0;
		text-decoration: none;
		font-size: 14px;
		font-weight: 300;
		color: #B4BCC8;
	}
	.page-sidebar .page-sidebar-menu>li:hover>a,ul.page-sidebar-menu>li.active>a{
		background-color: #0db1f5;
		color: #FFFFFF;
	}
	.page-content-wrapper{
		float: left;
		width: 100%;
	}
	.page-content{
		min-height: 870px;
		margin-left: 235px;
		padding: 0;
		background-color: #f8f8f8;
	}
	.page-content .page-bar{
		border-bottom: 1px solid #e7ecf1;
		padding-left: 0;
		height: 55px;
	}
	.page-bar .page-breadcrumb{
		padding: 11px 0px 0px 0px;
		float: left;
		display: inline-block;
		margin: 0;
		list-style: none;
	}
	.page-breadcrumb li{
		display: inline-block;
		width: auto;
		text-align: left;
		padding-bottom: 10px;
		padding: 8px 20px 10px 20px;
		list-style-type: none;
	}
	.page-breadcrumb li.active{
		border-bottom:3px solid #0db1f5;
	}
	.page-bar .page-breadcrumb>li>a{
		color: #888;
		font-size: 14px;
		text-shadow: none;
		margin-left: 5px;
		float: left;
		display: block;
	}
	.sidebar-toggle{
		background: url('http://10.130.0.208:8088/compress/images/tdr-20.png') no-repeat center center;
	}
</style>