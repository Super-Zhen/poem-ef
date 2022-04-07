<template>
	<view class="phonebox">
		<view class="phoneInp">
			<input type="text" v-model="phone" placeholder="手机号码">
		</view>
		<view class="codeInp">
			<image :src="imgUrl" mode="widthFix" class="width80" @tap="getCodeImg"></image>
			<input type="text" v-model="codes" placeholder="验证码">
		</view>
		<button class="loginBtn mgt20"  @tap="toNext">下一步</button>
	</view>
</template>

<script>
	import {
		randomString
	} from '@/util/index.js'
	import dialog from '@/util/dialog.js'
	export default {
		data() {
			return {
				imgUrl: '',
				phone: '',
				codeData: '',
				codes: '',
				code: ''
			}
		},
		onLoad() {
			this.getCodeImg()
		},
		watch:{
			phone:function(val,oldval){
				if(oldval.length==11){
					if(val!=oldval){
						this.isDisabled = false
					}
				}else{
					// this.isDisabled = true
				}
			}
		},
		methods: {
			getCodeImg() {
				let data = randomString()
				this.codeData = data
				this.$api.user.codeImg({
					data
				}).then(res => {
					this.codes = ''
					this.imgUrl = res.data.imgUrl
					this.code = res.data.text
					this.randomData = res.data.codeData
				})
			},
			toNext() {
				if (!this.phone) {
					dialog.toast({
						msg: '请输入手机号'
					})
					return
				}
				if (!this.codes) {
					dialog.toast({
						msg: '请输入验证码'
					})
					return
				}
				if (this.codeData != this.randomData || this.code != this.codes.toLowerCase()) {
					this.getCodeImg()
					dialog.toast({
						msg: '验证码错误请重试'
					})
					return
				}
				this.$api.user.userIsExist({
					phone: this.phone
				}).then(res => {
					console.log(res)
					if(res.data){
						this.$yrouter.push({
							path:'/pages/me/registerTwo',
							query:{
								phone:this.phone
							}
						})
					}else{
						// this.isDisabled = true
						this.codes = ''
						this.getCodeImg()
						dialog.toast({
							msg:res.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.phonebox {
		width: 60%;
		margin: 60rpx auto;

		.phoneInp {
			border-bottom: 1rpx solid #999;

			input {
				text-align: center;
				padding: 20rpx;
			}
		}

		.codeInp {
			display: flex;
			padding: 20rpx 0;

			input {
				text-align: center;
				padding: 10rpx;
				border-bottom: 1rpx solid #999;
			}

		}
	}

	.loginBtn {
		height: 70rpx;
		line-height: 70rpx;
		border: 1rpx solid #999999;
		background-color: #fff;
		color: #ff0008;
		font-size: 30rpx;
	}

	.loginBtn:active {
		color: #fff;
		background-color: #ff0008;
	}
</style>
