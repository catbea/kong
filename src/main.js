import Vue from 'vue'
import 'amfe-flexible'
import App from '@/App.vue'
import router from '@/router/'
import store from '@/store/'
import '@/filters'
import '@/directives'
import '@/vant' // vant
import global from '@/global/'
import vconsole from 'vconsole'
Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = window.devicePixelRatio
global()

if (process.env.NODE_ENV === 'development') {

  Vue.config.silent = false
  Vue.config.devtools = true
} else if (process.env.NODE_ENV === 'production') {
  Vue.config.silent = true
  Vue.config.devtools = false
}

if (process.env.VUE_APP_TOOL_VCONSOLE) new vconsole()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
