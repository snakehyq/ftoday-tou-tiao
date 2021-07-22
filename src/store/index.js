import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import { getStorage } from './storage'
Vue.use(Vuex)
const state = {
  user: getStorage('user')
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
