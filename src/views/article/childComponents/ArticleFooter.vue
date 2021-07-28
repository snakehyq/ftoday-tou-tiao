<template>
  <div class="footer">
    <van-button
      class="write-btn"
      type="default"
      round
      size="small"
      @click="$emit('showComment')"
    >写评论</van-button>
    <van-icon
      class="comment-icon"
      name="comment-o"
      :info="totalCount"
    />
    <van-icon
      :color="articleDetailData.is_collected?'orange':''"
      :name="articleDetailData.is_collected?'star':'star-o'"
      @click="collectedClick"
    />
    <van-icon
      :color="articleDetailData.attitude === 1 ? '#e5645f' : ''"
      :name="articleDetailData.attitude === 1 ? 'good-job' : 'good-job-o'"
      @click="likeClick"
    />
    <van-icon class="share-icon" name="share" />
  </div>
</template>

<script>
import {
  cancelCollectedArticleDetail,
  collectedArticleDetail,
  likesArticleDetail,
  cancelLikesArticleDetail
} from 'network/news'
export default {
  name: 'ArticleFooter',
  props: {
    articleDetailData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    totalCount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 收藏操作
    async collectedClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const article = this.articleDetailData
        if (article.is_collected) {
          // 收藏了文章，取消文章
          await cancelCollectedArticleDetail(article.art_id.toString())
        } else {
          // 收藏文章
          await collectedArticleDetail(article.art_id.toString())
        }
        this.articleDetailData.is_collected = !this.articleDetailData.is_collected
        this.$toast.success(this.articleDetailData.is_collected ? '收藏成功' : '取消收藏成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    // 点赞操作
    async likeClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const article = this.articleDetailData
        // 已经点赞了，就取消点赞
        if (article.attitude === 1) {
          await likesArticleDetail(article.art_id)
          this.articleDetailData.attitude = -1
        } else {
          // 没有点赞，点赞文章详情
          await cancelLikesArticleDetail(article.art_id)
          this.articleDetailData.attitude = 1
        }
        this.$toast.success(this.articleDetailData.attitude === 1 ? '点赞成功' : '取消点赞成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color:$text-color;
  .write-btn {
    width: 160px;
  }
  .van-icon {
    font-size: 20px;
  }
  .comment-icon {
    bottom: -2px;
  }
  .share-icon {
    bottom: -2px;
  }
}
</style>
