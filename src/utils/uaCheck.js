// 各种检查
// 判断是否是微信浏览器
const isWeixin = () => {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}
// 判断是否是微博浏览器
const isWeibo = () => {
  return navigator.userAgent.toLowerCase().indexOf('weibo') !== -1
}

const isAndroid = () => {
  return navigator.userAgent.toLowerCase().indexOf('android') !== -1
}

const isIOS = () => {
  return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
}

export { isWeixin, isWeibo, isAndroid, isIOS }
