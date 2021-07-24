import request from './request'

// 获取频道的列表数据
export function getArtListData (params) {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}

// 获取全部频道
export function getArtListAllData () {
  return request({
    url: '/app/v1_0/channels'
  })
}
