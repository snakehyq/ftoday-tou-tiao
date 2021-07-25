<template>
  <div class="artlist">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
        <ArtListItem
          v-for="(item, index) in artListData"
          :key="index"
          :channel="item"
        ></ArtListItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListData } from 'network/news'
import ArtListItem from './artlistItem'
export default {
  name: 'artList',
  props: {
    channel: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  components: {
    ArtListItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      // 时间戳相当于页数
      timestamp: Date.now(),
      // 保存列表数据
      artListData: [],
      // 下拉刷新
      refreshing: false,
      // 下拉刷新的成功文本
      refreshSuccessText: ''
    }
  },
  methods: {
    // 下拉加載更多
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArtListData({
        channel_id: this.channel.id,
        timestamp: this.timestamp,
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      // 2. 把数据放到 list 数组中
      const { results } = data
      this.artListData.push(...results)
      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false
      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      const { data } = await getArtListData({
        channel_id: this.channel.id, // 频道 ID
        timestamp: Date.now(), // 为了大家方便学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
        with_top: 1
      })
      // 2. 把数据放到数据列表中（往顶部追加）
      const { results } = data
      this.artListData.unshift(...results)
      // 3. 关闭刷新的状态 loading
      this.refreshing = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>
<style lang="scss" scoped>
.artlist {
    position: fixed;
    top: 90px;
    bottom: 50px;
    right: 0;
    left: 0;
    overflow-y: auto;
}
</style>
