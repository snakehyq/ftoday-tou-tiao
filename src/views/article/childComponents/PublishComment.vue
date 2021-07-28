<template>
  <div class="publish-comment">
      <van-field
        autosize
        :border="false"
        v-model="message"
        type="textarea"
        maxlength="40"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button
        :disabled="!message.trim()"
        type="default" @click="publishClick">发布</van-button>
  </div>
</template>

<script>
import { addCommentReply } from 'network/comment'
export default {
  name: 'publishComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    // 发布评论
    async publishClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      let obj = {}
      try {
        const articleId = this.articleId ? this.articleId.toString() : null
        const { data } = await addCommentReply({
          target: this.target.toString(),
          content: this.message,
          art_id: articleId
        })
        obj = data.new_obj
        if (data.new_obj) {
          this.$toast.success('发布成功')
        } else {
          this.$toast.fail('发布失败，重新发布')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
      this.$emit('close', obj)
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-comment {
    padding: 14px;
    display: flex;
    align-items: center;
}
</style>
