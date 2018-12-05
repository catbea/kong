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
        console.log(parm.cropId)
        console.log(wxredirecturl.split("?")[0])
        let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + cropId 
            + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
            + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
        window.location.href = wxurl;
    } else {
        let cropId = sessionStorage.getItem('cropId')
        let payAuthObject = JSON.parse(sessionStorage.getItem('payAuthObject'))
        if(parm.code){
            if(payAuthObject){// 通过payopenid返回的code
                let pcOpenId = payAuthObject.pcOpenId// sessionStorage.getItem('pcOpenId')
                console.log(pcOpenId, 'pcOpenId')
                console.log(parm.code, 'parm.code===')
                const payopenIdObject = await commonService.getPayOpenId(parm.code, cropId, pcOpenId)
                console.log(payopenIdObject.payOpenId, 'payopenIdObject===')
                // next()
            } else {
                const wxAuthObject = await commonService.wxUserInfo(parm.code, cropId)
                let userInfo = wxAuthObject.userInfo
                userInfo.token = wxAuthObject.token
                store.dispatch('getUserInfo', userInfo)
                if(!userInfo.payOpenId) {//返回的payopenid为空，则从新授权获取
                    payCorpId = wxAuthObject.payCorpId
                    console.log(wxAuthObject,'wxAuthObject=====')
                    await sessionStorage.setItem('payAuthObject', JSON.stringify({payCorpId: payCorpId, pcOpenId: userInfo.pcOpenId}) )
                    let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + payCorpId 
                        + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
                        + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
                    window.location.href = wxurl;
                    // console.log(wxurl)
                }
                console.log(userInfo, 'userInfo')
            }
        } else {
            // next()
        }
        next()
    }
    
}