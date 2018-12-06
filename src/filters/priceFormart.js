/**
 * 价格转换，服务端传分，转换为元
 */
export default value => {
    return `${Number(value) / 100}`
  }
  