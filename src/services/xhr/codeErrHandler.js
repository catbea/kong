export default (msg, url) => {
  if (!msg) {
    console.error('接口返回数据结构无法解析', msg)
    return false
  }
  switch (parseInt(msg.returnCode)) {
    case 10000: // 默认正确的code
    // 以下为特殊处理,需要放到控制层处理的错误code,必须注释使用页面和错误行为
    case 31100:
      return true
    case 31102:
      return true
    case 10500:   //文章解析异常(一个输入框填写一个具有正确域名地址却不是正确的文章地址问题)
      return true
    case 31106:   //同个人不可解析同一篇文章
      return true
    case 21105: // 注册
      return true
    case 21103: // 验证码错误
      return true
    case 10028: // 文章被下架或被删除--待处理
      return

    default:
      console.error(msg)
      window.vue.$toast(msg.msg)
      return false
  }
}
