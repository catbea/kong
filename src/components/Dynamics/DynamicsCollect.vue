<template>
  <div class="dynamics-collect">
    <div class="top-container">
      <h5>数据中心</h5>
      <van-icon class="icon-right" name="chat" />
    </div>
    <div class="shadow_box info-box" v-if="data">
      <div class="data-container">
        <div class="data-item main-data">
          <span class="data-title">客户数量</span>
          <div class="data-value">{{data.customerCount.val}}<span class="data-change">+{{data.customerCount.change}}</span></div>
        </div>
        <div class="data-item">
          <span class="data-title">名片浏览</span>
          <div class="data-value">{{data.businessCardViews.val}}<span class="data-change">+{{data.businessCardViews.change}}</span></div>
        </div>
        <div class="data-item">
          <span class="data-title">楼盘浏览</span>
          <div class="data-value">{{data.estateViews.val}}<span class="data-change">+{{data.estateViews.change}}</span></div>
        </div>
      </div>
      <div class="bottom-line"></div>
      <div class="carousel-container">
        <marquee :itemHeight="30">
          <marquee-item class="carousel-item" v-for="(item,index) in data.simpleDynamic" :key="index">
            <avatar :avatar="item.avatarUrl"></avatar>
            李文忠 <span>3分钟前</span> 浏览了楼盘 <span>碧桂园凤凰</span>
          </marquee-item>
        </marquee>
      </div>
    </div>
  </div>
</template>
<script>
import Marquee from 'COMP/Marquee'
import MarqueeItem from 'COMP/MarqueeItem'
import Avatar from 'COMP/Avatar'
export default {
  components: {
    Marquee,
    MarqueeItem,
    Avatar
  },
  props: {
    data: { type: Object }
  }
}
</script>
<style lang="less">
.dynamics-collect {
  margin: 0;
  .top-container {
    position: relative;
    margin: 0 16px 0;
    color: #333333;
    font-size: 28px;
    h5 {
      display: inline-block;
    }
    .icon-right {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .info-box {
    position: relative;
    margin: 0 16px;
    > .data-container {
      display: flex;
      justify-content: space-around;
      > .data-item {
        height: 80px;
        position: relative;
        > .data-title {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
        }
        > .data-value {
          position: absolute;
          bottom: 0;
          font-size: 20px;
          font-weight: 500;
          color: #333333;
          > .data-change {
            position: absolute;
            font-size: 14px;
            transform: scale(0.8);
            font-weight: 500;
            color: #333333;
          }
        }
        &:first-child {
          margin: 0 16px 0 0;
          .data-value {
            font-size: 28px;
            .data-change {
              font-size: 12px;
              transform: scale(0.8);
            }
          }
        }
      }
    }
    > .bottom-line {
      margin: auto;
      width: 80%;
      height: 1px;
      border-radius: 1px;
      background: #eeeeee;
    }
    .carousel-container {
      text-align: center;
      .carousel-item {
        display: flex;
        justify-content: center;
        font-size: 12px;
        height: 30px;
        line-height: 24px;
        // img {
        //   margin: 0 -25px;
        // }
      }
    }
  }
}
</style>
