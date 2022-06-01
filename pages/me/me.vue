<template>
	<view class="me">
		<header-bar titleTintColor="#000" :bgColor="{'background': 'rgb(248,248,248)'}" fixed>
			<!-- <view slot='center'>
				<text>我</text>
			</view> -->
			<view slot="headerL" style="width:100%;">
				<view class="navbox">
					<view class="width30">

					</view>
					<view class="navborder">
						<text>我</text>
					</view>
					<!-- <view class="width30"> -->
					<uni-icons type="gear" color="#5e6d82" size="28" @tap='toSet' />
					<!-- </view> -->
				</view>
			</view>
			<!-- <text slot="back" class="icon iconfont icon-icon-class-c"></text>
		  <text slot="iconfont" class="icon iconfont icon-tengxunweibo1"></text> -->
			<!-- <text slot="iconfont" class="uni_btnIco iconfont icon-choose03" @tap="aaa"></text> -->
			<!-- <image slot="image" style="width: 60rpx;" class="uni_btnImage" src="../../static/img/dic.png" mode="widthFix" @tap="ddd"></image> -->
		</header-bar>
		<view class="item" @tap.stop="toLogin">
			<view class="df aic">
				<view class="headerImg">
				</view>
				<view class="df mgl10 ffcn fontS13">
					<text >{{userInfo.realname?userInfo.realname:'登录/注册'}}</text>
					<text class=" color999 mgt5" @tap.stop='toSetInfo'>编辑个人信息</text>
				</view>
			</view>
			<view class="df aic" @tap.stop='toSetInfo'>
				<text>主页</text>
				<image src="../../static/img/more.png" mode="widthFix" class="width20 "></image>
			</view>
		</view>
		<view class="pdb30">
			<borderlines :list="list" :collectChecked = "collectChecked" :typeChecked="typeChecked"></borderlines>
			<!-- <view class="height30 bgC6cc051"></view> -->
			
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import headerBar from '@/components/custom-nav/custom-nav.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import borderlines from '@/components/borderLines.vue'
	export default {
		data() {
			return {
				collectChecked: true,
				typeChecked:true,
				list: [
					{
						listItem:[
							{
								title:'签到',
								icon:'right',
								url:'/pages/me/sign'
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
					}
				]
				// userInfo:{}
			}
		},
		components: {
			headerBar,
			uniIcons,
			borderlines
		},
		computed: {
			...mapGetters(['userInfo']),
		},
		async onShow() {
			if(Object.keys(this.userInfo).length){
				let info = await this.$api.user.getUserInfo()
				console.log(info)
				if(info.data.id){
					// this.userInfo  = info.data
					this.setUserInfo(info.data)
				}
			}
			
		},
		methods: {
			...mapActions(['setUserInfo']),
			toLogin() {
				if (this.userInfo.realname) return
				this.$yrouter.push({
					path: "/pages/me/login"
				})
			},
			toSetInfo() {
				this.$yrouter.push({
					path: '/pages/me/setInfo'
				})
			},
			toSet() {
				this.$yrouter.push({
					path:'/pages/me/setting'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		// background-color:#dfdce1;
	}

	.me {

		// padding: 0 40rpx;
		.item {
			padding: 20rpx 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #999;

			.headerImg {
				width: 100rpx;
				height: 100rpx;
				background-color: #bebcc0;
			}
		}
	}

	.navbox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}
</style>
