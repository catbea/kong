export default (msg, url) => {
  if (!msg) {
    console.error('接口返回数据结构无法解析', msg)
    return false
  }
  switch (parseInt(msg.returnCode)) {
    case 10000:   // 默认正确的code
    // 以下为特殊处理,需要放到控制层处理的错误code,必须注释使用页面和错误行为
    case 31100:
      return true

    default:
      console.error(msg)
      window.vue.$toast(msg.msg)
      return false
  }
}
