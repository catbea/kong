export default class timeUtils {
  static fmtDate(obj) {
    var date = new Date()
    date.setTime(obj)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    var h = date.getHours()
    h = h < 10 ? '0' + h : h
    var minute = date.getMinutes()
    var second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  }

  //获取当前时间
  static getNowDay() {
    let date = new Date()
    let seperator1 = '-'
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  }

  //判断时间戳是前几天
  static getDateTimeBefor(publishtime) {
    var currTime = Date.parse(new Date())
    var l = parseInt(currTime) - parseInt(publishtime)
    // 少于一分钟
    var time = l / 1000
    if (time < 60) {
      return '刚刚'
    }

    // 秒转分钟
    var minuies = time / 60
    if (minuies < 60) {
      return Math.floor(minuies) + '分钟前'
    }

    // 秒转小时
    var hours = time / 3600
    if (hours < 24) {
      return Math.floor(hours) + '小时前'
    }
    //秒转天数
    var days = time / 3600 / 24
    if (days < 30) {
      return Math.floor(days) + '天前'
    }
    //秒转月
    var months = time / 3600 / 24 / 30
    if (months < 12) {
      return Math.floor(months) + '月前'
    }
    //秒转年
    var years = time / 3600 / 24 / 30 / 12
    return Math.floor(years) + '年前'
  }
}
