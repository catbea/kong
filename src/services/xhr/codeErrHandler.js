export default msg => {
  if (!msg) {
    return false
  }
  // TODO 应该是处理errorCode,后端codeError不完善弹窗提示
  if (!msg.result) {
<<<<<<< HEAD
=======
    console.error('!!![重大错误]!!!-接口返回数据不符合规范',msg);
    
>>>>>>> 01c4ff14ae6f7189a63b1159f382e264464ca93a
    // vue.$router.back()
  }
}
