import 'whatwg-fetch'
import queryString from 'query-string'
import errHandler from './errorHandler'
import codeErrHandler from './codeErrHandler'
import qs from 'qs'
const xhr = ({ url, body = {}, method = 'get', headers = {} }) => {
  // 参数处理
  url = url.replace(/\s+/g, '') // 去掉首尾空格
  method = method.toUpperCase()

  url = process.env.VUE_APP_BASE_API_URL + url
  headers = Object.assign(
    { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    {
      Authorization:
        'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJhd3NocDQiLCJzdWIiOiJhZ2VudElkOnd3MjhmNDVkZmUwZTVhZTMxZDo3MDUiLCJleHAiOjE1NDM5MTc3MjksImlhdCI6MTU0MzMxMjkyOX0.EkTPyJRS0KpHKz6I2-AJeGetHs406f98pXPQnoSdP78HQvQwwg1Wfpgi61Wj7QpyTYu5GJfZIMh9nitXYQwMFQ'
    },
    headers
  )
  const options = {
    method,
    headers,
    mode: 'cors'
  }

  // body.agentId = localStorage.getItem('userId')
  const qsParams = qs.stringify(body)

  method === 'GET' ? (url = url + '?' + qsParams) : (options.body = qsParams)
  return new Promise(async (resolve, reject) => {
    let response = await fetch(url, options)
    // http错误
    if (!response.ok) {
      return errHandler(response)
    }
    try {
      const res = await response.json()
      const isOk = res.result
      isOk ? resolve(res.data) : codeErrHandler(res)
    } catch (err) {
      console.error('Error: ', err)
    }
  })
}
export default xhr
