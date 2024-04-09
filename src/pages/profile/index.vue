<script setup lang="ts">
import { onMounted, reactive } from "vue";

let userInfo = reactive({ avatarUrl: '', nickName: ''})

onMounted(() => {
  const ui = uni.getStorageSync('userInfo') || JSON.stringify({ avatarUrl: '', nickName: '' })
  const uiObj = JSON.parse(ui)
  Object.assign(userInfo, uiObj)
})

function onChooseAvatar(e: any) {
  userInfo.avatarUrl = e.detail.avatarUrl
  uni.setStorageSync('userInfo', JSON.stringify(userInfo))
}

function getNickname(e: any) {
  userInfo.nickName = e.detail.value;
  uni.setStorageSync('userInfo', JSON.stringify(userInfo))
}
</script>

<template>
  <div class="profile">
    <u-form
        labelPosition="left"
        :model="userInfo"
        ref="userInfo"
    >
      <u-form-item
          label="头像"
          borderBottom
      >
        <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <img class="avatar" :src="userInfo.avatarUrl" style="width: 100px; height: 100px;" alt="">
        </button>
      </u-form-item>
      <u-form-item
          label="昵称"
          borderBottom
      >
        <input type="nickname" class="weui-input" placeholder="请输入昵称" v-model="userInfo.nickName" @change="getNickname" />
      </u-form-item>
    </u-form>
    <u-toast ref="uToast"></u-toast>
  </div>
</template>

<style scoped lang="scss">
@import "../../../node_modules/uview-plus/index.scss";
.profile {
  min-height: 100vh;
  background-color: $u-bg-color;
  padding: 20px 12px;
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
}
</style>
