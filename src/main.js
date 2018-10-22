import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'

import wechatApi from '@/utils/wechatApi'

Vue.config.productionTip = false

// globle
wechatApi.init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
