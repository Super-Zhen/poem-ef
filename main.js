import App from './App'
import api from '@/common/api'
import store from "./store";
import Vue from 'vue'

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

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
console.log(2222)
