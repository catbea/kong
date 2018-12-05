import store from '@/store/'
import commonService from '@/services/commonService'

const getUrlQueryParams = (url)=>{
    var params = {},
        results = null,
        url = url || location.href;
    var regex = /[?&]([\w]+)=([^&#]*)/g;
    while( (results = regex.exec( url ) ) != null ){
      params[decodeURIComponent(results[1])]=decodeURIComponent(results[2]);
    }
    return params;
}

export default async (to, from, next) => {
    let parm = getUrlQueryParams(location.href);
    let wxredirecturl = window.location.href.split("#")[0].split("?")[0]
    wxredirecturl = wxredirecturl.substr(0, wxredirecturl.length-1)
    if(parm.cropId){
        let cropId = parm.cropId
        await sessionStorage.setItem('cropId', cropId)
        // console.log(parm.cropId)
        // console.log(wxredirecturl.split("?")[0])
        let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + cropId 
            + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
            + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
        window.location.href = wxurl;
    } else {
        let cropId = sessionStorage.getItem('cropId')
        let payCorpId = sessionStorage.getItem('payCorpId')
        console.log(payCorpId, 'payCorpId')
        if(parm.code){
            if(payCorpId){// 通过payopenid返回的code
                console.log( 'payCorpId ==================')
                let userInfo = store.getters.userInfo
                if(userInfo.payOpenId) {
                    next()
                    return
                }
                let pcOpenid = userInfo.pcOpenid
                console.log(pcOpenid, 'pcOpenId')
                console.log(parm.code, 'parm.code===')
                const payopenIdObject = await commonService.getPayOpenId(parm.code, cropId, pcOpenid)
                userInfo.payOpenId = payopenIdObject.payOpenId
                store.dispatch('getUserInfo', userInfo)
                console.log(payopenIdObject.payOpenId, 'payopenIdObject===')
                next()
            } else {
                console.log( 'no payCorpId ==================')
                const wxAuthObject = await commonService.wxUserInfo(parm.code, cropId)
                let userInfo = wxAuthObject.userInfo
                userInfo.token = wxAuthObject.token
                store.dispatch('getUserInfo', userInfo)
                console.log( 'wxAuthObject ==================')
                if(!userInfo.payOpenId) {//返回的payopenid为空，则从新授权获取
                    payCorpId = wxAuthObject.payCorpId
                    console.log(wxAuthObject,'wxAuthObject=====')
                    await sessionStorage.setItem('payCorpId', payCorpId)
                    let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + payCorpId 
                        + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
                        + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
                    window.location.href = wxurl;
                    // console.log(wxurl)
                    return
                }
                next()
                console.log(userInfo, 'userInfo')
            }
        } else {
            next()
        }
        // next()
    }
    
}