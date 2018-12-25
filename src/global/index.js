import Vue from 'vue'
import wechatHelper from './wechatHelper'

export default () => {
  Vue.prototype.wechatHelper = wechatHelper
}