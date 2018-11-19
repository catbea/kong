import * as types from '@/store/mutation-types'
export default (to, from, next) => {
  let tabbarConf = Object.assign(vue.$store.state.system.tabbar, to.meta.tabbar)
  window.vue.$store.commit(types.TABBAR, tabbarConf)
}
