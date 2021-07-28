<template>
  <div class="comment-">
      <van-cell title="全部评论"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经展示所有评论"
        @load="onLoad"
      >
    <CommentItem
      v-for="(item, index) in commentList"
      :key="index"
      :commentItem="item" />
    </van-list>
  </div>
</template>

<script>
import { getCommentReply } from 'network/comment'
import CommentItem from './CommentItem'
export default {
  name: 'commentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    commentList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      // 获取下页
      offset: null,
      // 每页的数量
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 发送请求
      const { data } = await getCommentReply({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // 关闭加载状态
      this.loading = false
      const results = data.results
      // 将数据添加到评论列表数组中
      this.commentList.push(...results)
      // 把评论总数量传递给父组件
      this.$emit('updateTotalCount', data.total_count)
      console.log(this.commentList)
      // console.log(this.commentList)
      if (results.length) {
        // 下一页数据
        this.offset = data.last_id
      } else {
        // 没有数据显示没有更多了
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
