import { setStorage } from './storage'
export default {
  saveUser (state, user) {
    state.user = user
    // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
    setStorage('user', user)
  },
  addCachePage (state, cachePage) {
    if (!state.cachePages.includes(cachePage)) {
      state.cachePages.push(cachePage)
    }
  },
  removeCachePage (state, cachePage) {
    const index = state.cachePages.findIndex(item => item === cachePage)
    if (index !== -1) state.cachePages.splice(index, 1)
  }
}
