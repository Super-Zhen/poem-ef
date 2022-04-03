import App from './App'
import api from '@/common/api'
import store from "./store";
import Vue from 'vue'
import { _router } from '@/util/router.js'

Vue.config.productionTip = false
Vue.prototype.$api = api 
Vue.prototype.$store = store
// #ifdef APP-PLUS
// App平台编译的代码
Vue.prototype.$deviceType = 'app'
store.commit('updateDevicetype', 'app')
Vue.prototype.$platform = uni.getSystemInfoSync().platform
// #endif

// #ifdef MP-WEIXIN
// 微信小程序编译的代码
Vue.prototype.$deviceType = 'routine'
store.commit('updateDevicetype', 'routine')
// #endif

Vue.prototype.$yrouter = _router
// Object.defineProperty(Vue.prototype, '$yrouter', {
// 	get() {
// 		return _router
// 	}
// })

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
console.log(2222)
