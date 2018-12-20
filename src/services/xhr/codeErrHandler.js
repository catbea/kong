export default (msg, url) => {
  if (!msg) {
    return false
  }
  if (parseInt(msg.returnCode) !== 10000) {
    window.vue.$notify(msg.msg)
    return false
  }
  return true
}
