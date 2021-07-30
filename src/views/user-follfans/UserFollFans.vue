<template>
  <div class="user-follfans">
    <van-tabs v-model="active">
      <van-tab title="关注">
        <FollList></FollList>
      </van-tab>
      <van-tab title="粉丝">
        <FansList></FansList>
      </van-tab>
      <van-icon
        name="arrow-left"
        @click="$router.back()"
    />
    </van-tabs>
  </div>
</template>

<script>
import FollList from './childComponents/FollList'
import FansList from './childComponents/FansList'
export default {
  name: 'userFollFans',
  components: {
    FollList,
    FansList
  },
  data () {
    return {
      active: 0,
      titles: ['关注', '粉丝']
    }
  }
}
</script>

<style lang="scss" scoped>
.user-follfans {
    /deep/ .van-tabs__nav--line {
        position: relative;
        background-color: $nav-bgcolor;
        .van-tab__text--ellipsis {
            font-size: 16px;
            color: $text-color;
        }
        .van-tabs__line {
            bottom: 17px;
            width: 60px;
            background-color: #fff;
        }
    }
    /deep/ .van-icon-arrow-left {
        position: absolute;
        top: 9px;
        left: 0px;
        padding: 0 10px;
        color: #fff;
        font-size: 22px;
    }
}
</style>
