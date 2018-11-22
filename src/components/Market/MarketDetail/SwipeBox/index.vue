<template>
  <div class="market-img-page" @click="photo">
    <van-swipe @change="onChange" :show-indicators="false" >
  <van-swipe-item >1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
   </van-swipe>
    <div class="a">
        {{ current + 1 }}/4
      </div>
<!--     
    <van-swipe @change="onChange">
      <van-swipe-item><img src="http://720ljq2test-10037467.cossh.myqcloud.com/1541755518684ZmwQ2wDj6hmFwFM4.png" alt="" srcset=""></van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
 
      <div class="custom-indicator" slot="indicator">
        {{current}}/4
      </div>
    </van-swipe> -->
      <div class="collect-box">
        <div class="collect"></div> 收藏
      </div>
      <router-link tag="div" to="/marketDetail/share" class="share-box">
        <div class="share"></div> 分享
      </router-link>
    </div>
</template>
<script>
export default {
  data:()=>({
    current: 0
  }),
  methods: {
    photo() {
      // console.log(0)
      this.$router.push("/market/marketDetail/photo")
    },
    onChange(index) {
      console.log(index)
      this.current = index;
    }
  }
}
</script>
<style lang="less">
  .market-img-page {
    width: 375px;
    height: 281px;
    border-bottom: 1px solid black;
    position: relative;
    .a{
      position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: black;
    background: rgba(0, 0, 0, 0.1);
    }
    .van-swipe{
      width: 100%;
      height: 100%;
    }
    .collect-box {
      width: 24px;
      position: absolute;
      top: 20px;
      right: 69px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: black;
      .collect {
        border: 1px solid black;
        width: 20px;
        height: 20px;
      }
    }
    .share-box {
      width: 24px;
      position: absolute;
      top: 20px;
      right: 29px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: black;
      .share {
        border: 1px solid black;
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
