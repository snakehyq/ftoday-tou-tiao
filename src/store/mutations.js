import { setStorage } from './storage'
export default {
  saveUser (state, user) {
    state.user = user
    // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
    setStorage('user', user)
  }
}
