<template>
  <div class="home">
    <!-- 导航 -->
    <van-nav-bar>
       <template #title>
        <van-button
          type="primary"
          round
          size="small"
          icon="search"
          class="search-btn"
          >搜素
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 标题栏 -->
    <van-tabs v-model="active">
      <van-tab
        v-for="(item, index) in userChannel"
        :title="item.name"
        :key="index">
        <ArtList :channel="item"></ArtList>
      </van-tab>
      <div slot="nav-right" class="right-wrap-zhanwei"></div>
      <div slot="nav-right" @click="isShowChannel = true">
        <div class="nav-right">
          <van-icon name="wap-nav" />
        </div>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShowChannel"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
    <PopupChannel
      :userChannel="userChannel"
      :artListAllData="artListAllData"
      @close="isShowChannel = false"
      @changeChannel="active = $event"
      :active="active"
      @input="active = $event"
    ></PopupChannel>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsData } from 'network/user'
import { getArtListAllData } from 'network/news'

import ArtList from './childComponents/artlist'
import PopupChannel from './childComponents/popupChannel'

import { mapGetters } from 'vuex'

import { getStorage } from 'store/storage'

export default {
  name: 'home',
  components: {
    ArtList,
    PopupChannel
  },
  props: {},
  data () {
    return {
      // 用户的频道标题数据
      userChannel: [],
      // 标题的激活
      active: 0,
      // 弹出层
      isShowChannel: false,
      // 全部频道列表数据
      artListAllData: []
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  watch: {},
  created () {
    this.getUserChannelsData()
    this.getArtListAllData()
  },
  mounted () {},
  methods: {
    // 获取用户频道数据
    async getUserChannelsData () {
      let channnels = []
      // 用户登录，发送请求获取用户频道列表
      if (this.getUser) {
        const { data } = await getUserChannelsData()
        channnels = data.channels
      } else if (getStorage('user-channel')) {
        // 没有登录,获取本地缓存
        channnels = getStorage('user-channel')
      } else {
        // 没有缓存，发送请求获取默认频道列表
        const { data } = await getUserChannelsData()
        channnels = data.channels
      }
      this.userChannel = channnels
    },
    // 获取全部频道列表
    async getArtListAllData () {
      const { data } = await getArtListAllData()
      this.artListAllData = data.channels
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
   /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
    .right-wrap-zhanwei {
      width: 33px;
      flex-shrink: 0;
    }
    .nav-right {
      position: fixed;
      right: 0px;
      height: 43px;
      width: 33px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: .9;
      .van-icon {
        font-size: 24px;
      }
    }
}
</style>
