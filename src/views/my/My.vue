<template>
  <div class="my">
    <div class="my-info" v-if="getUser">
      <!-- 登录成功 -->
      <van-cell-group :border="false" class="base-info">
        <van-cell center :border="false">
          <template #title>
            <van-image
            class="image"
            fit="cover"
            round
            :src="userInfo.photo"
           />
            <span class="custom-title">{{ userInfo.name }}</span>
          </template>
          <van-button
            round
            size="small"
            class="btn"
            to="/user/profile"
          >编辑资料</van-button>
        </van-cell>
        <!-- 表格区域 -->
        <van-grid :border="false" class="data-info">
          <van-grid-item class="data-info-item">
            <div class="text-wrap">
              <div class="count">{{ userInfo.art_count }}</div>
              <div class="count-name">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item" @click="$router.push('/user/follfans')">
            <div class="text-wrap">
              <div class="count">{{ userInfo.follow_count }}</div>
              <div class="count-name" >关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item" @click="$router.push('/user/follfans')">
            <div class="text-wrap">
              <div class="count">{{ userInfo.fans_count }}</div>
              <div class="count-name">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div class="text-wrap">
              <div class="count">{{ userInfo.like_count }}</div>
              <div class="count-name">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>
      <!-- 未登录 -->
      <div v-else class="not-login">
        <div @click="goLoginClick">
          <img class="mobile" src="~assets/img/mobile.png">
        </div>
        <div class="text">登录 / 注册</div>
      </div>
    <!-- 收藏历史 -->
    <div class="sl">
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          icon-prefix="toutiao"
          icon="shoucang"
          text="收藏"
          to="/user/scls"
        />
        <van-grid-item
          icon-prefix="toutiao"
          icon="lishi"
          text="历史"
          to="/user/scls"
        />
    </van-grid>
    </div>
    <!-- 消息通知，小智同学 -->
    <div class="cell-group">
      <van-cell
        title="消息通知"
        is-link
        v-if="getUser"/>
      <van-cell
        title="小智同学"
        is-link
        @click="goClassmathClikck"
      />
    </div>
    <!-- 退出登录按钮 -->
    <van-button
      v-if="getUser"
      type="default"
      class="quit-btn"
      block
      @click="outLogin"
    >退出登录</van-button>
  </div>
</template>

<script>
import { getUserInfo } from 'network/user'

import { mapGetters } from 'vuex'
export default {
  name: 'my',
  components: {},
  props: {},
  data () {
    return {
      // 当前登录用户的信息
      userInfo: {}
    }
  },
  watch: {},
  created () {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted () {},
  methods: {
    // 获取当前登录用户的信息
    async getUserInfo () {
      const data = await getUserInfo()
      this.userInfo = data.data
    },
    // 去登录
    goLoginClick () {
      this.$router.push({
        name: 'login',
        query: {
          redirection: '/my'
        }
      })
    },
    // 退出登录
    outLogin () {
      // 消息确认
      this.$dialog.confirm({
        title: '退出登录',
        message: '是否退出登录'
      })
        .then(() => {
          this.$store.commit('saveUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    goClassmathClikck () {
      this.$router.push('/user/chat')
      // if (this.getUser) this.$router.replace('/user/chat')
      // else this.$router.replace('/user/chat')
    }
  }
}
</script>

<style scoped lang="scss">
.my {
  .my-info {
    background: url("~assets/img/banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .van-cell {
        background-color: unset;
      }
      .van-cell__title {
        display: flex;
        align-items: center;
        .image {
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid $text-color;
          margin-right: 11px;
        }
        .custom-title {
          font-size: 15px;
          color: $text-color;
        }
      }
      .btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .count-name {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("~assets/img/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
   /deep/ .sl {
     .van-grid-item {
      height: 70px;
       .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
    .van-grid-item + .van-grid-item  {
        border-left: 1px solid #eee;
      }
  }
  .cell-group {
    margin: 14px 0px;
  }
  .quit-btn {
    color: #d86262;
  }
}
</style>
