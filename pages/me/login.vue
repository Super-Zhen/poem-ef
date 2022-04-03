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
	import dialog from '@/util/dialog.js'
	export default {
		data() {
			return {
				name:'',
				password:''
			}
		},
		methods: {
			login(){
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
