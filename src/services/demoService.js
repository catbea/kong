import xhr from './xhr/'
class DemoService {
  testApi(agentId, current, size = 10) {
    return xhr({
      url: '/report/projectDynamic',
      body: {
        agentId,
        current,
        size
      }
    })
  }
}
export default new DemoService()
