/* global __CONF__ */
import superAgent from 'superagent'
import { Promise } from 'es6-promise'
import errHandler from './errorHandler'
import codeErrHandler from './codeErrHandler'

// codeHandleList 为{code: xxx, type: xxx}的对象数组，code表示需要处理的代号，type表示处理手法。
//   当type: 0，默认处理形式；当type: 1，网络层不处理交由逻辑层处理；当type: 2，网络层处理好后再交由逻辑层处理。
const xhr = ({url, body = {}, method = 'get', headers={},codeHandleList = null}) => {
  // 参数处理
  url = url.replace(/\s+/g, '') // 去掉首尾空格
  method = method.toLowerCase()
  const host = __CONF__.BASE_API_URL
  let head = Object.assign({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: store.getters.userInfo.token
  },headers)
  if (window.localStorage.getItem('deviceId')) head.uniquecode = window.localStorage.getItem('deviceId')
  return new Promise((resolve, reject) => {
    let request = superAgent[method](host + url).withCredentials()
      .set(head)
      .accept('application/json, text/javascript, */*; q=0.01')
    method === 'get' ? request.query(body) : request.send(body)
    request.end((err, res) => {
      if (err) {
        errHandler(err)
        return
      }
      try {
        let body = res.body
        let isOk = codeErrHandler(body, codeHandleList) === true // typeof body.code === 'undefined' || body.code === '0'
        err ? errHandler(err) : (isOk ? resolve(body) : codeErrHandler(body, codeHandleList))
      } catch (error) {
        console.error(error)
      }
    })
  })
}
export default xhr
