<template>
	<view>
		<view class="loginBox">
			<view class="item">
				<input type="text" v-model='phone' placeholder="手机号码">
			</view>
			<view class="item">
				<input type="text" v-model="password" placeholder="密码" />
			</view>
			<view class="mgt10">
				<button class="loginBtn" @tap='login'>登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import dialog from '@/util/dialog.js'
	import cookie from '@/util/cookie.js'
	// import Apimodule from '@/common/api/index.js'
	export default {
		data() {
			return {
				phone:'',
				password:''
			}
		},
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0:
					console.log(0)
					uni.navigateTo({
						url:"/pages/me/register"
					})
					break;
				case 1:
					console.log(1)
					break;
				case 2:
					console.log(2)
					break;
				case 2:
					console.log(3)
					break;
				default:
					uni.navigateTo({
						url:"/pages/me/register"
					})
					break;
			}
		},
		methods: {
			...mapActions(['setUserInfo']),
			async login(){
				if(!this.phone){
					dialog.toast({
						msg:'请输入手机号码'
					})
					return
				}
				if(!this.password){
					dialog.toast({
						msg:'请输入密码'
					})
					return
				}
				let result = await this.$api.user.login({phone:this.phone,password:this.password})
				cookie.set('login_status',true)
				cookie.set('token',result.data)
				
				let info = await this.$api.user.getUserInfo()
				console.log(info)
				if(info.data.id){
					this.setUserInfo(info.data)
					this.$yrouter.switchTab({
						path:'/pages/dic/dic'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.loginBox{
	font-size: 30rpx;
	width: 60%;
	text-align: center;
	margin: 80rpx auto 0;
	
	.item{
		border-bottom: 1rpx solid #999999;
		input{
			padding: 16rpx;
		}
		
	}
	.loginBtn{
		height: 70rpx;
		line-height: 70rpx;
		border: 1rpx solid #999999;
		background-color: #fff;
		color: #ff0008;
		font-size: 30rpx;
	}
	.loginBtn:active{
		color: #fff;
		background-color: #ff0008;
	}
}
</style>
