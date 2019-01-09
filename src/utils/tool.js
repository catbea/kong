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


// 图片压缩
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