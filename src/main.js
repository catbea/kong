import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import '@/directives'

Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = window.devicePixelRatio
// vant
import { Toast, Icon, PullRefresh, List, Popup, Search } from 'vant'
Vue.use(Toast)
Vue.use(Icon)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Popup)
Vue.use(Search)
// globle
// wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
