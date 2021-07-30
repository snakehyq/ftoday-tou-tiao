<template>
   <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">{{ getUser ? '我的' : '未登录' }}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tabbar',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style>

</style>
