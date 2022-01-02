import App from './App'
import api from '@/common/api'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$api = api 
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
console.log(2222)
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
console.log(111)
// #endif