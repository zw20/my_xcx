<template>
  <view class="home">
    <div class="context" ref="context">
      zw ❤️ lq
    </div>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const context = ref()
onMounted(() => {
  setTimeout(() => {
    if (context.value) {
      context.value.style.width = '75px'
    }
  }, 5000)
})
</script>

<style lang="scss" scoped>
@import "uview-plus/index.scss";
.home {
  padding: 40px 0;
  .context {
    width: 0px;
    overflow: hidden;
    margin: 0 auto;
    transition: width;
    transition-duration: 5s;
    white-space: nowrap;
  }
}
</style>
