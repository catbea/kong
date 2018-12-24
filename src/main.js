import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import '@/directives'
import '@/vant' // vant
import '@/global/'
Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = window.devicePixelRatio

// globle
// Vue.$wechatHelper()
window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
