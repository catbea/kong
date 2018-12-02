import xhr from './xhr/'
class reportService {
    /**
     *  我的报备列表
     * @param {*} current 
     * @param {*} size 
     */
    reportList(current, size = 10) {
        return xhr({
            url: '/customerFilling/getFilingList',
            body: {
                current,
                size
            }
        })
    }

    /**
     * 报备审核列表
     * @param {*} distClientId 
     */
    reportAuditList(distClientId) {
        return xhr({
            url: '/customerFilling/getFilingAuditList',
            body: {
                distClientId
            }
        })
    }

}
export default new reportService()