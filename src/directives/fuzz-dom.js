export default Vue => {
  Vue.directive('fuzz-dom', {
    componentUpdated(el, binding) {
      el.style.filter = 'blur(5px)'
      el.style['box-shadow'] = '0 0 0 50vmax rgba(0,0,0,0.6) inset'
    }
  })
}
