/**
 * 货币转换 参考vue @1.x 过滤器
 * 12345 => $12,345.00
 *
 * @param {String} currency 货币前缀
 * @param {Number} decimals 小数点后位数
 */

export default (value, currency = '$', decimals = '2', removeZero = 'false') => {
  let digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  let stringified = Math.abs(value).toFixed(decimals)
  let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  let i = _int.length % 3
  let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  let _float = decimals ? stringified.slice(-1 - decimals) : ''
  let sign = value < 0 ? '-' : ''
  let result = sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  return removeZero ? Number(String(result.replace(',', ''))) : result
}
