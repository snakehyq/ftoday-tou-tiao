import request from './request'

// 用户登录
export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码
export function getCode (mobile) {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取当前登录用户的信息
export function getUserInfo () {
  return request({
    url: '/app/v1_0/user'
  })
}

// 获取用户的频道标题数据
export function getUserChannelsData () {
  return request({
    url: '/app/v1_0/user/channels'
  })
}

// 添加用户的频道列表
export function addUserChannnel (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 删除用户的频道
export function deleteUserChannnel (target) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${target}`
  })
}

// 关注用户
export function followedUser (target) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings/',
    data: {
      target
    }
  })
}

// 取消关注用户
export function cancelFollowedUser (target) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}

// 获取用户的个人信息
export function getUserMessage () {
  return request({
    url: '/app/v1_0/user/profile'
  })
}

// 修改用户的个人信息
export function updateUserMessage (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 修改用户的头像信息
export function updateUserImage (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}

// 获取用户的关注列表
export function getUserFollows (params) {
  return request({
    url: '/app/v1_0/user/followings',
    params
  })
}

// 获取用户的粉丝列表
export function getUserFans (params) {
  return request({
    url: '/app/v1_0/user/followers',
    params
  })
}
