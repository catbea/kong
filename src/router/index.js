import Vue from 'vue'
import Router from 'vue-router'
import routesMap from './map/'    // 路由映射
import hooks from './hooks/'      // 路由钩子

Vue.use(Router)
const router = new Router({
  routes: routesMap
})
hooks(router)
export default router
