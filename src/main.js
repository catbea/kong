import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import '@/directives'
import wechatApi from '@/utils/wechatApi'

Vue.config.productionTip = false

// vant
import { Toast, Icon, PullRefresh, List } from 'vant'

Vue.use(Toast)
Vue.use(Icon)
Vue.use(PullRefresh)
Vue.use(List)
// globle
wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
