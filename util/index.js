import stringify from "@/util/querystring";
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
		if (isAuth) { //todo
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