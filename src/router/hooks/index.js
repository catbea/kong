import simpleLogger from './afterEach/simpleLogger'
import routerMetaHandler from './afterEach/routerMetaHandler'
import promptClear from './afterEach/promptClear'
import routeConf from './afterEach/routeConf'
import authCheck from './beforeEach/authCheck'

export default router => {
  // 仅开发时调用
  if (process.env.NODE_ENV === 'development') {
    router.afterEach(simpleLogger)
  }
  router.beforeEach(authCheck)
  router.afterEach(routerMetaHandler)
  router.afterEach(promptClear)
  router.afterEach(routeConf)
}
