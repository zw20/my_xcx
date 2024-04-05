<template>
  <div class="home">
    <div class="ads">
      <u-swiper
          :list="list"
          previousMargin="30"
          nextMargin="30"
          circular
          radius="5"
          bgColor="#ffffff"
      ></u-swiper>
    </div>
    <div class="remarks" v-if="remarks.length > 0">
      <div class="remark" v-for="(item, index) in remarks" :key="index" @click="editRemark(index)">
        <div class="title">第&nbsp;{{ index + 1 }}&nbsp;个</div>
        <div class="content">{{ item }}</div>
      </div>
    </div>
<!--    <u-empty v-else></u-empty>-->
    <div style="height: 100px;"></div>
    <div class="bottom">
      <u-button type="primary" text="添 加" @click="goAdd"></u-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { onShow } from "@dcloudio/uni-app";
const list = reactive([
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png'
])
let remarks = ref([])

onMounted(() => {
  // 获取数据
  const data = uni.getStorageSync('remarks') || '[]'
  remarks.value = JSON.parse(data)
})

onShow(() => {
  const data = uni.getStorageSync('remarks') || '[]'
  remarks.value = JSON.parse(data)
})

function goAdd() {
  uni.navigateTo({
    url: '/pages/home/add-remark'
  })
}

function editRemark(index: number) {
  uni.navigateTo({
    url: `/pages/home/edit-remark?index=${index}`
  })
}

</script>

<style lang="scss" scoped>
@import "../../../node_modules/uview-plus/index.scss";
.home {
  min-height: 100vh;
  background-color: $u-bg-color;
  padding: 20px 12px;
  .remarks {
    padding-top: 20px;
    .remark {
      border-radius: 6px;
      border: 1px solid $u-border-color;
      background-color: #ffffff;
      margin-bottom: 12px;
      .title {
        font-size: 14px;
        color: #000000;
        padding: 12px 0 6px 12px;
        font-weight: 500;
      }
      .content {
        max-height: 95px;
        font-size: 14px;
        padding: 0 12px 12px 12px;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 5; /* 指定要显示的行数 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #333333;
      }
    }
  }
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
    z-index: 1;
  }
}
</style>
