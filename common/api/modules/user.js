import {Http} from '@/util/request.js'

const http = new Http()

// 登录
function login(data){
	return http.request({
		url:'/poem/user/login',
		data
	})
}

// 图片验证码
function codeImg(data={}){
	return http.request({
		url:'/poem/user/codeimg',
		data,
		method:'get'
	})
}
// 判断用户是否存在
function userIsExist(data={}){
	return http.request({
		url:'/poem/user/isexist',
		data,
		method:'get'
	})
}

const user = {
	login,
	codeImg,
	userIsExist
}

export default user