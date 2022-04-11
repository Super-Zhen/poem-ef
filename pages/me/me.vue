<template>
	<view class="me">
		<view class="item" @tap.native.stop="toLogin">
			<view class="df aic">
				<view class="headerImg">
				</view>
				<view class="df mgl10 ffcn fontS13">
					<text>{{userInfo.realname?userInfo.realname:'登录/注册'}}</text>
					<text class=" color999 mgt5" @tap.stop='toSetInfo'>编辑个人信息</text>
				</view>
			</view>
			<view class="df aic" @tap.stop='toSetInfo'>
				<text>主页</text>
				<image src="../../static/img/more.png" mode="widthFix" class="width20 "></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters(['userInfo']),
		},
		methods: {
			toLogin(){
				if(this.userInfo.realname) return
				this.$yrouter.push({
					path:"/pages/me/login"
				})
			},
			toSetInfo(){
				this.$yrouter.push({
					path:'/pages/me/setInfo'
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
