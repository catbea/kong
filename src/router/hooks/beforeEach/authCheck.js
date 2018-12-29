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

const isIOS = ()=> {
  var isIphone = navigator.userAgent.includes('iPhone')
  var isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad;
};


export default async (to, from, next) => {
  console.log(to.path, 'to.path')
  if (to.meta.skipAuth) return next()
  let parm = getUrlQueryParams(location.href)
  let wxredirecturl = window.location.href.split('#')[0].split('?')[0]
  wxredirecturl = wxredirecturl.substr(0, wxredirecturl.length - 1)
  // alert(parm.cropId+' | url'+location.href);
  if (parm.cropId) {
    // 为了查找签名token错误，写了一大堆alert，还是查不出原因...
    // alert(1);
    store.dispatch('getUserInfo', null)
    // store.dispatch('setJssdkConfig', null)
    store.commit(types.WX_JSSDK, null)
    let cropId = parm.cropId
    await localStorage.setItem('cropId', cropId)
    let wxurl =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      cropId +
      '&redirect_uri=' +
      encodeURIComponent(wxredirecturl).toLowerCase() +
      '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
    window.location.href = wxurl
  } else {
    // alert(2);
    if (parm.code) {
      // alert(3);
      let cropId = localStorage.getItem('cropId')
      let userInfo = store.getters.userInfo
      let payCorpId = userInfo.payCorpId
      console.log(36, userInfo, userInfo.payCorpId);

      if (payCorpId) {
        // 通过payopenid返回的code
        // 获取jssdk授权
        // alert('payCorpId:'+payCorpId);
        if (!store.getters.jssdkConfig || !store.getters.jssdkConfig.signature) {
          // alert(4);
          try {
            // alert(5);
            // if(isIOS()) {
            //   if(to.path == '/'){
            //     window.awHelper.wechatHelper.init()
            //   }
            // } else {
            //   window.awHelper.wechatHelper.init()
            // }
            window.awHelper.wechatHelper.init()
          } catch (e) {
            console.log('[error:window.awHelper.wechatHelper]')
            next()
          }
        }
        if (userInfo.payOpenId) {
          // alert(7);
          next()
          return
        }

        let pcOpenid = userInfo.pcOpenid
        const payopenIdObject = await commonService.getPayOpenId(parm.code, cropId, pcOpenid)
        userInfo.payOpenId = payopenIdObject.payOpenId
        store.dispatch('getUserInfo', userInfo)
        next()
      } else {
        console.log('wxAuthObject');
        const wxAuthObject = await commonService.wxUserInfo(parm.code, cropId)
        console.log('wxAuthObject', wxAuthObject);

        payCorpId = wxAuthObject.payCorpId
        let userInfo = wxAuthObject.userInfo
        userInfo.payCorpId = payCorpId
        userInfo.cropId = cropId
        userInfo.token = wxAuthObject.token
        await store.dispatch('getUserInfo', userInfo)
        console.log(userInfo, '[userInfo]')
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
              if(isIOS()) {
                if(to.path == '/'){
                  alert('to.path / '+store.getters.userInfo.token)
                  window.awHelper.wechatHelper.init()
                }
              } else {
                window.awHelper.wechatHelper.init()
              }
            } catch (e) {
              alert('to.path / '+store.getters.userInfo)
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
