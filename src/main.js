import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import '@/directives'
import '@/vant'   // vant
Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = window.devicePixelRatio


// globle
// wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
