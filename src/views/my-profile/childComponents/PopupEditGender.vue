<template>
  <div class="editGender">
    <van-picker
      title="修改性别"
      show-toolbar
      :default-index="index"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserMessage } from 'network/user'
export default {
  name: 'editGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      localGender: this.value,
      columns: ['男', '女'],
      // 默认选中项
      index: this.value
    }
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      console.log(index, value)
      try {
        const { data } = await updateUserMessage({
          gender: index
        })
        console.log(data)
        this.$toast.success('修改成功')
        this.$emit('input', data.gender)
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
