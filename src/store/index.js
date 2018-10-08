import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system'

Vue.use(Vuex)


export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    system
  },
  strict: true
})
