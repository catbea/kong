<template>
  <div class="full-screen-page" v-if="info.domShow">
    <div class="full-screen-page-box">
      <van-swipe @change="onChange" :show-indicators="false" >
  <van-swipe-item v-for="(item,index) in info.arr" :key="index">
    <img :src="item" alt="" srcset="" @click="close">
  </van-swipe-item>
   </van-swipe>
    <div class="a">
        {{ current + 1 }}/4
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  data: () => ({
    current: 0
  }),
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    close() {
      this.info.domShow = false
    }
  }
}
</script>
<style lang="less">
.full-screen-page {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(247, 249, 250, 1);
  touch-action: none;
  .full-screen-page-box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .van-swipe {
      width: 100%;
    }
    img {
      display: block;
      width: 375px;
      max-height: 667px;
    }
    .a {
      position: absolute;
      right: 151px;
      bottom: 25px;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 32px;
      width: 73px;
      height: 32px;
      background: rgba(0, 0, 0, 1);
      border-radius: 18px;
      opacity: 0.6;
      text-align: center;
    }
  }
}
</style>
