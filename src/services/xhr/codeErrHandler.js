export default (msg, url) => {
  if (!msg) {
    return false
  }
  // TODO 应该是处理errorCode,后端codeError不完善弹窗提示
  if (!msg.result) {
    console.error('!!![重大错误]!!!-接口返回数据不符合规范', msg)
    console.error(url)

    // vue.$router.back()
  }
}
