import xhr from './xhr/'
class registService {
    
    /**
     * 注册发送手机验证码
     * @param {*} mobile 
     */
    sendMsgRegister(mobile) {
        return xhr({
            url: '/register/sendMsgRegister',
            body: {
                mobile
            }
        })
    }

    /**
     * 注册
     * @param {*} registerRequestVO 
     */
    register(registerRequestVO) {
        return xhr({
            method: 'POST',
            url: '/register/register',
            body: registerRequestVO
        })
    }
}
export default new registService()