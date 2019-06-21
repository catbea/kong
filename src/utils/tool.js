// 校验最大字符串长度
export function checkStrLength(str, maxLen) {
  str += ''
  str = str.trim()
  if (str.length === 0) {
    return false
  }
  let len = str.replace(/[^\x00-\xFF]/g, '**').length
  return len <= maxLen
}

// 校验符串类型为中文、英文和数字
export function checkStrType(str) {
  if (!str) {
    return false
  }
  let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/g
  return reg.test(str)
}

// 校验手机号码
export function checkPhoneNum(str) {
  if (!str) {
    return false
  }
  let reg = /^1[3-9]\d{9}$/g
  return reg.test(str)
}

// 防抖动方法 fn: 回调方法 wait：延迟时间 immediate: 第一次是否立即执行
export function debounce(fn, wait = 500, immediate = false) {
  let timeout = null
  return function (...args) {
    let content = this
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        fn.apply(content, args)
      }
    } else {
      timeout = setTimeout(() => {
        fn.apply(content, args)
      })
    }
  }
}

// 图片上传相关方法
export function randomString(len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  var timestamp = new Date().getTime()
  return timestamp + pwd + '.png'
}

// base64转blob
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// base64图片下载
export function downloadFile(content, fileName) {
  var base64ToBlob = function (code) {
    let parts = code.split(';base64,')
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {
      type: contentType
    })
  }
  let aLink = document.createElement('a')
  let blob = base64ToBlob(content) //new Blob([content]);
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true) //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

// 格式化时间 xx小时前
export function formatTime(time, option) {
  time = +time
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
// 格式化时间  {y}-{m}-{d}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time)
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => { // eslint-disable-line
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str // eslint-disable-line
}

export function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = ''

  var uuid = s.join('')
  return uuid
}

export function checkIOSVersion() {
  let ua = navigator.userAgent.toLowerCase()
  let version = ''
  if (ua.indexOf("like mac os x") > 0) {
    var reg = /os [\d._]+/gi;
    var v_info = ua.match(reg);
    version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号9.3.2或者9.0
    // version = parseInt(version.split('.')[0]); // 得到版本号第一位
  }
  return version
}

export function trim(str) {
  str = str.replace(/^(\s|\u00A0)+/, '');
  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return str;
}


export function formatDate(val, format) {
  const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
  if (val) {
    if (val.toString().indexOf('-') > 0) {
      val = val.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/') // 将 '-' 替换成 '/'
      val = val.slice(0, val.indexOf('.')) // 删除小数点及后面的数字
    }
    let date = new Date(val)
    date.setHours(date.getHours() + 8)
    const [whole, yy, MM, dd, hh, mm, ss] = date.toISOString().match(REGEX)
    if (format) {
      return format
        .replace('YYYY', yy)
        .replace('YY', yy.slice(2))
        .replace('MM', MM)
        .replace('DD', dd)
        .replace('hh', hh)
        .replace('mm', mm)
        .replace('ss', ss)
    } else {
      return [yy, MM, dd].join('-') + ' ' + [hh, mm, ss].join(':')
    }
  } else {
    return '--'
  }
}