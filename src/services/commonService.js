/**
 * 非业务内的service
 */
import xhr from './xhr'
class CommonService {
  wxTicket(url, agentId = '') {
    return xhr({
      url: '/wx/cp/oauth2/signature/corp',
      body: {
        url,
        agentId
      }
    })
  }
}
export default new CommonService()