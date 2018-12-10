/**
 * 字符串过滤
 * @param {String} str      //被过滤的字符串
 * @param {Number} length   //定义多长是为超出
 * @param {String} symbol   //超出后的省略符号
 * @returns {String}
 */
export default (str, length = 32, symbol = '...') => {
  str = str + ''
  return str.length >= length ? str.substr(0, length) + symbol : str
}
