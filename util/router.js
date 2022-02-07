import {handleLoginStatus} from '@/util/index.js'

// 重新定义路径跳转方法
export function push(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		console.log('1111',params)
		uni.navigateTo(params)
	}).catch(error => {
		// 没有权限

	})
}

export function replace(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		console.log(params)
		uni.redirectTo(params)
	}).catch(error => {
		// 没有权限

	})
}

export function reLaunch(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		console.log(params)
		uni.reLaunch(params)
	}).catch(error => {
		// 没有权限
		console.log(error)
	})
}

export function go(delta) {
	uni.navigateBack({
		delta
	})
}

export function back() {
	uni.navigateBack({
		delta: 1,
		success: function (e) { },
		fail: function (e) { }
	})
}

export function switchTab(location, complete, fail, success) {
	handleLoginStatus(location, complete, fail, success).then(params => {
		uni.switchTab(params)
	}).catch(error => {
		// 没有权限
	})
}

export const _router = {
	mode: 'history',
	switchTab,
	push,
	replace,
	go,
	back,
	reLaunch
}