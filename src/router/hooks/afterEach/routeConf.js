import * as types from '@/store/mutation-types'
export default (to, from, next) => {
  if(!to.meta.tabbar) return
  vue.$store.state.system.tabbar.show = false
  let tabbarConf = Object.assign(vue.$store.state.system.tabbar, to.meta.tabbar)
  window.vue.$store.commit(types.TABBAR, tabbarConf)
}
