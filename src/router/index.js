import Vue from 'vue'
import Router from 'vue-router'
import routesMap from './map/' // 路由映射
import hooks from './hooks/' // 路由钩子
import MtaH5 from 'mta-h5-analysis'

Vue.use(Router)
const router = new Router({
  routes: routesMap
})
if (process.env.VUE_APP_QQ_MTA_SID) { // sid为必填,cid开启自定义事件才需要,所以主要判断sid
  MtaH5.init({
    "sid": process.env.VUE_APP_QQ_MTA_SID, //必填，统计用的appid
    "cid": process.env.VUE_APP_QQ_MTA_SID || '', //如果开启自定义事件，此项目为必填，否则不填
    "autoReport": 0,//是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
    "senseHash": 1, //hash锚点是否进入url统计
    "senseQuery": 0, //url参数是否进入url统计
    "performanceMonitor": 1,//是否开启性能监控
    "ignoreParams": [] //开启url参数上报时，可忽略部分参数拼接上报
  });
}
hooks(router)
export default router
