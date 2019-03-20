export default (msg, url) => {
  if (!msg) {
    console.error('接口返回数据结构无法解析', msg)
    return false
  }
  switch (parseInt(msg.returnCode)) {
    case 10000: // 默认正确的code
    // 以下为特殊处理,需要放到控制层处理的错误code,必须注释使用页面和错误行为
    case 31100:
    case 31102:
    case 10500: //文章解析异常(一个输入框填写一个具有正确域名地址却不是正确的文章地址问题)
    case 31106: //同个人不可解析同一篇文章
    case 21105: // 注册
    case 21103: // 验证码错误
    case 21801: // 开通楼盘vip到期
    case 10028: // 文章被下架或被删除--待处理
    case 44006: // 您暂无权限参与该活动
    case 44007: // 该活动已结束，谢谢参与
    case 44009: // 该活动未开始，敬请关注
    case 44011: // 手机号码已领取奖励，请勿重复参加
      return true
    case 21600: // 无分享记录的时候调的接口错误，不提示
      return false
    default:
      console.error(msg)
      window.vue.$toast(msg.msg)
      return false
  }
}
