import {
	Http
} from '@/util/request.js'

const http = new Http()

// 微信登录
function login(data = {}) {
	// return http.request({
	// 	url: '/poem/weixin/login',
	// 	data
	// })
}
const weixin = {
	login
}

export default weixin
