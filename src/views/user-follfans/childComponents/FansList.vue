<template>
  <div class="fans-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <FansItem
      v-for="(item, index) in fansListData"
      :key="index"
      :fansItem="item"
    ></FansItem>
    </van-list>
  </div>
</template>

<script>
import { getUserFans } from 'network/user'
import FansItem from './FansItem'
export default {
  name: 'fansList',
  components: {
    FansItem
  },
  data () {
    return {
      page: 1,
      per_page: 10,
      // 粉丝列表数据
      fansListData: [],
      // 加载状态
      loading: false,
      // 没有数据了的状态
      finished: false
    }
  },
  methods: {
    async onLoad () {
      // 发送请求
      const { data } = await getUserFans({
        page: this.page,
        per_page: this.per_page
      })
      console.log(data)
      const { results } = data
      // 将返回的数据加入到fansListData数据
      this.fansListData.push(...results)
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
