import store from '@/store/'
import * as types from '@/store/mutation-types'
import commonService from '@/services/commonService'
import { webimLogin, callbackaddMsgCount } from '@/utils/im/receive_new_msg.js'

const getUrlQueryParams = url => {
  var params = {},
    results = null,
    url = url || location.href
  var regex = /[?&]([\w]+)=([^&#]*)/g
  while ((results = regex.exec(url)) != null) {
    params[decodeURIComponent(results[1])] = decodeURIComponent(results[2])
  }
  return params
}

const isIOS = () => {
  var isIphone = navigator.userAgent.includes('iPhone')
  var isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad
}

export default async (to, from, next) => {
  // setTimeout(() => {
  //   next()
  // }, 3000)
  if (to.meta.skipAuth) return next()
  let parm = getUrlQueryParams(location.href)
  let wxredirecturl = window.location.href.split('#')[0].split('?')[0]
  wxredirecturl = wxredirecturl.substr(0, wxredirecturl.length - 1)

  if (parm.cropId) {//
    store.dispatch('getUserInfo', null)
    store.commit(types.WX_JSSDK, null)
    let cropId = parm.cropId
    localStorage.setItem('cropId', cropId)

    let defaultPathArr = window.location.href.split('#')
    if (defaultPathArr.length > 1) {
      let defaultPath = window.location.href.split('#')[1].split('?')[0]
      if (defaultPath !== '/') {
        localStorage.setItem('defaultPath', defaultPath)
      }
    }

    let wxurl =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      cropId +
      '&redirect_uri=' +
      encodeURIComponent(wxredirecturl).toLowerCase() +
      '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
    // console.log(wxredirecturl)
    window.location.href = wxurl
  } else {
    if (parm.code) {
      let cropId = localStorage.getItem('cropId')
      let userInfo = store.getters.userInfo
      let payCorpId = userInfo.payCorpId
      if (userInfo.payOpenId) {
        if (!store.getters.jssdkConfig || !store.getters.jssdkConfig.signature) {
          try {
            window.awHelper.wechatHelper.init()
          } catch (e) {
            console.log('[error:window.awHelper.wechatHelper]')
            next()
          }
        }
        next()
        return
      }
      if (payCorpId) {
        // 通过payopenid返回的code
        // 获取jssdk授权
        if (!store.getters.jssdkConfig || !store.getters.jssdkConfig.signature) {
          try {
            window.awHelper.wechatHelper.init()
          } catch (e) {
            console.log('[error:window.awHelper.wechatHelper]')
            next()
          }
        }
        // if (userInfo.payOpenId) {
        //   next()
        //   return
        // }

        let pcOpenid = userInfo.pcOpenid
        const payopenIdObject = await commonService.getPayOpenId(parm.code, cropId, pcOpenid)
        userInfo.payOpenId = payopenIdObject.payOpenId
        store.dispatch('getUserInfo', userInfo)
        next()
      } else {
        const wxAuthObject = await commonService.wxUserInfo(parm.code, cropId)
        console.log(wxAuthObject, 'wxAuthObject')
        payCorpId = wxAuthObject.payCorpId
        userInfo = wxAuthObject.userInfo
        userInfo.payCorpId = payCorpId
        userInfo.cropId = cropId
        userInfo.articleShareFlag = wxAuthObject.articleShareFlag
        userInfo.token = wxAuthObject.token
        userInfo.jumpToDynamicDetail = wxAuthObject.jumpToDynamicDetail
        await store.dispatch('getUserInfo', userInfo)
        //更新用户禁用状态
        // store.commit(types['USER_STATUS'], userInfo.userStatus)
        // console.log(userInfo.userStatus, 'userInfo.userStatus')

        if (!userInfo.payOpenId) {
          //返回的payopenid为空，则从新授权获取
          await localStorage.setItem('payCorpId', payCorpId)
          let wxurl =
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            payCorpId +
            '&redirect_uri=' +
            encodeURIComponent(wxredirecturl).toLowerCase() +
            '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
          window.location.href = wxurl
          return
        } else {
          if (!store.getters.jssdkConfig || !store.getters.jssdkConfig.signature) {
            try {
              if (isIOS()) {
                if (to.path == '/') {
                  window.awHelper.wechatHelper.init()
                }
              } else {
                window.awHelper.wechatHelper.init()
              }
            } catch (e) {
              console.log('[error:window.awHelper.wechatHelper]')
              next()
            }
          }
        }
        next()
      }
    } else {
      next()
    }
  }
}
