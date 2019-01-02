import 'whatwg-fetch'
import queryString from 'query-string'
import errHandler from './errorHandler'
import codeErrHandler from './codeErrHandler'
import qs from 'qs'
import store from '@/store/'
const xhr = ({ url, body = {}, method = 'get', headers = {} }) => {
  // 参数处理
  url = url.replace(/\s+/g, '') // 去掉首尾空格
  method = method.toUpperCase()
  console.log('i want');
  
  if (url == '/undefined') {
    return
  }
  url = process.env.VUE_APP_BASE_API_URL + url

  headers = Object.assign({ 'Content-Type': 'application/json; charset=UTF-8' }, { Authorization: store.getters.userInfo.token }, headers)

  const options = {
    method,
    headers,
    mode: 'cors'
  }

  method === 'GET' ? (url = `${url}?${qs.stringify(body)}`) : (options.body = JSON.stringify(body))
  return new Promise(async (resolve, reject) => {
    let response = await fetch(url, options)
    // http错误
    if (!response.ok) {
      return errHandler(response)
    }
    try {
      const res = await response.json()
      const isOk = codeErrHandler(res, url)
      isOk ? resolve(res.data) : codeErrHandler(res, url)
    } catch (err) {
      console.error('Error: ', err)
    }
  })
}
export default xhr
