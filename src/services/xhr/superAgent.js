/* global __CONF__ */
import superAgent from 'superagent'
import { Promise } from 'es6-promise'
import errHandler from './errorHandler'
import codeErrHandler from './codeErrHandler'
import store from '@/store/'
// codeHandleList 为{code: xxx, type: xxx}的对象数组，code表示需要处理的代号，type表示处理手法。
//   当type: 0，默认处理形式；当type: 1，网络层不处理交由逻辑层处理；当type: 2，网络层处理好后再交由逻辑层处理。
const xhr = ({ url, body = {}, method = 'get', headers = {}, codeHandleList = null }) => {
  // 参数处理
  url = url.replace(/\s+/g, '') // 去掉首尾空格
  method = method.toLowerCase()
  let host = ''
  if (url.indexOf('miniapp') > 0) {
    host = process.env.VUE_APP_APP_URL + 'helper-rest'
  }else {
    host = process.env.VUE_APP_BASE_API_URL
  }

  let head = Object.assign(
    {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    headers
  )
  if (store.getters.userInfo && store.getters.userInfo.token) {
    head.Authorization = store.getters.userInfo.token
  }
  return new Promise((resolve, reject) => {
    let request = superAgent[method](host + url) //.withCredentials()
      .set(head)
      .accept('application/json, text/javascript, */*; q=0.01')
    method === 'get' ? request.query(body) : request.send(body)
    request.end((err, res) => {
      if (err) {
        errHandler(err)
        return
      }
      try {
        let resultBody = res.body
        let isOk = codeErrHandler(resultBody, codeHandleList) === true // typeof body.code === 'undefined' || body.code === '0'
        // 错误处理丢去控制类需要完整的信息,强行等于10000为暂时处理,后期优化 TODO
        isOk ? (parseInt(res.body.returnCode) === 10000 ? resolve(resultBody.data) : resolve(resultBody)) : codeErrHandler(resultBody, codeHandleList)
      } catch (error) {
        console.error(error)
      }
    })
  })
}
export default xhr
