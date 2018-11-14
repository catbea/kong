import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import wechatApi from '@/utils/wechatApi'

Vue.config.productionTip = false

// vant
import { Toast,Icon } from 'vant'
Vue.use(Toast)
Vue.use(Icon)
// globle
wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
