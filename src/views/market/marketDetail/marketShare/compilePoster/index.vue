<template>
  <div class="compile-poster-page">
    <swipe-poster></swipe-poster>
    <!-- <tow-lines v-for="(item,index) in topList" :key="index" :topInfo="item"></tow-lines> -->
    <poster-describe></poster-describe>
    <div class="compile-tagline">
      <div class="compile-tagline-top">宣传语</div> 
      <div class="compile-tagline-bottom">
        <input type="text" name="" placeholder="请填写宣传语，小于12个字符">
      </div>
    </div>
    <compile-cover></compile-cover>
    <div class="compile-button">
      <p>重置海报</p>
      <router-link to='/marketDetail/share/save' tag="p" >生成海报</router-link>
    </div>
  </div>
</template>
<script>
import SwipePoster from 'COMP/Market/MarketDetail/MarketShare/CompilePoster/SwipePoster'
import PosterDescribe from 'COMP/Market/MarketDetail/MarketShare/CompilePoster/PosterDescribe'
import CompileCover from 'COMP/Market/MarketDetail/MarketShare/CompilePoster/CompileCover'
export default {
  components: {
    SwipePoster,
    PosterDescribe,
    CompileCover
  },
  data: () => ({
    list: [1, 2, 3, 4],
    show: false
    // topList:[
    //   {
    //    top:[
    //       {left:"开发商",right:"惠州市太东地产有限公司"}
    //       ]
    //   },
    //   {
    //    top:[
    //       {left:"开发商",right:"惠州市太东地产有限公司"}
    //       ]
    //   },
    //   {
    //    top:[
    //       {left:"开发商",right:"惠州市太东地产有限公司"}
    //       ]
    //   },
    //   {
    //    top:[
    //       {left:"开发商",right:"惠州市太东地产有限公司"}
    //       ]
    //   }
    // ],
  }),
  methods: {}
}
</script>
<style lang="less">
.compile-poster-page {
  line-height: 22px;
  .compile-tagline {
    margin-left: 15px;
    .compile-tagline-top {
      font-size: 16px;
      font-family: PingFang-SC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 12px;
    }
    .compile-tagline-bottom {
      width: 325px;
      height: 44px;
      display: flex;
      align-items:center;
      padding: 0 0 0 16px;
      border-radius: 4px;
      border: 1px solid;
      input::-webkit-input-placeholder {
        color: rgba(221, 221, 221, 1);
        font-size: 16px;
        // text-align:left;
      }
      input {
        width: 320px;
        height: 21px;
        border: none;
        padding-bottom:3px;
        font-size:16px;
      }
    }
  }

  > .compile-button {
    margin: 48px 0 24px 38px;
    text-align: center;
    line-height: 44px;
    display: flex;
    > p:nth-child(1) {
      width: 144px;
      height: 42px;
      border-radius: 4px;
      border: 1px solid;
      margin-right: 12px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      // line-height:22px;
    }
    > p:nth-child(2) {
      width: 144px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      // line-height:22px;
    }
  }
}
</style>
