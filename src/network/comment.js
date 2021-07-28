// 评论相关模块
import request from './request'
// 获取评论或评论回复
export function getCommentReply (params) {
  return request({
    url: '/app/v1_0/comments',
    params
  })
}

// 对评论或评论回复点赞
export function likesCommentDetail (target) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export function cancelLikesCommentDetail (target) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

// 添加评论或评论回复
export function addCommentReply (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
