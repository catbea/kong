/**
 * 格式化数值
 * @param {Number} 格式化数值
 * @param {Int} 格式化类型
 */
export default (num, type=0) => {
  let _num = Number(num)
  switch (type) { // 需要的数字过滤器在这里加
    case 0: // 中文 11000 -> 11万 || 110000000 -> 1.1亿 (万位取整,亿取1位小数点)
      return numProcess(_num)
    case 1: // 英文 1100 -> 11k
      if (_num > 1000000000) {
        return (_num / 100000000).toFixed(1) + 'm'
      } else if (_num > 100000) {
        return (_num / 10000).toFixed(1) + 'w'
      } else if (_num > 10000) {
        return (_num / 1000).toFixed(1) + 'k'
      } else {
        return _num
      }
    default:
      return numProcess(_num)
  }
}

/**
 * 中文数字简化方案
 * @param {*} num 
 */
function numProcess (num) {
  if (num >= 100000000) {
    if (num % 100000000 === 0) {
      return num / 100000000 + '亿'
    }
    return (num / 100000000).toFixed(2) + '亿'
  } else if (num >= 10000) {
    let numStr = (num / 10000).toFixed(2)
    let numStrArray = (numStr + '').split('.')
    // 99999等也会显示1.00,10.00所以统一处理
    return (numStrArray[1] === '00' ? numStrArray[0] : numStr) + '万'
  } else {
    return num
  }
}
