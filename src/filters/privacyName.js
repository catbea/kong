/**
 * name隐私处理
 */

export default (value) => {
    value = String(value)
    if (value.length >= 2) {
        return value.substr(0, 1) + '***' + value.substr(value.length-1, 1)
    }
    else if (value.length == 1) {
        return value.substr(0, 1) + '***'
    }else {
        return '***'
    }
  }
  