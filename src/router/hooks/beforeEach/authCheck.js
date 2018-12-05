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
        let pcOpenId = sessionStorage.getItem('pcOpenId')
        if(parm.code){
            if(payCorpId){// 通过payopenid返回的code
                console.log(pcOpenId, 'pcOpenId')
                console.log(parm.code, 'parm.code===')
                const payopenIdObject = await commonService.getPayOpenId(parm.code, cropId, pcOpenId)
                console.log(payopenIdObject, 'payopenIdObject===')
            } else {
                const wxAuthObject = await commonService.wxUserInfo(parm.code, cropId)
                let userInfo = wxAuthObject.userInfo
                userInfo.token = wxAuthObject.token
                store.dispatch('getUserInfo', userInfo)
                if(!userInfo.payOpenId) {//返回的payopenid为空，则从新授权获取
                    payCorpId = wxAuthObject.payCorpId
                    let pcOpenId = wxAuthObject.userInfo.pcOpenId
                    console.log(wxAuthObject,'wxAuthObject=====')
                    await sessionStorage.setItem('pcOpenId', pcOpenId)
                    let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + payCorpId 
                        + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
                        + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
                    window.location.href = wxurl;
                    // console.log(wxurl)
                }
                console.log(userInfo, 'userInfo')
            }
        } else {
            next()
        }
        // next()
        // ///////////////////
        // let userInfo = store.getters.userInfo
        // console.log(userInfo,'user=====')
        // if(userInfo && userInfo.token){// 已有用户信息

        //     if(!userInfo.payOpenId) {//payopenid为空，用户授权信息已经获取，通过返回的code获取payopenid
        //         let payCorpId = sessionStorage.getItem('payCorpId')
        //         if(parm.code && payCorpId) {
        //             console.log(payCorpId, 'payCorpId=========')
        //             const payopenIdObject = await commonService.getPayOpenId(parm.code, payCorpId)
        //             console.log(payopenIdObject, 'payopenIdObject---------')
        //         }
        //     }
    
        //     next()
        // } else {// 没有用户登录信息，跳转微信授权页 
        //     if(parm.code){ // 连接带code，直接取code值，去服务端取用户信息
        //         let cropId = sessionStorage.getItem('cropId')
        //         let payCorpId = sessionStorage.getItem('payCorpId')
        //         if(payCorpId){// 通过payopenid返回的code
        //             const payopenIdObject = await commonService.getPayOpenId(parm.code, payCorpId)
        //             console.log(payopenIdObject, 'payopenIdObject===')
        //         } else {// 正常用户授权信息返回code
                    // const wxAuthObject = await commonService.wxUserInfo(parm.code, cropId)
                    // let userInfo = wxAuthObject.userInfo
                    // userInfo.token = wxAuthObject.token
                    // store.dispatch('getUserInfo', userInfo)
                    // if(!userInfo.payOpenId) {//返回的payopenid为空，则从新授权获取
                    //     payCorpId = wxAuthObject.payCorpId
                    //     await sessionStorage.setItem('payCorpId', payCorpId)
                    //     let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + payCorpId 
                    //         + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
                    //         + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect'
                    //     window.location.href = wxurl;
                    // }
                    // console.log(userInfo, 'userInfo')
        //         }
    
        //         next()
        //     }
        // }
        ///////////////////
    }
    
}