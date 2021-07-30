<template>
  <div class="edit-gender">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
      />
  </div>
</template>

<script>
import { updateUserMessage } from 'network/user'
import dayjs from 'dayjs'
export default {
  name: 'editGender',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm (value) {
      value = dayjs(value).format('YYYY-MM-DD')
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await updateUserMessage({
          brithday: value
        })
        this.$toast.success('修改成功')
        this.$emit('input', data.brithday)
        this.$emit('close')
      } catch (error) {
        this.$toast.success('修改失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
