/**
 * 手机号码隐私处理
 */

export default (value = '') => {
  value = String(value)
  return value.length > 7 ? value.substr(0, 3) + '****' + value.substr(7) : ''
}
