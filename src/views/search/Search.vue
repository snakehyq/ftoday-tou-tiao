<template>
  <div class="search">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onFocus"
        background="#3296fa"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult
      class="search-result"
      v-if="isShowControllerSearchResult"
      :searchText="value"
    ></SearchResult>
    <!-- 联想建议 -->
    <Advice
      v-else-if="value"
      :searchText="value"
      @search="onSearch($event)"
    ></Advice>
    <!-- 历史记录 -->
    <History
      v-else
      :historyData="historyData"
      @deleteAll="historyData = $event"
      @search="onSearch($event)"
      ></History>
  </div>
</template>

<script>
import Advice from './childComponents/Advice'
import History from './childComponents/History'
import SearchResult from './childComponents/SearchResult'

import { setStorage, getStorage } from 'store/storage'
import { getHistoryData } from 'network/search'
export default {
  name: 'search',
  components: {
    Advice,
    History,
    SearchResult
  },
  data () {
    return {
      value: '',
      // 控制搜素结果展示
      isShowControllerSearchResult: false,
      // 存储历史记录
      historyData: getStorage('history-storage') || []
    }
  },
  watch: {
    historyData () {
      setStorage('history-storage', this.historyData)
    }
  },
  created () {
    this.getHistoryData()
  },
  methods: {
    // 获取历史搜索记录
    async getHistoryData () {
      const { data } = await getHistoryData()
      console.log(data)
    },
    onSearch (val) {
      this.value = val
      this.isShowControllerSearchResult = true
      this.historyData.unshift(val)
      this.historyData = [...new Set(this.historyData)]
      // 如果用户登录，发送请求存储本地，后端自动存储
      // 如果用户没有登录，存储到本地,监听historyData数据可以实现
    },
    onFocus () {
      this.isShowControllerSearchResult = false
    },
    onCancel () {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top:54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
