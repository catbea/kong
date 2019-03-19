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
import { checkIOSVersion } from '@/utils/tool'
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

router.beforeEach((to, from, next) => {    
  // chrome
  document.querySelector('.router-view').scrollTop = 0
  // firefox
  document.querySelector('.router-view').scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

router.beforeEach((to, from, next) => {    
  let version = checkIOSVersion()
    if (parseFloat(version) < parseFloat('10.3')) {
        this.$dialog.alert({
            message: '当前操作系统无法正常使用AW大师，请升级iOS系统后再次尝试'
        })
        return
    }
    next()
    console.log(version)
})



if (process.env.VUE_APP_TOOL_VCONSOLE) new vconsole()

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
