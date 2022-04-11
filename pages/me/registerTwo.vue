<template>
	<view class="phonebox">
		<view class="phoneInp">
			<input type="text" v-model="name"  placeholder="用户名">
		</view>
		<view class="passwInp">
			<input type="text" v-model="password" placeholder="密码">
		</view>
		<button class="loginBtn mgt20" @tap="register">注册</button>
	</view>
</template>

<script>
	import dialog from '@/util/dialog.js'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				name:''
			}
		},
		onLoad(options) {
			if (options.phone) {
				this.phone = options.phone
			}
		},
		methods: {
			register(){
				if(this.phone && this.password && this.name){
					let param = {
						phone:this.phone,
						password: this.password,
						name:this.name
					}
					this.$api.user.register(param).then(res=>{
						console.log(res)
						dialog.toast({
							msg:res.data,
							callback:()=>{
								debugger
								this.$yrouter.replace({
									path:'/pages/me/login',
									// query:{
									// 	phone:this.phone
									// }
								})
							}
						})
					})
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.phonebox {
		width: 60%;
		margin: 60rpx auto;

		.phoneInp,
		.passwInp {
			border-bottom: 1rpx solid #999;

			input {
				text-align: center;
				padding: 20rpx;
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
