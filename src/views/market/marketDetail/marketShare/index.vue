<template>
  <div class="market-share-page">
    <div class="box">
    <div class="share-top">
      <div class="share-top-content bg_img" :style="{backgroundImage:'url(http://t1.27270.com/uploads/tu/201811/907/84695947e4.jpg)'}"></div>
    </div>
    <div class="share-bottom">
      <p>长按保存图片 可分享好友或朋友圈</p>
      <ul>
      <router-link tag="li" to="/marketDetail/share/compile" class="compile">编辑海报</router-link> 
      <li class="save">保存海报</li>
      </ul>
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
export default {
  created() {
    this.$store.commit(types.TABBAR, false)
  }
}
</script>
<style lang="less">
.market-share-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #ffffff;
  .share-top {
    width: 300px;
    height: 480px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07),
      0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    .share-top-content {
      width: 271px;
      height: 448px;
    }
  }
  .share-bottom {
    margin-top: 12px;
    p {
      text-align: center;
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: normal;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 17px;
      .compile {
        width: 144px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
      }
      .save {
        width: 144px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: rgba(0, 122, 230, 1);
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
