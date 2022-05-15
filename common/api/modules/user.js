import {
	Http
} from '@/util/request.js'

const http = new Http()

// 登录
function login(data = {}) {
	return http.request({
		url: '/poem/user/login',
		data
	})
}

// 退出
function loginout(data = {}) {
	return http.request({
		url: '/poem/user/loginout',
		data
	})
}

// 图片验证码
function codeImg(data = {}) {
	return http.request({
		url: '/poem/user/codeimg',
		data,
		method: 'get'
	})
}
// 判断用户是否存在
function userIsExist(data = {}) {
	return http.request({
		url: '/poem/user/isexist',
		data,
		method: 'get'
	})
}

// 注册添加用户
function register(data = {}) {
	return http.request({
		url: '/poem/user/register',
		data
	})
}

// 获取用户信息
function getUserInfo(data = {}) {
	return http.request({
		url: '/poem/user/getUserInfo',
		data,
		method: 'get'
	})
}

// 更新用户信息
function updataUserInfo(data = {}) {
	return http.request({
		url: '/poem/user/updataUserInfo',
		data
	})
}

// 上传头像

const user = {
	login,
	loginout,
	codeImg,
	userIsExist,
	register,
	getUserInfo,
	updataUserInfo
}

export default user
