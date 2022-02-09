import stringify from "@/util/querystring";
import cookie from '@/util/cookie'
import {switchTab, push, replace, go, back, reLaunch} from './router.js'

export function setTitle(title){
	uni.setNavigationBarTitle({
		title
	})
}
/**
 * 判断是否是微信
 */
export function isWeixin() {
	if (navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1) {
		return true
	}
	return false
}

/**
 * 判断用户权限
 */
export function handleAuth() {
	console.log("进入handleAuth")
	/**
	 *	如何判断权限?
	 *	用户如果登录了系统，会留下两个东西，一个是token，一个是userInfo
	 *	token存在会过期的问题，如果长时间没有打开小程序，会导致登录失效，出现打开一个页面瞬间跳转到授权页面的问题
	 *		解决办法，保存token的时候加上过期时间，每次请求都取一下缓存里的token
	 *	userInfo只是用来限时用户信息，作用并不是很大
	 * 	ps：只需要判断 token 是否存在即可
	 */
	if (cookie.get('login_status')) {
		return true
	}
	return false
}
/********************************* *url* *********************************/
// 获取当前url
export function parseQuery() {
	let res = {};

	// #ifdef H5
	const query = (location.href.split("?")[1] || "")
		.trim()
		.replace(/^(\?|#|&)/, "");

	if (!query) {
		return res;
	}

	query.split("&").forEach(param => {
		const parts = param.replace(/\+/g, " ").split("=");
		const key = decodeURIComponent(parts.shift());
		const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

		if (res[key] === undefined) {
			res[key] = val;
		} else if (Array.isArray(res[key])) {
			res[key].push(val);
		} else {
			res[key] = [res[key], val];
		}
	});
	// #endif
	// #ifndef H5
	var pages = getCurrentPages() //获取加载的页面
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var url = currentPage.route //当前页面url
	res = currentPage.options //如果要获取url中所带的参数可以查看options
	// #endif

	return res
}
/**
 * 格式化Url
 * @param {Object} location
 */
export function parseUrl(location) {
	if (typeof location === 'string') return location
	const {
		path,
		query
	} = location

	const queryStr = stringify(query)

	if (!queryStr) {
		return path
	}

	return `${path}?${queryStr}`
}

/*获取当前页url*/
export function getCurrentPageUrl() {
	var pages = getCurrentPages() //获取加载的页面 自带方法
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var url = currentPage.route //当前页面url
	return url
}

/*获取当前页带参数的url*/
export function getCurrentPageUrlWithArgs() {
	var pages = getCurrentPages() //获取加载的页面
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var url = currentPage.route //当前页面url
	var options = currentPage.options //如果要获取url中所带的参数可以查看options
	//拼接url的参数
	var urlWithArgs = url + '?'
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
	return urlWithArgs
}
/********************************* *url* *********************************/
// 复制到剪切板
export const copyClipboard = (data) => {
	uni.setClipboardData({
		data: data,
		success: (res) => {
			uni.showToast({
				title: '复制成功',
				icon: 'success',
				duration: 2000
			})
		}
	})
}

/**
 * 登录状态
 */
export const handleLoginStatus = (location, complete, fail, success) => {
	// 不登录可访问的页面
	let page = [{
		path: '/pages/index/index',
		name: 'loading页面'
	}
	]

	// 是否可以访问
	let isAuth = false
	console.log('即将跳转', location, parseUrl(location))

	// 从 location 中获取当前url，location typeof string || object
	let path = ''
	if (typeof location === 'string') {
		path = location
	} else {
		path = location.path
	}
	console.log("判断用户是否有token",handleAuth())
	// 判断用户是否有token
	if (!handleAuth()) {
		page.map((item) => {
			if (item.path == path) {
				isAuth = true
			}
		})
	} else {
		isAuth = true
	}

	return new Promise((resolve, reject) => {
	debugger
		if (isAuth) { 
			// todo
		// if (true) {
			// 有token
			if (path == '/pages/home/index' || path == '/pages/shop/GoodsClass/index' || path == '/pages/shop/ShoppingCart/index' || path == '/pages/user/User/index') {
				// switchTab({
				// 	path: parseUrl(location),
				// })
				// return
			}
			console.log('进入有token',parseUrl(location))
			resolve({
				url: parseUrl(location),
				complete,
				fail,
				success
			})
		} else {
			debugger
			// 没有token，先校验用户是否授权，如果授权了，进行自动登录
			routerPermissions(parseUrl(location))
			reject()
		}
	}).catch(error => {
		console.log(error)
	})
}

// 判断路由权限
export function routerPermissions(url, type) {
	console.log('routerPermissions', url)
	console.log('————————')
	console.log(url, type, 'routerPermissions')
	console.log('————————')
	let path = url
	if (!path) {
		path = '/' + getCurrentPageUrlWithArgs()
	}
	console.log(Vue.prototype.$deviceType)
	if (Vue.prototype.$deviceType == 'routine') {
		console.log('————————')
		console.log('当前是微信小程序，开始处理小程序登录方法')
		console.log('————————')
		// 如果是微信小程序，跳转到授权页
		// 先校验用户是否授权，如果授权了，进行自动登录
		console.log('————————')
		console.log('开始校验权限')
		console.log('————————')
		authorize('userInfo').then(() => {
			// 自动登录
			console.log('————————')
			console.log('自动登录')
			console.log('————————')
			login().then(res => {
				// 登录成功，跳转到需要跳转的页面
				console.log('————————')
				console.log('登录成功，跳转页面')
				console.log('————————')
				store.commit("updateAuthorizationPage", false);
				if (path == '/pages/shop/ShoppingCart/index' || path == '/pages/user/User/index') {
					console.log('————————')
					console.log('当前是购物车，或者个人中心')
					console.log('————————')
					return
				}
				if (type == 'reLaunch') {
					reLaunch({
						path,

					})
					return
				}
				if (type == 'replace') {
					replace({
						path,
					})
					return
				}
				push({
					path,
				})
			}).catch(error => {
				console.log('————————')
				console.log('自动登录失败，跳转到授权页面')
				console.log('————————')
				uni.showToast({
					title: error,
					icon: "none",
					duration: 2000
				});
				reLaunch({
					path: '/pages/authorization/index',
				})
				cookie.set('redirect', path)
			})
		}).catch(error => {
			// 跳转到登录页面或者授权页面
			if (path == '/pages/shop/ShoppingCart/index' || path == '/pages/user/User/index') {
				switchTab({
					path,
				})
				store.commit("updateAuthorizationPage", false);
				return
			}
			reLaunch({
				path: '/pages/authorization/index',
			})
			cookie.set('redirect', path)
		})
		// } else if (Vue.prototype.$deviceType == 'weixin') {
		// wechat().then(() => oAuth());
		// if (!type) {
		// 	push({
		// 		path: url,
		// 	})
		// }
	} else {
		console.log(path)
		// 如果不是小程序跳转到登录页
		cookie.set('redirect', path)
		push({
			path: '/pages/user/Login/index',
		})
	}

}

// 发送请求失败或者是没有获取到token的时候需要调用这个
export const handleLoginFailure = () => {
	console.log('————————')
	console.log('退出登录，标记当前页面为授权页面，防止多次跳转')
	console.log('————————')

	store.commit("logout");
	// 改为授权取消
	store.commit("updateAuthorization", false);


	let currentPageUrl = getCurrentPageUrl()
	if (store.state.$deviceType == 'weixin') {
		// 如果不是授权页面，
		if (!store.getters.isAuthorizationPage) {
			// 标识当前为授权页面
			store.commit("updateAuthorizationPage", true);
			toAuth()
		}
		return
	} else {
		// token 失效
		// 判断当前是不是已经在登录页面或者授权页，防止二次跳转
		if (store.getters.isAuthorizationPage || currentPageUrl == '/pages/user/Login/index') {
			console.log(store.getters.isAuthorizationPage, currentPageUrl, '已经是登录页面或者授权页面，跳出方法')
			return
		}
	}


	console.log('————————')
	console.log('当前是授权页面')
	console.log(store.getters)
	console.log('————————')
	store.commit("updateAuthorizationPage", true);

	let path = '/' + getCurrentPageUrlWithArgs()

	let qrCode = handleQrCode()

	if (qrCode) {
		// 当前是通过海报扫描进入的

		// 判断是不是拼团进来的
		if (currentPageUrl == 'pages/activity/GroupRule/index') {
			console.log('————————')
			console.log('是拼团进来的')
			console.log('————————')
			if (qrCode.pinkId) {
				path = parseUrl({
					path: `/ ${currentPageUrl} `,
					query: {
						id: qrCode.pinkId,
					}
				})
				if (qrCode.spread) {
					cookie.set("spread", qrCode.spread || 0);
				}
			} else {
				console.log('————————')
				console.log('是拼团进来的,但是没有获取到参数')
				console.log('————————')
				handleNoParameters()
			}
		}

		// 判断是不是扫描的砍价海报进来的
		if (currentPageUrl == 'pages/activity/DargainDetails/index') {
			console.log('————————')
			console.log('是扫描的砍价海报进来的')
			console.log('————————')

			if (qrCode.bargainId) {
				path = parseUrl({
					path: `/ ${currentPageUrl} `,
					query: {
						id: qrCode.bargainId,
						partake: qrCode.uid
					}
				})
				if (qrCode.spread) {
					cookie.set("spread", qrCode.spread || 0);
				}
			} else {
				handleNoParameters()
				console.log('————————')
				console.log('是扫描的砍价海报进来的,但是没有获取到参数')
				console.log('————————')
			}
		}

		if (currentPageUrl == 'pages/shop/GoodsCon/index') {
			console.log('————————')
			console.log('是扫描的商品详情')
			console.log('————————')

			if (qrCode.productId) {
				path = parseUrl({
					path: `/ ${currentPageUrl} `,
					query: {
						id: qrCode.productId,
					}
				})
				if (qrCode.spread) {
					cookie.set("spread", qrCode.spread || 0);
				}
			} else {
				handleNoParameters()
				console.log('————————')
				console.log('是扫描的商品详情进来的,但是没有获取到参数')
				console.log('————————')
			}
		}
	}



	console.log('————————')
	console.log(path, '重定向页面地址')
	console.log('————————')
	routerPermissions(path, 'reLaunch')
}

/**
 * 扫码进入
 */

export function handleQrCode() {
	var urlSpread = parseQuery()["q"];
	if (urlSpread) {
		if (urlSpread.indexOf('%3F') != -1) {
			// 通过海报二维码进来
			urlSpread = urlSpread
				.split("%3F")[1]
				.replace(/%3D/g, ":")
				.replace(/%26/g, ",")
				.split(",")
				.map((item, index) => {
					item = item.split(":");
					return `"${item[0]}":"${item[1]}"`;
				})
				.join(",");
			urlSpread = JSON.parse("{" + urlSpread + "}");
			return urlSpread
		} else {
			return handleUrlParam(urlSpread)
		}
	}
	return null
}
/**
 * 判断参数是否缺失
 */
const handleNoParameters = () => {
	uni.showToast({
		title: '未获取到必要参数，即将跳转首页',
		icon: 'success',
		duration: 2000
	})
	setTimeout(() => {
		clearTimeout()
		switchTab({
			// todo
			path: '/pages/home/index',
		});
	}, 1500)
}

/**
 * 选择图片
 * @param {Object} callback
 */
export function chooseImage(callback) {
	uni.chooseImage({
		count: 1,
		sourceType: ["album"],
		success: res => {
			uni.getImageInfo({
				src: res.tempFilePaths[0],
				success: image => {
					console.log(image);
					uni.showLoading({ title: "图片上传中", mask: true });
					uni.uploadFile({
						// todo
						url: `${VUE_APP_API_URL}/api/upload`,
						file: image,
						filePath: image.path,
						header: {
							Authorization: "Bearer " + store.getters.token
						},
						name: "file",
						success: res => {
							if (callback) {
								callback(JSON.parse(res.data).link)
							}
						},
						fail: err => {
							uni.showToast({
								title: "上传图片失败",
								icon: "none",
								duration: 2000
							});
						},
						complete: res => {
							uni.hideLoading()
						}
					});
				},
				fail: err => {
					uni.showToast({
						title: "获取图片信息失败",
						icon: "none",
						duration: 2000
					});
				}
			});
		}
	});
}

/**
 * 获取图片信息
 */
const getImageInfo = (images) => {
	return new Promise((resolve, reject) => {
		let imageAry = {}
		images.map((item, index) => {
			uni.getImageInfo({
				src: item,
				fail: function (res) {
					imageAry[index] = null
					if (imageAry.length == images.length) {
						resolve(imageAry)
					}
				},
				success: function (res) {
					imageAry[index] = res
					if (Object.keys(imageAry).length == images.length) {
						resolve(imageAry)
					}
				}
			})
		})
	})
}

// 获取当前环境的服务商
export const getProvider = (service) => {
	return new Promise((resolve, reject) => {
		// 获取当前环境的服务商
		uni.getProvider({
			service: service || 'oauth',
			success: function (res) {
				// 此处可以排除h5
				if (res.provider) {
					resolve(res.provider[0])
				}
			},
			fail() {
				reject('获取环境服务商失败')
			}
		})
	}).catch(error => {
		console.log(error)
	})

}
/**
 * 获取是否授权
 */
export const authorize = (authorizeStr) => {
	return new Promise((resolve, reject) => {
		console.log('检验授权', `scope.${authorizeStr}`)
		uni.getSetting({
			success(res) {
				console.log(res.authSetting)
				if (res.authSetting[`scope.${authorizeStr}`]) {
					resolve('获取授权成功')
				} else {
					reject('获取授权失败')
				}
			},
			fail() {
				reject('获取设置失败')
			}
		})

	})
}
// 登录
export const login = () => {
	return new Promise((resolve, reject) => {
		if (Vue.prototype.$deviceType == 'weixin') {
			// 微信授权登录
			const { code } = parseQuery()
			if (code) {
				auth(code)
					.then(() => {
						let redirect = cookie.get('redirect').replace(/\ /g, '')
						console.log(redirect)
						if (redirect) {
							redirect = redirect.split('/pages')[1]
							reLaunch({
								path: '/pages' + redirect,
							});
							cookie.remove('redirect');
						} else {
							reLaunch({
								path: '/pages/home/index',
							});
						}
					})
					.catch(() => {
						reject('当前运行环境为微信浏览器')
						reLaunch({
							path: '/pages/home/index',
						});
					});
			} else {
			}
			return
		}
		if (Vue.prototype.$deviceType == 'weixinh5') {
			console.log('当前运行环境为H5')
			reject('当前运行环境为H5')
			return
		}
		if (Vue.prototype.$deviceType == 'app') {
			console.log('当前运行环境为app')
			reject('当前运行环境为app')
			return
		}
		console.log('————————————————————')
		console.log('开始登录')
		console.log('————————————————————')
		console.log('获取环境商')
		getProvider().then(provider => {
			console.log('当前的环境商')
			console.log(provider)
			if (!provider) {
				reject()
			}
			// 调用登录接口
			console.log('调用登录接口')
			uni.login({
				provider: provider,
				success: function (loginRes) {
					// 微信登录
					console.log('登录接口调用成功')
					console.log('开始检查用户信息授权')
					let code = loginRes.code;
					cookie.set('wxLoginCode', loginRes.code)
					// 检查授权， 检查用户信息授权
					authorize('userInfo').then(() => {
						console.log('授权通过')
						console.log('开始获取用户信息')
						uni.getUserInfo({
							provider: provider,
							success: function (user) {
								console.log('获取用户信息成功')
								console.log('开始调用登录接口')
								wxappAuth({
									encryptedData: user.encryptedData,
									iv: user.iv,
									code: code,
									spread: cookie.get("spread")
								}).then(({ data }) => {
									console.log('登录接口调用成功')
									console.log('开始处理登录信息保存，并获取用户详情')
									uni.hideLoading();
									store.commit("login", data.token, dayjs(data.expires_time));
									store.dispatch('userInfo', true)
									getUserInfo().then(user => {
										console.log('获取用户信息成功')
										uni.setStorageSync('uid', user.data.uid);
										store.dispatch('setUserInfo', user.data)
										resolve(user)
									}).catch(error => {
										console.log('获取用户信息失败')
										reject('获取用户信息失败')
									});
								}).catch(error => {
									console.log(error)
									console.log('登录接口调用失败')
									reject('登录接口调用失败')
								});
							},
							fail() {
								console.log('获取用户信息失败')
								reject('获取用户信息失败')
							}
						});
					}).catch(error => {
						console.log('用户未授权')
						reject('用户未授权')
					})
				},
				fail() {
					console.log('调用登录接口失败')
					reject('调用登录接口失败')
				}
			});
		}).catch(error => {
			reject('获取环境服务商失败')
		})
	})
}

/**
 * 获取分享海报
 * @param array store 海报素材
 * @param string store_name 素材文字
 * @param string price 价格
 * @param function successFn 回调函数
 *
 *
 */
export const PosterCanvas = (store, successCallBack) => {
	uni.showLoading({
		title: '海报生成中',
		mask: true
	});
	getImageInfo([store.image, store.code]).then(res => {
		let contentHh = 48 * 1.3
		const ctx = uni.createCanvasContext('myCanvas')
		ctx.clearRect(0, 0, 0, 0);
		const WIDTH = 747
		const HEIGHT = 1326;
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.drawImage(res[0].path, 0, 0, WIDTH, WIDTH);
		ctx.drawImage(res[1].path, 40, 1064, 200, 200);
		ctx.save();
		let r = 90;
		let d = r * 2;
		let cx = 40;
		let cy = 990;
		ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
		ctx.clip();
		ctx.restore();
		ctx.setTextAlign('center');
		ctx.setFontSize(48);
		ctx.setFillStyle('#000');
		ctx.fillText(store.title, WIDTH / 2, 810 + contentHh);
		ctx.setTextAlign('center')
		ctx.setFontSize(32);
		ctx.setFillStyle('red');
		ctx.fillText('￥' + store.price, WIDTH / 2, 985);
		ctx.setTextAlign('center')
		ctx.setFontSize(22);
		ctx.setFillStyle('#333333');
		ctx.fillText('长按识别二维码立即购买', WIDTH / 2, 1167);
		ctx.save();
		ctx.draw(true, () => {
			uni.canvasToTempFilePath({
				canvasId: 'myCanvas',
				fileType: 'png',
				destWidth: WIDTH,
				destHeight: HEIGHT,
				success: function (res) {
					uni.hideLoading();
					successCallBack && successCallBack(res.tempFilePath);
				},
				fail: function (error) {
					console.log(error)
				},

			})
		});

	})

	// uni.getImageInfo({
	//   src: store.image,
	//   fail: function (res) {
	//     uni.showToast({
	//       title: '海报生成失败',
	//       icon: "none",
	//       duration: 2000
	//     });
	//   },
	//   success: function (res) {

	//   }
	// })
}