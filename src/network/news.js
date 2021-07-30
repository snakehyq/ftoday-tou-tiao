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

// 获取文章详情
export function getArticleDetailById (articleId) {
  return request({
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章详情
export function collectedArticleDetail (target) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章详情
export function cancelCollectedArticleDetail (target) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

// 点赞文章详情
export function likesArticleDetail (target) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章详情
export function cancelLikesArticleDetail (target) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}

// 获取用户收藏列表
export function getUserCollections (params) {
  return request({
    url: '/app/v1_0/article/collections',
    params
  })
}

// 获取用户阅读历史
export function getUserHistorys (params) {
  return request({
    url: '/app/v1_0/user/histories',
    params
  })
}
