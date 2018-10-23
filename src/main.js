import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'

import wechatApi from '@/utils/wechatApi'

Vue.config.productionTip = false

// vant
import { Toast } from 'vant'
Vue.use(Toast)
// globle
wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
