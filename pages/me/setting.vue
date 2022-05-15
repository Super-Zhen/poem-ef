<template>
	<view class="pdb30">
		<borderlines :list="list" :collectChecked = "collectChecked" :typeChecked="typeChecked"></borderlines>
		<!-- <view class="height30 bgC6cc051"></view> -->
		<view class="mgt40">
			<button class="fontS16" @tap="loginout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import borderlines from '@/components/borderLines.vue'
	import cookie from '@/util/cookie.js'
	
	export default {
		data() {
			return {
				collectChecked: true,
				typeChecked:true,
				list:[
					{
						title:'账号和隐私',
						listItem:[
							{
								title:'个人信息',
								icon:'right',
								url:''
							},
							{
								title:'账号设置',
								icon:'right',
								url:''
							},
							{
								title:'隐私设置',
								icon:'right',
								url:''
							},
							
						]
					},
					{
						title:'工具',
						listItem:[
							{
								title:'桌面插件',
								icon:'right',
								url:''
							},
							{
								title:'锁屏模式',
								icon:'right',
								url:''
							},
							{
								title:'简繁切换',
								icon:'right',
								url:'',
								label:'简体'
							},
							
						]
					},
					{
						title:'摘录',
						listItem:[
							{
								title:'摘录范围',
								icon:'right',
								url:''
							},
							{
								title:'摘录字体',
								icon:'right',
								url:'',
								label:'古体'
							},
							{
								title:'右滑收藏',
								switch:'1',
								flag:'collect',
								url:'',
								label:'简体'
							},
							
						]
					},
					{
						title:'诗词',
						listItem:[
							{
								title:'注释位置',
								icon:'right',
								url:'',
								label:'上方'
							},
							{
								title:'阅读背景',
								icon:'right',
								url:'',
								label:'鸟鸣涧'
							},
							{
								title:'诗词字体',
								icon:'right',
								url:'',
								label:'默认'
							},
							
						]
					},
					{
						title:'文库',
						listItem:[
							{
								title:'分类样式',
								icon:'right',
								url:'',
								label:'图文',
							}
						]
					},
					{
						title:'推送',
						listItem:[
							{
								title:'日赏推送',
								switch:'1',
								url:'',
								flag:'type'
							}
						]
					},
					{
						title:'系统',
						listItem:[
							{
								title:'清除缓存',
								icon:'right',
								url:'',
								label:'0.0M'
							}
						]
					}
				]
			}
		},
		components:{
			borderlines
		},
		methods: {
			...mapMutations(['logout']),
			loginout(){
				this.$api.user.loginout().then(res=>{
					this.logout()
					this.$yrouter.switchTab({
						path:'/pages/home/home'
					})
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #f8f8f8;
}
.bgcf3f3f3{
	background-color: #f3f3f3;
}
</style>
