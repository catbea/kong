//活动模块
import xhr from './xhr'

class ActivityService {

    /**
     * 活动楼盘的信息列表
     * @param {*} current 
     * @param {*} size 
     * @param {*} couponsActivityId 
     */
    getActivityList(current, size, couponsActivityId) {
        return xhr({
            url: '/userReceive/getActivityAwardList',
            body: {
                current,
                size,
                couponsActivityId
            }
        })
    }


}




export default new ActivityService()