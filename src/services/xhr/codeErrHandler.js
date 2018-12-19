export default (msg, url) => {
  debugger
  if (!msg) {
    return false
  }
  if (parseInt(msg.returnCode) !== 10000) {
    window.vue.$notify(msg.msg)
    return false
  }
  return true
}
