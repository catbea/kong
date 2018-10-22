import 'whatwg-fetch'
import queryString from 'query-string'
import errHandler from './errorHandler'
import codeErrHandler from './codeErrHandler'
import qs from 'qs'
const xhr = ({ url, body = {}, method = 'get', headers = {} }) => {
  // 参数处理
  url = url.replace(/\s+/g, '') // 去掉首尾空格
  method = method.toUpperCase()
  const BASE_API_URL = 'https://sit.zooming-data.com/helper-rest' // TODO 挪到环境配置
  url = BASE_API_URL + url
  headers = Object.assign(
    { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    headers
  )
  const options = {
    method,
    headers,
    mode: 'cors'
  }
  const qsParams = qs.stringify(body)
  method === 'GET'
    ? (url = url + '?' + qsParams)
    : (options.body = qsParams)
  return new Promise(async (resolve, reject) => {
    let response = await fetch(url, options)
    // http错误
    if (!response.ok) {
      return errHandler(response)
    }
    try {
      const res = await response.json()
      const isOk = res.result
      isOk ? resolve(res) : codeErrHandler(res)
    } catch (err) {
      console.error('Error: ', err)
    }
  })
}
export default xhr
