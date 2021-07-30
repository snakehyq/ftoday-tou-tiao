<template>
  <div class="editName">
    <!-- 导航 -->
    <van-nav-bar
      class="edit-nav-bar"
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div style="padding: 10px;">
      <van-field
        v-model="localName"
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserMessage } from 'network/user'
export default {
  name: 'editName',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await updateUserMessage({
          name: this.localName
        })
        this.$toast.success('修改成功')
        this.$emit('input', data.name)
        this.$emit('close')
      } catch (error) {
        if (error && error.resopnse && error.resopnse.status === 409) {
          this.$toast.fail('昵称已经存在')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editName {
    /deep/ .edit-nav-bar {
      background-color: $text-color;
      .van-nav-bar__content {
        .van-nav-bar__title {
          color: #000;
        }
      }
    }
}
</style>
