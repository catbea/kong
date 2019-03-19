//活动模块
import xhr from './xhr'

class ActivityService {

    /**
     * 活动楼盘的信息列表
     * @param {*} current 
     * @param {*} size 
     * @param {*} couponsActivityId 
     */
    getActivityList(couponsActivityId) {
        return xhr({
            url: '/activity/getActivityAwardList',
            body: {
                couponsActivityId
            }
        })
    }

    /**
     * 查询活动名字
     * @param {*} activityInd 
     */
    getActivityName(activityInd){  ///qywx/userReceive/getCouponsActivityInfo
        return xhr({
            url: '/activity/getCouponsActivityInfo',
            body: {
                activityInd
            }
        })
    }

    /**
     * 根据活动Id查询活动信息
     * @param {*} enterpriseId 
     * @param {*} activityId 
     * @param {*} distributorId 
     */
    queryActivityInfo(enterpriseId, activityId, distributorId) {
        return xhr({
            url: '/activity/getActivityById',
            body: {
                enterpriseId,
                activityId,
                distributorId
            }
        })
    }

    /**
     * 活动发送验证码
     * @param {*} enterpriseId 
     * @param {*} activityId 
     * @param {*} distributorId 
     * @param {*} mobile 
     */
    activitySendMsg(enterpriseId, activityId, distributorId, mobile) {
        return xhr({
            url: '/activity/activitySendMsg',
            body: {
                enterpriseId,
                activityId,
                distributorId,
                mobile
            }
        })
    }

    /**
     * 活动注册
     * @param {*} data 
     */
    activityRegister(data) {
        return xhr({
            method: 'post',
            url: '/activity/activityRegister',
            body: data
        })
    }
}




export default new ActivityService()