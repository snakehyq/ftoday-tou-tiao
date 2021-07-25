import request from './request'

// 获取联想建议
export function getSearchAdvice (params) {
  return request({
    url: '/app/v1_0/suggestion',
    params
  })
}

// 获取联想建议
export function getSearchResults (params) {
  return request({
    url: '/app/v1_0/search',
    params
  })
}

// 获取历史搜索记录
export function getHistoryData () {
  return request({
    url: '/app/v1_0/search/histories'
  })
}
