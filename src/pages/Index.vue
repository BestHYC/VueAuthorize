<template>
	<div id="index">
		<div class="page-container">
			<div class="page-sidebar-wrapper">
				<div class="page-sidebar">
					<div class="tdr-leftIcon">
						<div class="sidebar-toggle"></div>
					</div>
					<ul class="page-sidebar-menu">
						<li class="nav-item open">
							<a href="#" class="nav-link link">
								<i class=""></i>
								<span>首页</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#" class="nav-link nav-toggle">
								<i class=""></i>
								<span>监控中心</span>
								<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item active">
									<a>
										<i class=""></i>
										<span>实时警力</span>
									</a>
								</li>
								<li class="nav-item">
									<a>
										<i class=""></i>
										<span>轨迹查询</span>
									</a>
								</li>
								<li class="nav-item">
									<a>
										<i class=""></i>
										<span>布控预警</span>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div class="page-content-wrapper">
				<div class="page-content">
					<div class="page-bar-wrap">
						<div class="page-bar">
							<ul class="page-breadcrumb">
								<li class="active">
									<a class="link-nav">系统首页</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="page-content-wrap">
						<router-view></router-view>
					</div>
					<button @click="TextRange1" v-show="MenuValid('TextRange1')">ceshi</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Authorize from '../authorize/moduleEnum'	
	export default{
		data(){
			return{
				[Authorize]:{
					name:"Index",
					parent:"Monitor",
					descriptor:"实时警力",
					path:""//null
				}
			}
		},
		methods:{
			TextRange1:function(){}
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
	.page-sidebar .page-sidebar-menu>li:hover>a{
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
		height: 54px;
		padding: 11px 0px;
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
		border-bottom:3px solid #0DB1F5;
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