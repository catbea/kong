/* global __DEV__, __PROD__ */
import simpleLogger from './afterEach/simpleLogger'

export default (router) => {
  // if (__DEV__) { // 仅开发时调用
    router.afterEach(simpleLogger)
  // }
  // if (__PROD__) {  // 进生产环境调用
  // }
}
