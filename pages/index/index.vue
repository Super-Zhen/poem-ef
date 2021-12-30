<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<span class="icon iconfont icon-tengxunweibo1"></span>
			<span class="iconfont">&#xe654;</span>
			
		</view>
		<view>
			<button type="primary" size="default" @click="login">登录</button>
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
			login(){
				uni.login({
				    provider: 'univerify',
				    univerifyStyle:  { 
						"fullScreen": false, // 是否全屏显示，默认值： false
						"backgroundColor": "#ffffff",  // 授权页面背景颜色，默认值：#ffffff
						"backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）  
						"icon": {  
							"path": "static/xxx.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
						},  
						"phoneNum": {  
							"color": "#202020"  // 手机号文字颜色 默认值：#202020  
						},  
						"slogan": {  
							"color": "#BBBBBB"  //  slogan 字体颜色 默认值：#BBBBBB  
						},  
						"authButton": {  
							"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
							"highlightColor": "#2861c5",  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
							"disabledColor": "#73aaf5",  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
							"textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
							"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
							"borderRadius": "24px"    // 授权按钮圆角 默认值："24px" （按钮高度的一半）
						},  
						"otherLoginButton": {  
							"visible": true, // 是否显示其他登录按钮，默认值：true  
							"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
							"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
							"textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
							"title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
							"borderColor": "",  //边框颜色 默认值：透明（仅iOS支持）  
							"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
						},  
						"privacyTerms": {  
							"defaultCheckBoxState":true, // 条款勾选框初始状态 默认值： true
							"uncheckedImage":"", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
							"checkedImage":"", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
							"checkBoxSize":12, // 可选 条款勾选框大小，仅android支持
							"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
							"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
							"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
							"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
							"privacyItems": [  // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
								{  
									"url": "https://", // 点击跳转的协议详情页面  
									"title": "用户服务协议" // 协议名称  
								}  
							]  
						},
						"buttons": {  // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
							"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
							"list": [
								{
									"provider": "apple",
									"iconPath": "/static/img/dic.png" // 图标路径仅支持本地图片
								}, 
								{
									"provider": "weixin",
									"iconPath": "/static/img/dic.png" // 图标路径仅支持本地图片
								}
							]
						}
					},
				    success(res){ // 登录成功
				        console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
				    },
				    fail(res){  // 登录失败
				        console.log(res.errCode)
				        console.log(res.errMsg)
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
