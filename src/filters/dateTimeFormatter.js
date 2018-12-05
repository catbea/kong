/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
let zerofill = val => (val >= 10 ? val : '0' + val)
/* 相当于：
  var zerofill = function (val) {
    return val >=10 ? val : '0' + val
  }
*/

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型
 * @return {String}
 */
export default (time, type, separate = '-') => {
  let date = new Date(parseInt(time))
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  switch (type) {
    case 0: // 03-15
      return `${zerofill(month)}${separate}${zerofill(day)}`
    case 1: // 11:12
      return `${zerofill(hours)}${separate}${zerofill(minutes)}`
    case 2: // 2017-03-15
      return `${year}${separate}${zerofill(month)}${separate}${zerofill(day)}`
    case 3: // 2017-03-15 11:12
      return `${year}${separate}${zerofill(month)}${separate}${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
    case 4: // 03-15 11:12
      return `${zerofill(month)}${separate}${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
    default:
      // 2017-03-15 11:12:13
      return `${year}${separate}${zerofill(month)}${separate}${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
  }
}
