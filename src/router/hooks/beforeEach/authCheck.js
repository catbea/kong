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
    let userInfo = store.getters.userInfo

    if(userInfo && userInfo.token){// 已有用户信息
        console.log('userInfo not empty')
        next()
    } else {// 没有用户登录信息，跳转微信授权页 
        let parm = getUrlQueryParams(location.href);
        
        if(parm.code){ // 连接带code，直接取code值，去服务端取用户信息
            let cropId = sessionStorage.getItem('cropId')
            // const userInfo = await commonService.wxUserInfo(parm.code, cropId)
            console.log(cropId, 'cropId')
        } else { // 没有code，判断是否带了appid，如果带appid就跳微信授权页
            if(parm.cropId){
                let cropId = parm.cropId
                let wxredirecturl = window.location.href.split("#")[0].split("?")[0]
                wxredirecturl = wxredirecturl.substr(0, wxredirecturl.length-1)
                sessionStorage.setItem('cropId', cropId)

                console.log(parm.cropId)
                console.log(wxredirecturl.split("?")[0])

                let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + cropId 
                    + '&redirect_uri=' + encodeURIComponent(wxredirecturl).toLowerCase() 
                    + '&response_type=code&scope=snsapi_base&state=062882#wechat_redirect' 
                window.location.href = wxurl;
            } else {
                console.log('no cropId')
                next()
            }
        }
    }
}