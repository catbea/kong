import simpleLogger from './afterEach/simpleLogger'
import routerMetaHandler from './afterEach/routerMetaHandler'
import promptClear from './afterEach/promptClear'
import routeConf from './afterEach/routeConf'
import authCheck from './beforeEach/authCheck'
import wechatSet from './afterEach/wechatSet'
import imSigCheck from './beforeEach/imSigCheck'
import analyze from './afterEach/analyze'

export default router => {
  // 仅开发时调用

  if (process.env.NODE_ENV === 'development') {
    router.afterEach(simpleLogger)
  }
  if (process.env.VUE_APP_QQ_MTA_SID) {
    router.afterEach(analyze)
  }

  router.beforeEach(authCheck)
  router.beforeEach(imSigCheck)
  router.afterEach(routerMetaHandler)
  router.afterEach(promptClear)
  router.afterEach(routeConf)
  router.afterEach(wechatSet)
}
