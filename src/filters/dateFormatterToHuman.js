import dateTimeFormatter from '@/filters/dateTimeFormatter.js'

const dayDiff = (timestamp1, timestamp2) => {
  const date1 = new Date(dateTimeFormatter(timestamp1, 2))
  const date2 = new Date(dateTimeFormatter(timestamp2, 2))
  const diffStamp = Math.abs(date1.getTime() - date2.getTime())
  return Math.floor(diffStamp / 86400000)
}
/**
 * 时间显示规则
 * 1、今天时间：大于3个小时显示【今天 HH:mm】,大于1个小时小于3个小时显示 【xxx 小时前】，1个小时内显示【xx分钟前】,1分钟内显示【xx秒前】
 * 2、昨天时间：显示【昨天 HH:mm】
 * 3、2天以前就直接返回时间字符串 格式 MM-dd HH:mm
 * 4、非本年时间显示格式 yy-MM-dd HH:mm'
 */
export default (date, serverTimestamp) => {
  const _targetTimestamp = (typeof (date) === 'number' ? new Date(date).getTime() : ((isNaN(typeof (parseInt(date)))) ? date : new Date(parseInt(date)).getTime())) // 应该限制date传入类型,而不应该作如此多的判断
  const _datumTimestamp = serverTimestamp ? new Date(parseInt(serverTimestamp)).getTime() : new Date().getTime() // 基准时间
  const _range = Math.abs(_targetTimestamp - _datumTimestamp)
  const _rangeDay = dayDiff(_targetTimestamp, _datumTimestamp)
  const _targetDateFormat = dateTimeFormatter(_targetTimestamp, 4)
  // 先判断是不是同一天（时间差不超过(24 * 3600 * 1000毫秒）且getDate()相等
  if (_range < 86400000 && _rangeDay === 0) {// 同一天
    if (_range > 10800000) {
      // 大于3小时
      return `今天${_targetDateFormat.substring(6)}`
    } else if (_range > 3600000) {
      // 大于1小时
      return `${Math.floor(_range / 60000)}分钟${_datumTimestamp > _targetTimestamp ? '前' : '后'}`
    } else if (_range > 60000) {
      // 大于一分钟
      return `${Math.floor(_range / 1000)}秒${_datumTimestamp > _targetTimestamp ? '前' : '后'}`
    } else {
      return '刚刚'
    }
  } else if (_range < 172800000 && _rangeDay < 2) {
    // 判断为昨天，时间差小于2天的毫秒数且天数相差小于2
    return `${_datumTimestamp > _targetTimestamp ? '佐' : '明'}天${_targetDateFormat.substring(6)}`
  } else {
    return _targetDateFormat
  }
}
