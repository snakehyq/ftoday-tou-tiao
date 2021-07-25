<template>
  <div class="searchResult">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in searchResultData"
          :key="index"
          :title="item.title"
        />
      </van-list>
  </div>
</template>

<script>
import { getSearchResults } from 'network/search'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      // 页数
      page: 1,
      // 每页的数量
      per_page: 10,
      // 搜索结果
      searchResultData: []
    }
  },
  methods: {
    async onLoad () {
      // 发送搜索结果请求
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      // 设置加载状态结束
      this.loading = false
      // 将数据添加到数组中
      const { results } = data
      this.searchResultData.push(...results)
      // 获取下页数据
      if (results.length) {
        this.page++
      } else {
        // 没有数据了，将加载状态设置结束，不再 onLoad
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
