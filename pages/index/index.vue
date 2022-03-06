<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<span class="icon iconfont icon-tengxunweibo1"></span>
			<span class="iconfont">&#xe654;</span>
			
		</view>
		<view>
			<!-- <button type="primary" size="default" @click="submitLogin">登录</button> -->
			<!-- <button type="primary" size="default" @click="submitLogin">登录</button> -->
			<button type="default" @tap="chooseImg">dddd</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log('onLoad')
			// let param = {
			// 	collectionId:"5c1a1bd667f35600660b26ab",
			// 	page:1,
			// 	perPage:50
			// }
			// this.$api.works.getWorksByCollection(param).then((res)=>{
			// 	console.log(res)
			// })
		},
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0:
					console.log(0)
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
					console.log(e)
					break;
			}
		},
		methods: {
			chooseImg(){
				let that = this
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        const tempFilePaths = res.tempFilePaths[0];    //拿到选择的图片，是一个数组
						// console.log(tempFilePaths)
						// // that.ImgFlag = true
						// that.baseFormData.image = tempFilePaths
						// console.log(Apimodule.public.uploadImg())
						// uni.getImageInfo({
						// 	src: res.tempFilePaths[0],
						// 	success: function(image) {
								
						// 	}
						// })
						uni.uploadFile({ // todo
							// url: Apimodule.public.uploadImg(), //上传地址
							url: 'http://192.168.10.153:8010/merchant/api/upload', //上传地址
							fileType: "image",
							name: '图片', //文件名称
							// header: {
							// 	'content-type': 'multipart/form-data' 
							// },
							filePath: res.tempFilePaths[0], // 要上传的文件的路径
							success: (res) => {
								console.log(res) // todo 没有返回数据
							}
						})
				    }
				});
			},
			submitLogin(){
				console.log(1111)
				uni.login({ //正式登录，弹出授权窗
					provider: 'univerify',
					univerifyStyle: { // 自定义登录框样式
						"fullScreen": false, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
						"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff 
						"phoneNum": {
							"color": "#2281F5", // 手机号文字颜色 默认值：#000000   
						},
						"authButton": {
							"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
							"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
							"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
							"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff  
							"title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”  
						}
					},
					success(res) { // 正式登录成功
						console.log("res.authResult",res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}

						// 在得到access_token后，通过callfunction调用云函数
						uniCloud.callFunction({
							name: 'loginByUniverify', // 云函数名称
							data: { //传给云函数的参数
								'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
								'openid': res.authResult.openid // 客户端一键登录接口返回的openid
							},
							success(callRes) {
								console.log('调用云函数成功' + callRes)
							},
							fail(callErr) {
								console.log('调用云函数出错' + callErr)
							},
							complete() {
								uni.closeAuthView() //关闭授权登录界面
							}
						})
					},
					fail(err) { // 正式登录失败
						console.log(err.errCode)
						console.log(err.errMsg)
						uni.closeAuthView() //关闭授权登录界面
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
