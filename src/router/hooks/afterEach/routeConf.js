import * as types from '@/store/mutation-types'
export default (to, from, next) => {
  let defaultTabbarConf = {
    show: true,
  }

  let tabbarConf = Object.assign(defaultTabbarConf,to.meta.tabbar)
  window.vue.$store.commit(types.TABBAR, tabbarConf)
}
