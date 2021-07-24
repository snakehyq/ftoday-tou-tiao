<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l3">{{ channel.title }}</div>
    <div slot="label">
      <div
        v-if="channel.cover.type === 3"
        class="cover-wrap"
      >
        <div
          class="cover-wrap-item"
          v-for="(img, index) in channel.cover.images"
          :key="index"
        >
          <van-image
            class="cover-image"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ channel.aut_name }}</span>
        <span>{{ channel.comm_count }}评论</span>
        <span>{{ channel.pubdate | relativeTime  }}</span>
      </div>
    </div>
    <!-- 默认插槽的名字叫 default，可以省略 -->
    <van-image
      v-if="channel.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="channel.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'artListItem',
  props: {
    channel: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }

  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 73px;
      }
    }
  }

  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
