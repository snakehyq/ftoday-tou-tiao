<template>
  <div class="foll-item">
    <van-cell
      center
      :title="fansItem.name"
      :label="`粉丝数: ${fansItem.fans_count}`"
    >
        <div slot="icon">
            <van-image
            class="avater"
            round
            fit="cover"
            :src="fansItem.photo"
            />
        </div>
        <van-button
          type="default"
          size="small"
        >{{ fansItem.mutual_follow ? '互相关注' : '已关注' }}</van-button>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'fansItem',
  props: {
    fansItem: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.foll-item {
    border-bottom: 1px solid #eee;
    .avater {
        width: 50px;
        height: 50px;
        margin-right: 15px;
    }
}
</style>
