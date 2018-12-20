export default (msg, url) => {
  // debugger
  if (!msg) {
    console.error('接口返回数据结构无法解析',msg);
    return false
  }
  if (parseInt(msg.returnCode) !== 10000) {
    console.error(msg);
    window.vue.$notify(msg.msg)
    return false
  }
  return true
}
