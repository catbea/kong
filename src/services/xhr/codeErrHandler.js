export default (msg) => {
  if(!msg) {
    return false
  }
  // TODO 应该是处理errorCode,后端codeError不完善弹窗提示
  if(!msg.result) {
    vue.$router.back()
  }
}