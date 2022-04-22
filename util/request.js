let isRefreshing = true;
let subscribers = [];

function onAccessTokenFetched() {
	subscribers.forEach((callback) => {
		callback();
	})
	subscribers = [];
}

function addSubscriber(callback) {
	subscribers.push(callback)
}

export class Http {
	constructor() {}

	request({
		url,
		data = {},
		method = 'post',
		header,
		callback = ''
	} = {}) {
		let baseUrl = ''
	//#ifdef APP-PLUS
		baseUrl = "http://150.158.34.153" //后台请求接口的公共部分
	//#endif
		let _this = this;
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				data,
				method,
				header: {
					"Authorization": "Bearer "+uni.getStorageSync('token'),
					"content-type": method == 'post' || method == 'POST' ?
						'application/x-www-form-urlencoded' : 'application/json; charset=utf-8'
				},
				callback,
				fail(res) {
					reject(res)
				},
				complete: res => {
					// callback token过期后重新请求接口，接口返回的数据
					if (callback) return callback(res.data);
					let {statusCode,errMsg} = res;
					// console.log(statusCode, 'statusCode')
					if (statusCode == 404) {
						console.log('接口不存在')
					} else if (statusCode == 401 || statusCode == 10002 ) {
						debugger
						// 将需要重新执行的接口缓存到一个队列中
						addSubscriber(() => {
							_this.request({
								url,
								data,
								method,
								header,
								callback: resolve
							})
						})

						if (isRefreshing) {
							getNewToken(`${baseUrl}/token/getToken`, url, data).then(() => {
								// 依次去执行缓存的接口
								onAccessTokenFetched();
								isRefreshing = true;
							})
						}
						isRefreshing = false;
					} else if (statusCode == 200 || statusCode == 0 || statusCode == 1) {
						// 登录成功，抛出数据
						resolve(res.data)
					}else if (statusCode == 10004) {
						reject(res.data)
					}else if(statusCode == 30001 || statusCode == 30002){
						// 提示用户登录信息不全，需要获取用户信息
						uni.navigateTo({
							url:"/pages/login/login"
						})
					} 
					// else if (statusCode.startsWith('5')) {
					// 	uni.showModal({
					// 		content: '服务器报错，请重试！',
					// 		showCancel: false
					// 	});
					// }
				}
			})
		})
	}
}

// 获取token，token请求的接口通过形参传进来
const getNewToken = (url) => {
	return new Promise((resolve, reject) => {
		uni.login({
			success(res) {
				console.log(res)
				uni.request({
					url: url,
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						code: res.code
					},
					success(res) {
						console.log(res, 'token')
						let r = res.data;
						console.log(r, 'r')
						// 将所有存储到观察者数组中的请求重新执行。
						if (r.code == 0) {
							const token = r.data;
							// 使用本地缓存，把token存起来
							uni.setStorageSync('token', token);
							resolve(res);
						}
					}
				})
			},
			fail(err) {
				reject()
				console.error('uni login fail', err);
			}
		});
	})
}

