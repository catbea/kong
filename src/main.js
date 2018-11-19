import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import '@/directives'
import wechatApi from '@/utils/wechatApi'
import vant from './vant'

Vue.config.productionTip = false

// vant
import { Toast, Icon, PullRefresh, List, Popup } from 'vant'
Vue.use(Toast)
Vue.use(Icon)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Popup)
// globle
wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
