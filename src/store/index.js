import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { getStorage } from './storage'
Vue.use(Vuex)
const state = {
  user: getStorage('user'),
  cachePages: ['layout']
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
