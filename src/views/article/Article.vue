<template>
  <div class="article-container">
   <!-- 导航 -->
    <van-nav-bar
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <!-- 标题 -->
      <h1 class="title">{{ articleDetailData.title }}</h1>
      <!-- 作者信息 -->
      <van-cell class="user-info">
        <div slot="title" class="name">{{ articleDetailData.aut_name }}</div>
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="articleDetailData.aut_photo"
        />
        <div slot="label" class="pubdate">{{ articleDetailData.pubdate | relativeTime }}</div>
        <van-button
          class="follew-btn"
          :icon="articleDetailData.is_followed? '':'plus'"
          :type="articleDetailData.is_followed?'default':'info'"
          round
          size="small"
          :loading="isFollowedLoading"
          @click="followedClick"
        >{{ articleDetailData.is_followed? '已关注':'关注' }}</van-button>
      </van-cell>
      <!-- 正文 -->
      <div class="markdown-body" ref="articleContent">
        <div v-html="articleDetailData.content"></div>
      </div>
      <!-- 评论列表 -->
      <CommentList
        :commentList="commentList"
        :source="articleId"
        @updateTotalCount="totalCount = $event + commentList.length"
      ></CommentList>
    </div>
    <!-- 底部导航栏 -->
    <article-footer
      :articleDetailData="articleDetailData"
      @showComment="isShowComment = true"
      :totalCount="totalCount"
    ></article-footer>
    <!-- 发布评论 -->
    <van-popup v-model="isShowComment" position="bottom">
      <PublishComment
        :target="articleId"
        @close="addComment"
        ></PublishComment>
    </van-popup>
    <!-- 评论回复 -->
    <CommentReply
      v-if="isShowReply"
      :commentItem="commentItem"
      :articleId="articleId"
      :isShowReply="isShowReply"
      @close="isShowReply = false"
    ></CommentReply>
  </div>
</template>

<script>
// 加载markdown的样式
import 'assets/css/github-markdown.css'
import { ImagePreview } from 'vant'

import { getArticleDetailById } from 'network/news'
import { cancelFollowedUser, followedUser } from 'network/user'

import ArticleFooter from './childComponents/ArticleFooter'
import CommentList from './childComponents/CommentList'
import PublishComment from './childComponents/PublishComment'
import CommentReply from './childComponents/CommentReply'

export default {
  name: 'ArticleIndex',
  components: {
    ArticleFooter,
    CommentList,
    PublishComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      // 文章详情
      articleDetailData: {},
      // 关注的加载状态
      isFollowedLoading: false,
      // 发布评论的显示和隐藏
      isShowComment: false,
      commentList: [
        {
          aut_id: 1,
          aut_name: '大家好666',
          aut_photo: 'http://toutiao-img.itheima.net/Ftxsj6MCTJRUpQl7hWCPJdXK5_mD',
          com_id: 1419941224025948200,
          content: '啊啊',
          is_liking: false,
          is_top: 0,
          like_count: 1,
          pudate: '2020-05-18T23:10:37',
          reply_count: 2
        },
        {
          aut_id: 1,
          aut_name: '大家好666',
          aut_photo: 'http://toutiao-img.itheima.net/Ftxsj6MCTJRUpQl7hWCPJdXK5_mD',
          com_id: 1419941224025948199,
          content: '啊啊',
          is_liking: false,
          is_top: 0,
          like_count: 1,
          pudate: '2020-05-18T23:10:37',
          reply_count: 2
        }
      ],
      // 评论总数量
      totalCount: 0,
      // 评论回复的显示和隐藏
      isShowReply: false,
      // 评论项
      commentItem: {}
    }
  },
  mounted () {
    this.$bus.$on('replyComment', (data) => {
      // 显示评论回复
      this.isShowReply = true
      this.commentItem = data
    })
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleDetailById()
  },
  methods: {
    async getArticleDetailById () {
      const { data } = await getArticleDetailById(this.articleId)
      this.articleDetailData = data
      this.$nextTick(() => {
        this.handelPreviewImage()
      })
    },
    handelPreviewImage () {
      // 获取文章内容dom容器
      const articleContent = this.$refs.articleContent
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 点击关注按钮
    async followedClick () {
      this.isFollowedLoading = true
      if (this.articleDetailData.is_followed) {
        // 已关注，取消关注
        await cancelFollowedUser(this.articleDetailData.aut_id)
      } else {
        // 未关注，关注用户
        await followedUser(this.articleDetailData.aut_id)
      }
      this.articleDetailData.is_followed = !this.articleDetailData.is_followed
      this.isFollowedLoading = false
    },
    // 添加评论
    addComment (data) {
      this.commentList.unshift(data)
      // 让评论数量加1
      this.totalCount++
      // 隐藏遮罩层
      this.isShowComment = false
    }
  }
}
</script>

<style scoped lang="scss">
.article-wrap {
  position: fixed;
  top: 46px;
  bottom: 44px;
  right: 0;
  left: 0;
  overflow-y: auto;
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding:14px;
  background-color: $text-color;
  margin:0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4bb;
  }
  .follew-btn {
    width: 85px;
    height: 29px;

  }
}
.markdown-body {
  padding: 14px;
  background-color: $text-color;
}
</style>
