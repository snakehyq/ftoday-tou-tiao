<template>
  <div class="my-profile">
    <!-- 导航 -->
    <van-nav-bar
      left-arrow
      title="个人信息"
      @click-left="$router.back()"
    />
    <!-- 信息 -->
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="myProfileData.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="myProfileData.name"
      @click="isShowEditName = true"
      />
    <van-cell
      title="性别"
      is-link
      :value="myProfileData.gender === 1 ? '女' : '男'"
      @click="isShowEditGender = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="myProfileData.birthday"
      @click="isShowEditBrithday = true"
    />

    <!-- 修改昵称 -->
    <van-popup
      v-model="isShowEditName"
      position="top"
      :style="{ height: '100%' }">
      <PopupEditName
        v-if="isShowEditName"
        v-model="myProfileData.name"
        @close="isShowEditName = false"
      ></PopupEditName>
    </van-popup>
    <!-- 修改性别 -->
    <van-popup
      v-model="isShowEditGender"
      position="bottom"
      :style="{ height: '50%' }">
      <PopupEditGender
        v-if="isShowEditGender"
        v-model="myProfileData.gender"
        @close="isShowEditGender = false"
      ></PopupEditGender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup
      v-model="isShowEditBrithday"
      position="bottom"
      :style="{ height: '40%' }">
      <PopupEditBrithday
        v-if="isShowEditBrithday"
        v-model="myProfileData.birthday"
        @close="isShowEditBrithday = false"
      ></PopupEditBrithday>
    </van-popup>
    <!-- 修改头像 -->
    <input
      ref="file"
      type="file"
      accept="image/*"
      hidden
      @change="onFileChange"
    />
    <van-popup
      v-model="isShowEditImage"
      position="bottom"
      class="popup-image"
      :style="{ height: '100%' }">
      <PopupEditImage
        v-if="isShowEditImage"
        :file="file"
        @close="isShowEditImage = false"
        @updateImage="myProfileData.photo = $event"
      ></PopupEditImage>
    </van-popup>
  </div>
</template>

<script>
import { getUserMessage } from 'network/user'

import PopupEditName from './childComponents/PopupEditName'
import PopupEditGender from './childComponents/PopupEditGender'
import PopupEditBrithday from './childComponents/PopupEditBrithday'
import PopupEditImage from './childComponents/PopupEditImage'
export default {
  name: 'myProfile',
  components: {
    PopupEditName,
    PopupEditGender,
    PopupEditBrithday,
    PopupEditImage
  },
  data () {
    return {
      myProfileData: {},
      // 修改昵称的显示状态
      isShowEditName: false,
      // 修改性别的显示状态
      isShowEditGender: false,
      // 修改生日的显示状态
      isShowEditBrithday: false,
      // 修改生日的显示状态
      isShowEditImage: false,
      // 图片
      file: null
    }
  },
  created () {
    this.getUserMessage()
  },
  methods: {
    async getUserMessage () {
      const { data } = await getUserMessage()
      this.myProfileData = data
    },
    onFileChange () {
      // 拿到选中的文件图片
      const file = this.$refs.file.files[0]
      this.file = file
      // 显示预览图片
      this.isShowEditImage = true
      // 为了解决相同文件不触发change事件
      // 所有要清空file的value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
    background-color: #f5f7f9;
}
.popup-image {
  background-color: #000;
}
</style>
