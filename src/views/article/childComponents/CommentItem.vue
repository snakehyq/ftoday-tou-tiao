<template>
  <div class="commentItem">
      <van-cell>
          <div slot="title">
            <div class="title-wrap">
                <div class="name">{{ commentItem.aut_name }}</div>
                <div class="like-wrap" @click="likeClick">
                  <van-icon
                    class="like"
                    :color="commentItem.is_liking ? '#e5645f' : ''"
                    :name="commentItem.is_liking ? 'good-job' : 'good-job-o'"
                    />
                  <span class="count">{{ commentItem.like_count }}</span>
                </div>
              </div>
          </div>
          <div slot="label">
            <div class="content">{{ commentItem.content }}</div>
            <span class="pubdate">{{ commentItem.pubdate | dateTimie('MM:DD') }}</span>
            <van-button
              class="reply-btn"
              round
              size="mini"
              @click="replyClick"
            >
            回复 {{ commentItem.reply_count }}
            </van-button>
          </div>
          <div slot="icon">
              <van-image
                class="avatar"
                round
                fit="cover"
                :src="commentItem.aut_photo"
            />
          </div>
      </van-cell>
  </div>
</template>

<script>
import { cancelLikesCommentDetail, likesCommentDetail } from 'network/comment'
export default {
  name: 'commentItem',
  props: {
    commentItem: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    async likeClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const item = this.commentItem
        // 已经点赞了，就取消点赞
        if (item.is_liking) {
          await likesCommentDetail(item.com_id.toString())
          this.commentItem.like_count--
        } else {
          // 没有点赞，点赞文章详情
          await cancelLikesCommentDetail(item.com_id.toString())
          this.commentItem.like_count++
        }
        this.commentItem.is_liking = !this.commentItem.is_liking
        this.$toast.success(this.commentItem.is_liking ? '点赞成功' : '取消点赞成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    // 点击回复
    replyClick () {
      this.$bus.$emit('replyComment', this.commentItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.commentItem {
    .avatar {
      width: 36px;
      height: 36px;
      margin-right: 13px;
    }
    .name {
        font-size: 14px;
        color: #406599
    }
    .content {
        font-size: 16px;
        color: #222222;
        margin-bottom: 10px;
    }
    .reply-btn {
        padding: 10px;
    }
    .pubdate {
        font-size: 10px;
        margin-right: 10px;
    }
    .title-wrap {
        display: flex;
        justify-content: space-between;
    }
    .like-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
