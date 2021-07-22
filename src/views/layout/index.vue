<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from 'views/tabbar/Tabbar'

export default {
  name: 'layout',
  components: {
    Tabbar
  },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss"></style>
