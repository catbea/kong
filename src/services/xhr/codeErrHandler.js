export default (msg, url) => {
  if (!msg) {
    console.error('接口返回数据结构无法解析', msg)
    return false
  }
  if (parseInt(msg.returnCode) !== 10000) {
    console.error(msg)
    window.vue.$toast(msg.msg)
    return false
  }
  return true
}
