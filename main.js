import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import uView from 'uview-ui'

import store from './store/index.js'
Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.use(uView)

Vue.prototype.$baseUrl = 'http://8.138.103.44:8000'
Vue.prototype.$baseUrl1 = 'http://8.138.103.44:3000'

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif