/**
 * 价格转换，服务端传分，转换为元
 */
export default value => {
  try {
    value = Number(value)
    return isNaN(value) ? 0 : `${Number(value) / 100}`
  } catch (error) {
    return '0'
  }
}
