export default Vue => {
  Vue.directive('fuzz-dom', {
    componentUpdated(el, binding) {
      el.style.filter = 'blur(5px)'
    }
  })
}
