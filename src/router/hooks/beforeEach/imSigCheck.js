import { webimLogin, callbackaddMsgCount } from '@/utils/im/receive_new_msg.js'
import store from '@/store/'

export default async (to, from, next) => {
  if (to.meta.skipIM) return next()
  if (store.getters.imUserSig || !store.getters.userInfo.token) return next()
  try {
    await store.dispatch('getImUserSig')
    if (store.getters.imUserSig && store.getters.imUserSig.agentId) {
      webimLogin(store.getters.imUserSig.skdAppid, 'agent_' + store.getters.imUserSig.agentId, store.getters.imUserSig.accountType, store.getters.imUserSig.usersig, store.getters.imUserSig.isLogOn)
    }
    next()
  } catch (error) {
    console.error('imSigCheck-error',error);
    next()
  }

}
