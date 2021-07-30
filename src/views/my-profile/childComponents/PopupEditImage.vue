<template>
<div class="edit-image">
    <img :src="image"  alt id="image"/>
    <van-nav-bar
      class="edit-nav-bar"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
</div>
</template>

<script>
import { updateUserImage } from 'network/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'editImage',
  props: {
    file: {
      type: File,
      required: true,
      // 图片容器
      cropper: null
    }
  },
  data () {
    return {
      // 图片
      image: window.URL.createObjectURL(this.file)
    }
  },
  mounted () {
    const image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise((resolve, reject) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onClickRight () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const file = await this.getCroppedCanvas()
        const fs = new FormData()
        fs.append('photo', file)
        const { data } = await updateUserImage(fs)
        console.log(data)
        this.$toast.success('修改成功')
        this.$emit('updateImage', data.photo)
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
.edit-image {
    /deep/ .edit-nav-bar {
      background-color: #000;
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      .van-nav-bar__text {
        color: $text-color;
      }
    }
    #image {
        display: block;
        /* This rule is very important, please don't ignore this */
        max-width: 100%;
    }
}
</style>
