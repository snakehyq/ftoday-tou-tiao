<template>
  <div class="collections-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <ArtListItem
      v-for="(item, index) in collectionListData"
      :key="index"
      :channel="item"
    ></ArtListItem>
    </van-list>
  </div>
</template>

<script>
import { getUserCollections } from 'network/news'
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
      collectionListData: [],
      // 加载状态
      loading: false,
      // 没有数据了的状态
      finished: false
    }
  },
  methods: {
    async onLoad () {
      // 发送请求
      const { data } = await getUserCollections({
        page: this.page,
        per_page: this.per_page
      })
      const { results } = data
      // 将返回的数据加入到collectionListData数据
      this.collectionListData.push(...results)
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
