import simpleLogger from './afterEach/simpleLogger'
import routerMetaHandler from './afterEach/routerMetaHandler'

export default (router) => {
  // if (__DEV__) { // 仅开发时调用
    router.afterEach(simpleLogger)
    router.afterEach(routerMetaHandler)
  // }
  // if (__PROD__) {  // 进生产环境调用
  // }
}
