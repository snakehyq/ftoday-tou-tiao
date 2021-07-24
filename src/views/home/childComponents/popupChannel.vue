<template>
  <div class="channel-edit">
    <van-cell
      title="我的频道"
      class="channel-title"
      :border="false"
    >
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="editClick"
        :text="isControllerEditAndComp?'完成':'编辑'"
      ></van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        :icon="index && isControllerEditAndComp?'close':''"
        v-for="(item, index) in userChannel"
        :key="index"
        :class="{ active: active === index }"
        :text="item.name"
        @click="deleteChannelClick(item, index)"
      />
    </van-grid>
    <van-cell
      title="频道推荐"
      :border="false"
      class="channel-title"
    ></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in recommentChannel"
        :key="index"
        :text="item.name"
        @click="addRecommendClick(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { setStorage } from 'store/storage'

import { mapGetters } from 'vuex'

import { addUserChannnel, deleteUserChannnel } from 'network/user'

export default {
  name: 'popupChannel',
  props: {
    userChannel: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    artListAllData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    active: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      // 控制编辑和完成
      isControllerEditAndComp: false
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    recommentChannel () {
      return this.artListAllData.filter(item => {
        return !this.userChannel.find(it => {
          return item.id === it.id
        })
      })
    }
  },
  methods: {
    // 添加频道
    async addRecommendClick (item) {
      this.userChannel.push(item)
      // 数据持久化
      if (this.getUser) {
      // 用户登录了，发送请求存储
        await addUserChannnel({
          channels: [
            { id: item.id, seq: this.userChannel.length }
          ]
        })
      } else {
        // 用户没有登录，存储到本地
        setStorage('user-channel', this.userChannel)
      }
    },
    // 点击编辑按钮
    editClick () {
      this.isControllerEditAndComp = !this.isControllerEditAndComp
    },
    // 删除频道
    async deleteChannelClick (item, index) {
      // 编辑状态
      if (index && this.isControllerEditAndComp) {
        if (index < this.active) {
          this.$emit('input', this.active - 1)
        }
        this.userChannel.splice(index, 1)
        // 数据持久化
        if (this.getUser) {
          // 用户登录，发送请求删除频道
          await deleteUserChannnel(item.id)
        } else {
          // 用户没有登录，删除本地存储频道
          setStorage('user-channel', this.userChannel)
        }
      } else {
        // 完成状态
        // 1.切换频道
        this.$emit('changeChannel', index)
        // 2.隐藏遮罩层
        this.$emit('close')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .van-button {
    padding: 10px;
  }
  .channel-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
    background-color: #f4f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
      }
    }
    /deep/ .van-grid-item__icon {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 20px;
        .van-grid-item__text {
            margin-top: 0;
        }
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
