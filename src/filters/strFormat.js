export default class strFormat {
  //限制输入数字
  static fmtNum(str) {
    let result = str.match(/^[0-9]*$/)
    return result
  }

  //限制输入只能为汉字
  static fmtStr(str) {
    let result = str.replace(/[^\u4E00-\u9FA5]/g, '')
    return result
  }

  //仅支持6-20个字母、数字、下划线或减号，以字母开头。，不支持输入汉字
  //[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]|[\u002d]|[`~～!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?！@#￥%……&*（）+ |{}【】‘；：”“’。，、？]",
  static fmtWebCode(str) {
    var pattern = new RegExp("[`~!@#$^&*()+=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？%]")
    var rs = ''
    for (var i = 0; i < str.length; i++) {
      rs = rs + str.substr(i, 1).replace(pattern, '')
    }
    return rs
  }

  //判断是否存在中文
  static isChinese(str) {
    if (/^[\u3220-\uFA29]+$/.test(str)) {
      return true
    } else {
      return false
    }
  }

  //判断是否是英文
  static isEnghish(str) {
    var reg = /^[A-Za-z]+$/
    if (reg.test(str)) {
      return true
    } else {
      return false
    }
  }
}
