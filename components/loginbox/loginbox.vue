<template>
	<!--components/login/login.wxml-->
	<view class="loginView" v-if="isShow">
		<view class="login">
			<text class="title">为您提供更便捷的服务</text>

			<view v-if="canIUseGetUserProfile === true" class="btn" @tap="getSetting">
				{{isKeep ? '请登录' : '一键登录'}}
			</view>
			<button v-else class="btn" open-type="getUserInfo" lang="zh_CN"
				@getuserinfo="login">{{isKeep ? '请登录' : '一键登录'}}</button>


			<text class="tips">点击登录即表示您已阅读并同意访问您姓名，性别，手机号及微信个人信息。</text>
			<!-- <image class="close" :src="imgURL + 'closeLogin.png'" mode="aspectFit" v-if="!isKeep" @tap="closeLogin"> -->
			</image>
		</view>
	</view>
</template>

<script>
	// components/login/login.js
	// import {
	// 	openID,
	// 	InformationInput,
	// 	personage,
	// 	oneDimensionalCode
	// } from "../../utils/requert";

	// import app from '../../App.vue'
	// console.log(app)

	export default {
		data() {
			return {
				// imgURL: app.globalData.imgURL, //图片路径
				register: false,
				canIUseGetUserProfile: false, //默认新接口不存在
			};
		},
		components: {},
		props: {
			isKeep: {
				type: Boolean,
				default: true
			},
			isShow: {
				type: Boolean,
				default: true
			}
		},
		created: function() {
			// 在组件实例进入页面节点树时执行
			console.log(uni.getUserProfile)
			if (uni.getUserProfile) {
				console.log('凑')
				this.canIUseGetUserProfile = true
			} else {
				console.log('日')
			}

				// uni.getStorage({
				// 	key: 'location',
				// 	success: async (res) => {
				// 		console.log(res)
				// 	},
				// 	fail: async(res) =>{
				// 		console.log(res)
				// 		this.location()
				// 	}
				// })

			uni.getStorage({
				key: 'openid',
				success: async (res) => {
					console.log(res)
				},
				fail: async(res) =>{
					console.log(res)
					this.getOpenID()
				}
			})

		},
		methods: {
			//获取设置
			getSetting(){
				let that = this
				wx.getSetting({
				    success:function(res){
				  //     if (!res.authSetting['scope.userLocation']) {
				  //       console.log("-------------不满足scope.userLocation权限----------");
				  //       //申请授权
						// uni.showModal({
						// 	title: "提示",
						// 	content: '请允许位置授权,再进行登录',
						// 	success: function (res) {
						// 		if (res.confirm) {
						// 			console.log("用户点击确定");
						// 			wx.openSetting({
						// 			    success: function (osrs) {
						// 			        // 出发条件是返回的时候
						// 					console.log("Aaaa");
						// 			   //      wx.getUserInfo({
						// 			   //        success: function (getuserinfo) {
						// 			   //          // that.data.hasuserinfo = true;
						// 			   //          // that.setData(that.data);
						// 						// console.log()
						// 			   //        },
						// 			   //        fail: function (fres) {
						// 			   //          that.data.hasuserinfo = false;
						// 			   //          that.setData(that.data);
						// 			   //        }
						// 			   //      })
						// 				},
						// 			})


						// 		} else if (res.cancel) {
						// 			console.log("用户点击取消");
						// 		}
						// 	}
						// })
				  //       // wx.authorize({
				  //       //   scope: 'scope.userLocation',
				  //       //   success() {

				  //       //   }
				  //       // })
				  //     }else{
						  console.log("res.authSetting['scope.userLocation']")
						  // that.location()
							that.profileLogin()
					  // }
				    }
				  })
			},
			// 使用新接口
			profileLogin() {
				debugger
				uni.showLoading({
					title: '正在加载',
					icon: 'none'
				})
				this.getOpenID()

				console.log('使用新接口')
				console.log(this.canIUseGetUserProfile)
				uni.getUserProfile({
					desc: '完善会员信息',
					success: res => {
						console.log(res)
						uni.setStorageSync("userInfo", JSON.stringify(res))
						// 存储用户信息
						uni.setStorage({
							data: res,
							key: 'userInformation',
							success: res => {
								console.log('存储用户信息')

								uni.getStorage({
									key: 'openid',
									success: async (res) => {
										console.log(res)
										this.entry(res)
									},
									fail: async(res) =>{
										console.log(res)
									}
								})
							}
						})
						//保存用户信息
					},
					fail: err => {
						console.log(err)
						uni.hideLoading()
					}
				})
			},
			// 使用旧接口
			login() {
				debugger
				console.log('使用旧接口')
				console.log(uni.getUserProfile)
				console.log(this.canIUseGetUserProfile)
				// 隐藏弹窗
				this.closeLogin()
				uni.showLoading({
					title: '正在加载',
					icon: 'none'
				})
				uni.getUserInfo({
					success: res => {
						console.log(res)
						uni.setStorageSync("userInfo", JSON.stringify(res))
						// 存储用户信息
						uni.setStorage({
							data: res,
							key: 'userInformation',
							success: res => {
								console.log('存储用户信息')
							}
						})
					},
					fail: err => {
						console.log(err)
						uni.hideLoading()
					}
				})
			},

			// 获取用户信息成功存储位置录入信息
			location() {
				// 获取地址
				uni.showLoading({
					title: '正在加载',
					icon: 'none'
				})
				uni.getLocation({
					success: res => {
						console.log('getLocation',res)
						var location = {
							latitude: res.latitude,
							longitude: res.longitude
						}
						uni.hideLoading()
						uni.setStorage({
							data: location,
							key: 'location',
							success: res => {
								console.log('存储地址成功')
							},
							fail: err => {
								console.log('存储地址失败')
							}
						})
					},
					fail: err => {
						uni.hideLoading()
						console.log(err)
						uni.showToast({
							title: '请允许位置授权,再进行登录',
							icon: 'none',
							duration:3000
						})
						return
					}
				})
			},

			// 获取openID
			async getOpenID() {
				console.log('请求微信登录')

				uni.login({
					success: async (res) => {
						console.log(res, "微信登录成功") //微信登录成功
						let param = {
							code: res.code
						}
						try {
							debugger
							console.log(this.$api.weixin.login)
							const resultData = await this.$api.weixin.login(param)
							console.log(resultData)
							// 存储session_key
							uni.setStorage({
								data: resultData.data.session_key,
								key: 'session_key',
								success: res => {
								console.log("session_key存储成功")
								}
							})
							uni.setStorage({
								data: resultData.data,
								key: 'openid',
								success: res => {
									console.log("openid存储成功")
								}
							})
							// 调用信息录用接口
						} catch (err) {
							console.log('获取OpenID失败', err)
							uni.hideLoading()
						}
					},
					fail: err => {
						console.log('微信登录失败', err)
					}
				})

				// openID().then(openidRes => {
				// 	console.log(openidRes.data)
				// 	// 存储session_key
				// 	uni.setStorage({
				// 		data: openidRes.data.data.session_key,
				// 		key: 'session_key',
				// 	})
				// 	// 调用信息录用接口
				// 	this.entry(openidRes)
				// }).catch((err) => {
				// 	console.log(err)
				// })
			},
			// 信息录入接口
			entry(openidRes) {

				console.log("entry")

				uni.getStorage({
					key: 'userInformation',
					success: async (userRes) => {
						// console.log(openidRes)
						console.log(userRes)
						var openid = openidRes.data.openid
						// 信息录入请求参数
						console.log(openidRes)

						var param = {
							Session_Key: openidRes.data.session_key,
							UnionId: openidRes.data.unionid || '',
							Phone: '',
							OpenId: openid,
							NickName: userRes.data.userInfo.nickName,
							Imgurl: userRes.data.userInfo.avatarUrl,
							Iv: userRes.data.iv,
							EncryptedData: userRes.data.encryptedData,
							EquipmentType: 'C'
						}
						console.log(param)
						// 发起信息录取接口
						try {
							const resultData = await this.request('AppApi/SetUserCard', 'POST', param)
							console.log("SetUserCard")
							console.log(resultData)
							var data = resultData.data
							console.log(data)
							if (resultData.message == "用户已存在！无需录入") {
								console.log('用户已存在！无需录入，重新获取个人中心数据')
								console.log(openidRes)
								uni.setStorage({
									data: data,
									key: 'information',
									success: res => {
										this.PersonalCenter(openidRes, '用户已存在')
									}
								})
							} else {
								// app.globalData.UserId = data.UserId
								uni.setStorage({
									data: data,
									key: 'information',
									success: res => {
										this.PersonalCenter(openidRes)
									}
								})
							}

						} catch (err) {
							console.log(err)
							if (err.tip === true) {
								uni.showToast({
									title: '当前人数较多，请重试',
									icon: 'none'
								})
							} else {
								console.log('接口报错')
								uni.showToast({
									title: '出了点问题，请及时联系店员反馈',
									icon: 'none'
								})
							}
						}
						// 	InformationInput(InfoParameter).then(res => {
						// 		console.log(res)
						// 		if (res.data.state === 1) {
						// 			if (res.data.message == "用户已存在！无需录入") {
						// 				console.log('用户已存在！无需录入，重新获取个人中心数据')
						// 				console.log(openidRes)
						// 				var data = res.data.data
						// 				console.log(data)
						// 				uni.setStorage({
						// 					data: data,
						// 					key: 'information',
						// 					success: res => {
						// 						this.PersonalCenter(openidRes, '用户已存在')
						// 					}
						// 				})
						// 			} else {
						// 				var data = res.data.data
						// 				console.log(data)
						// 				app.globalData.UserId = data.UserId
						// 				uni.setStorage({
						// 					data: data,
						// 					key: 'information',
						// 					success: res => {
						// 						this.PersonalCenter(openidRes)
						// 					}
						// 				})
						// 			}
						// 		} else if (res.data.state === 7) {
						// 			console.log('接口报错')
						// 			uni.showToast({
						// 				title: '当前人数较多，请重试',
						// 				icon: 'none'
						// 			})
						// 			// uni.hideLoading()
						// 		} else {
						// 			console.log('接口报错')
						// 			uni.showToast({
						// 				title: '出了点问题，请及时联系店员反馈',
						// 				icon: 'none'
						// 			})
						// 			// uni.hideLoading()
						// 		}
						// 	})


					}
				})
			},

			// 获取个人中心接口
			PersonalCenter(openidRes, phone) {
				console.log(123);
				uni.getStorage({
					key: 'information',
					success: res => {
						console.log(res.data);
						var data = res.data; // console.log(data)

						console.log(openidRes);
						console.log(phone);
						var openid = openidRes.data.openid;
						uni.getStorage({
							key: 'location',
							success: async (locationRes) => {
								console.log(locationRes.data);

								if (locationRes.data) {
									//  个人中心请求参数
									var parameter = {
										// OpenId: `${openid}`, //小程序的唯一标识
										// OpenId: `dggfhfghdssfddsswwddfdsdgh`, //小程序的唯一标识
										Longitude: locationRes.data.longitude,
										//经度
										Latitude: locationRes.data.latitude,
										//纬度
										UserId: data.UserId // UserId: 100187

									};
									uni.setStorage({
										data: parameter,
										key: 'parameter'
									});
									// 发起个人中心接口
									console.log(parameter, '???');
									try {
										const resultData = await this.request('/AppApi/GetUserCenter', 'POST', parameter)
										console.log(resultData);
										uni.setStorage({
											data: resultData,
											key: 'centre',
										})

										uni.setStorage({
											data: resultData.data.cardUser,
											key: 'membersInformation',
											success: res => {
												this.setData({
													register: false
												});
												console.log("首页数据存储成功");
											}
										});

										if(resultData.data.cardUser.Status===1){

											uni.getStorage({
												key: 'doctor',
												success: async (doctor) => {
													if(doctor.data&&doctor.data.doctorId&&doctor.data.doctorPhone){
														console.log('更新医生信息')
														var parameter = {
															DoctorId:doctor.data.doctorId,
															DoctorPhone:doctor.data.doctorPhone,
															UserId: resultData.data.cardUser.UserId,
														};
														await this.request('AppApi/SetUserCardInFo','POST',parameter)
													}
												}
											})

											uni.switchTab({
												url: '/pages/index/index'
											});
										}

										if (getCurrentPages().length != 0) {
											//刷新当前页面的数据
											getCurrentPages()[getCurrentPages().length - 1].onShow();
											let currentPage = getCurrentPages()[getCurrentPages().length - 1]
											
											let keyList = Object.keys(currentPage.options)
											
											if(currentPage.route.indexOf('/goods/goods')>-1){ // todo增加判断这可以后期优化
												if(keyList.length > 0){
												    let keys = '?'
												    keyList.forEach((item, index) =>{ 
														index === 0 ?  keys = keys + item + '=' + currentPage.options[item] : keys = keys + '&' + item + '=' + currentPage.options[item] 
													})
													uni.reLaunch({
														url:'/'+ currentPage.route + keys
													})
												}
											}
											console.log('存储我的页面信息,并强制刷新成功');
										}

										var img = oneDimensionalCode(resultData.data.imgurl);
										console.log(img);
										if (phone == 'shuaxin') {
											console.log('授权手机刷新个人中心');
											console.log(resultData.data);
										}
									} catch (err) {
										console.log(err, "个人中心接口请求失败");
									}
									uni.hideLoading();
									// personage('/AppApi/GetUserCenter', parameter).then(res => {
									// 	console.log(res.data);
									// 	uni.setStorage({
									// 		data: res.data,
									// 		key: 'centre',
									// 		success: res => {
									// 			console.log(getCurrentPages()[
									// 				getCurrentPages()
									// 				.length - 1]);

									// 			if (getCurrentPages().length !=
									// 				0) {
									// 				//刷新当前页面的数据
									// 				getCurrentPages()[
									// 						getCurrentPages()
									// 						.length - 1]
									// 					.onShow();
									// 				console.log(
									// 					'存储我的页面信息,并强制刷新成功');
									// 			}
									// 			// console.log('存储我的页面信息,并强制刷新成功')

									// 		}
									// 	}); // console.log(res.data.data)
									// 	// 存储会员用户信息

									// 	uni.setStorage({
									// 		data: res.data.data.cardUser,
									// 		key: 'membersInformation',
									// 		success: res => {
									// 			this.setData({
									// 				register: false
									// 			});
									// 			console.log("首页数据存储成功");
									// 		}
									// 	});
									// 	var img = oneDimensionalCode(res.data.data.imgurl);
									// 	console.log(img);

									// 	if (phone == 'shuaxin') {
									// 		console.log('授权手机刷新个人中心');
									// 		console.log(res.data.data);
									// 	}

									// }).catch(err => {
									// 	console.log(err, "个人中心接口请求失败");
									// });
								}
							}
						});
					}
				});
			},

			closeLogin() {
				this.setData({
					isShow: false
				});
			}

		}
	};
</script>
<style>
	@import "./login.css";
</style>
