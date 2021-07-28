<template>
  <div class="comment-reply">
    <van-popup
      v-model="isShowReply"
      closeable
      close-icon-position="top-left"
      position="bottom"
      @click-close-icon="closePopup"
      :style="{ height: '80%' }"
    >
      <van-nav-bar :title="`${commentItem.reply_count}条回复`" class="title"/>
      <CommentItem
        :commentItem="commentItem"
      ></CommentItem>

      <!-- 全部评论 -->
      <CommentList
        :commentList="commentList"
        :source="commentItem.com_id"
        type="c"
      ></CommentList>

      <!-- 底部 -->
      <div class="footer">
        <van-button
          class="write-btn"
          type="default"
          round
          size="small"
          @click="onWriteClick"
        >写评论</van-button>
      </div>
    </van-popup>
    <!-- 发布评论 -->
    <van-popup v-model="isShowComment" position="bottom">
      <PublishComment
        :target="commentItem.com_id"
        :articleId="articleId"
        @close="addComment"
        ></PublishComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import CommentList from './CommentList'
import PublishComment from './PublishComment'

export default {
  name: 'commentReply',
  props: {
    isShowReply: {
      type: Boolean,
      required: true
    },
    commentItem: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    PublishComment
  },
  data () {
    return {
      // 评论的显示隐藏
      isShowComment: false,
      // 评论数据
      commentList: []
    }
  },
  methods: {
    closePopup () {
      this.$emit('close')
    },
    // 写评论
    onWriteClick () {
      this.isShowComment = true
    },
    // 发布成功
    addComment (data) {
      // 隐藏
      this.isShowComment = false
      // 让评论数量加1
      this.commentItem.reply_count++
      this.commentList.unshift(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-reply {
  /deep/ .title {
    background-color: $text-color;
    .van-nav-bar__title {
      color: #000;
    }
  }
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
    background-color: #fff;
    .write-btn {
      width: 60%;
    }
  }
}
</style>
