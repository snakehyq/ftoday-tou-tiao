<template>
  <div class="collections-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <ArtListItem
      v-for="(item, index) in historyListData"
      :key="index"
      :channel="item"
    ></ArtListItem>
    </van-list>
  </div>
</template>

<script>
import { getUserHistorys } from 'network/news'
import ArtListItem from 'components/content/artlistItem'
export default {
  name: 'fansList',
  components: {
    ArtListItem
  },
  data () {
    return {
      page: 1,
      per_page: 10,
      // 粉丝列表数据
      historyListData: [],
      // 加载状态
      loading: false,
      // 没有数据了的状态
      finished: false
    }
  },
  methods: {
    async onLoad () {
      // 发送请求
      const { data } = await getUserHistorys({
        page: this.page,
        per_page: this.per_page
      })
      console.log(data)
      const { results } = data
      // 将返回的数据加入到historyListData数据
      this.historyListData.push(...results)
      // 关闭加载状态
      this.loading = false
      // 加载下页数据
      if (results.length) {
        this.page++
      } else {
        // 没有数据了，显示没有更多了
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
