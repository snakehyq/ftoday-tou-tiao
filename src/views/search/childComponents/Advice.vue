<template>
  <div class="advice">
    <van-cell
      v-for="(item, index) in adviceData"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="hightLight(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchAdvice } from 'network/search'

// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  name: 'advice',
  props: {
    searchText: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      // 联想建议数据
      adviceData: []
    }
  },
  watch: {
    // debounce 函数
    // 参数1：函数
    // 参数2：防抖时间
    // 返回值：防抖之后的函数，和参数1功能是一样的
    searchText: {
      handler: debounce(async function () {
        const q = this.searchText
        if (!q) return ''
        const { data } = await getSearchAdvice({
          q
        })
        this.adviceData = data.options
      }, 200),
      immediate: true
    }
  },
  methods: {
  // 参数 source: 原始字符串
  // 参数 keyword: 需要高亮的关键词
  // 返回值：替换之后的高亮字符串
    hightLight (str) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      return str.replace(new RegExp(this.searchText, 'gi'), '<span style="color:red">' + this.searchText + '</span>')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
