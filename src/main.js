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


// globle
wechatApi.init()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
