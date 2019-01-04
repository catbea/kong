import html2canvas from 'html2canvas'
// 校验最大字符串长度
export function checkStrLength (str, maxLen) {
    str += ''
    str = str.trim()
    if (str.length === 0) {
        return false
    }
    let len =  str.replace(/[^\x00-\xFF]/g,'**').length
    return len <= maxLen
}

// 校验符串类型为中文、英文和数字
export function checkStrType (str) {
    if (!str) {
        return false
    }
    let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/g
    return reg.test(str)
}

// 校验手机号码
export function checkPhoneNum (str) {
    if (!str) {
        return false
    }
    let reg = /^1[3-9]\d{9}$/g
    return reg.test(str)
}

// html转canvas
export function html2canvas () {
}

