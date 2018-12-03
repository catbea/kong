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

export default (to, from, next) => {
    let userInfo = store.getters.userInfo

    if(userInfo && userInfo.token){

        next()
    } else {// 没有用户登录信息，跳转微信授权页 https://sit.zooming-data.com/?cropId=ww28f45dfe0e5ae31d
        let parm = getUrlQueryParams(location.href);
        let wxappid = parm.cropId
        let wxredirecturl = window.location.href.split("#")[0]
        console.log(parm.cropId)
        console.log(wxredirecturl)
        if(parm.cropId){
            let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=' 
                + encodeURIComponent(wxredirecturl).toLowerCase() 
                + '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect' 
            window.location.href = wxurl;
        } else {
            next()
        }
    }
}