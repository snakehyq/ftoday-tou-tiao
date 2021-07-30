import axios from 'axios'
import store from 'store'
import router from 'router'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'

// 用户认证数据
let user = null

// 刷新token请求
const refreshRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // timeout: 5000,
  responseType: 'json'
})
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // timeout: 5000,
  responseType: 'json',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      // return data
      // return JSON.parse(data)
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 传入token令牌
  user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.dir(error)
  const status = error.response.status
  let message = ''
  if (status === 401) {
    // token失效
    // 如果没有user，直接去登录
    if (!user || !user.token) {
      return goLoginBack()
    }
    // 如果有user中refresh_token,发送请求拿到新的token，
    const refreshToken = user.refresh_token
    try {
      const { data } = await refreshRequest({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      console.log(data)
      // 把新的token重新赋值
      user.token = data.token
      store.commit('saveUser', user)
      // 把错误的请求再次请求
      return request(error.config)
    } catch (error) {
      goLoginBack()
    }
  } else if (status === 403) {
    message = '权限不够'
  } else if (status === 404) {
    message = '资源未找到'
  } else if (status === 500) {
    message = '服务器错误，请稍后重试'
  } else {
    message = '其他错误'
  }
  Toast({
    message,
    type: 'fail',
    forbidClick: true
  })
  return Promise.reject(error)
})

function goLoginBack () {
  router.replace({
    name: 'login',
    query: {
      redirection: router.currentRoute.fullPath
    }
  })
}
export default request
