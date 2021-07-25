<template>
  <div class="history">
      <van-cell title="搜素历史">
        <div
          slot="right-icon"
          v-if="isShowDelete"
          @click="isShowDelete=false"
        >
          <van-icon name="delete-o"/>
        </div>
        <div v-else>
          <span @click="$emit('deleteAll', [])">全部删除 </span>
          <span @click="isShowDelete=true"> 完成</span>
        </div>
      </van-cell>
      <van-cell
        v-for="(item, index) in historyData"
        :key="index"
        :title="item"
        @click="deleteSingleHistory(index, item)"
        >
        <template #right-icon>
          <van-icon
            v-if="!isShowDelete"
            name="close"
          />
        </template>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'history',
  props: {
    historyData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 控制删除按钮
      isShowDelete: true
    }
  },
  methods: {
    // 删除单个历史记录
    deleteSingleHistory (index, item) {
      // 如果删除状态，则执行删除操作
      if (!this.isShowDelete) {
        this.historyData.splice(index, 1)
        // 存储到本地，在父组件的监听historyData数据可以实现
      } else {
        // 不是删除状态，展示搜索结果
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
