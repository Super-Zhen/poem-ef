<template>
	<view class="me">
		<view class="item" @tap="toLogin">
			<view class="df aic">
				<view class="headerImg">
				</view>
				<view class="mgl10">登录/注册</view>
			</view>
			<view>
				<image src="../../static/img/more.png" mode="widthFix" class="width20 mgt5"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toLogin(){
				this.$yrouter.push({
					path:"/pages/me/login"
				})
			}
		}
	}
</script>

<style scoped lang="less">
page{
	// background-color:#dfdce1;
}
.me{
	// padding: 0 40rpx;
	.item{
		padding: 20rpx 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #999;
		.headerImg{
			width: 100rpx;
			height: 100rpx;
			background-color: #bebcc0;
		}
	}
}
</style>
