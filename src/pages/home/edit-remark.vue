<script setup lang="ts">
import { ref } from 'vue'
import {onLoad, onShow} from "@dcloudio/uni-app";
let remark = ref('')
let index = -1

onLoad((query: any) => {
  index = query.index
})

onShow(() => {
  if (index > -1) {
    const data = uni.getStorageSync('remarks') || '[]'
    const obj = JSON.parse(data)
    if (obj.length > index)
    remark.value = obj[index]
  }
})

function edit() {
  const data = uni.getStorageSync('remarks') || '[]'
  const obj = JSON.parse(data)
  obj[index] = remark.value
  uni.setStorageSync('remarks', JSON.stringify(obj))
  let pages = getCurrentPages();
  //函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
  var num= pages.length
  if (num > 1) {
    uni.navigateBack({
      delta: 1
      //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    })
  } else {
    uni.navigateTo({
      url: '/pages/home/index'
    })
  }
}
</script>

<template>
  <div class="edit-remark">
    <u-textarea v-model="remark" placeholder="请输入内容" autoHeight :maxlength="-1"></u-textarea>
    <div style="height: 100px;"></div>
    <div class="bottom">
      <u-button type="primary" text="保 存" @click="edit"></u-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../../node_modules/uview-plus/index.scss";
.edit-remark {
  min-height: 100vh;
  background-color: $u-bg-color;
  padding: 20px 12px;
  .bottom {
    height: 100px;
    padding: 20px 12px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 2;
  }
}
</style>