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
