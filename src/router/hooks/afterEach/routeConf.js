import * as types from '@/store/mutation-types'
export default (to, from, next) => {
  // 处理tabbar
  let target = {}
  if (to.meta && to.meta.tabbar&&to.meta.tabbar.show) {
    target = to.meta.tabbar
  } else {
    target = {show:false}
  }
    window.vue.$store.commit(types.TABBAR, target)
}
