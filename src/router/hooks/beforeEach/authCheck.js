import store from '@/store/'
import commonService from '@/services/commonService'
import wechatApi from '@/utils/wechatApi'

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

export default async (to, from, next) => {
  let parm = getUrlQueryParams(location.href)
  let wxredirecturl = window.location.href.split('#')[0].split('?')[0]
  wxredirecturl = wxredirecturl.substr(0, wxredirecturl.length - 1)
  if (parm.cropId) {
    store.dispatch('getUserInfo', {})
    store.dispatch('setJssdkConfig', null)
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
    if (parm.code) {
      let cropId = localStorage.getItem('cropId')
      let userInfo = store.getters.userInfo
      let payCorpId = userInfo.payCorpId
      console.log(36,userInfo,userInfo.payCorpId);
      
      if (payCorpId) {
        // 通过payopenid返回的code
        // 获取jssdk授权
        // if (!store.getters.jssdkConfig) {
        //   console.log(window.awHelper, '[window.awHelper]')
        //   window.awHelper.wechatHelper.init()
        // }
        console.log(store.getters.jssdkConfig ,'_jssdkConfig====')
        if(!store.getters.jssdkConfig){
          console.log('wx jssdk init ')
          wechatApi.init()
        }

        if (userInfo.payOpenId) {
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
        console.log('wxAuthObject',wxAuthObject);
        
        payCorpId = wxAuthObject.payCorpId
        let userInfo = wxAuthObject.userInfo
        userInfo.payCorpId = payCorpId
        userInfo.cropId = cropId
        userInfo.token = wxAuthObject.token
        store.dispatch('getUserInfo', userInfo)
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
        }
        next()
      }
    } else {
      next()
    }
  }
}
