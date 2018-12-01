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

    

}
export default new reportService()