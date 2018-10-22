/**
 * 页面配置router.meta中属性等的处理
 */
export default (to, from, next) => {
  // title 修改
  document.title = to.meta.title ? to.meta.title : 'AW大师'
}