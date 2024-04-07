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
    <div class="actions">
      <u-button type="info" text="个人中心" @click="goProfile"></u-button>
    </div>
    <div class="remarks" v-if="remarks.length > 0">
      <div class="remark" v-for="(item, index) in remarks" :key="index" >
        <div class="title">
          <span class="index">第&nbsp;{{ index + 1 }}&nbsp;个</span>
          <div style="width: 30px;" @click="deleteRemark(index)">
            <u-icon name="close" color="#fa3534" size="15"></u-icon>
          </div>
        </div>
        <div class="content" @click="editRemark(index)">{{ item }}</div>
      </div>
    </div>
    <div class="empty" v-else>暂无备注信息</div>
    <u-modal :show="show" title="提示" confirmText="删除" confirmColor="#fa3534" content="是否确定删除该备注？" showCancelButton @cancel="show = false" @confirm="doDelete" buttonReverse></u-modal>
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

let show = ref(false)

let index = -1

onMounted(() => {
  // 获取数据
  doShow()
})

onShow(() => {
  doShow()
})

function doShow() {
  const data = uni.getStorageSync('remarks') || '[]'
  remarks.value = JSON.parse(data)
}

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

function deleteRemark(i: number) {
  const data = uni.getStorageSync('remarks') || '[]'
  const obj = JSON.parse(data)
  if (index < obj.length) {
    show.value = true
    index = i
  } else {
    return
  }
}
function doDelete () {
  const data = uni.getStorageSync('remarks') || '[]'
  const obj = JSON.parse(data)
  obj.splice(index, 1)
  console.log(obj)
  uni.setStorageSync('remarks', JSON.stringify(obj))
  doShow()
  show.value = false
}

function goProfile() {
  // 前往个人中心
  uni.navigateTo({
    url: '/pages/profile/index'
  })
}

</script>

<style lang="scss" scoped>
@import "../../../node_modules/uview-plus/index.scss";
.home {
  min-height: 100vh;
  background-color: $u-bg-color;
  padding: 20px 12px;
  .actions {
    padding-top: 12px;
  }
  .remarks {
    padding-top: 20px;
    .remark {
      border-radius: 6px;
      border: 1px solid $u-border-color;
      background-color: #ffffff;
      margin-bottom: 12px;
      .title {
        padding: 12px 0 6px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .index {
          font-size: 14px;
          color: #000000;
          font-weight: 500;
        }
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
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88px;
    font-weight: 500;
    font-size: 14px;
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
