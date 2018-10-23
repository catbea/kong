/*
 * 切换页面时的弹窗清理
 */
export default (to, from, next) => {
  if(!window.vue) return
  if(window.vue.$toast) vue.$toast.clear()
}
