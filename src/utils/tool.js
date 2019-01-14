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
  return function(...args) {
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
export function downloadFile (content, fileName) {
  var base64ToBlob = function (code) {
      let parts = code.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for(let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {
          type: contentType
      })
  }
  let aLink = document.createElement('a')
  let blob = base64ToBlob(content) //new Blob([content]);
  let evt = document.createEvent("HTMLEvents")
  evt.initEvent("click", true, true) //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

// 格式化时间 xx小时前
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
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
// 格式化时间  yyyy-mm-dd
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
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