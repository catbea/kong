<template>
  <div class="bg_img dynamics-collect">
    <img class="modify-img" :src="bgImg">
    <div class="top-container">
      <h5>数据中心</h5>
      <van-icon class="icon-right" name="chat" @click="goMessage" />
    </div>
    <div class="shadow_box info-box" v-if="data">
      <div class="data-container">
        <div class="data-item main-data" @click="goMessageInfo">
          <div class="data-value">{{data.customerCount.val}}<span class="data-change" v-if="data.customerCount.change !== 0">{{data.customerCount.change}}</span></div>
          <span class="data-title">客户数量</span>
        </div>
        <div class="data-item">
          <div class="data-value">{{data.businessCardViews.val}}<span class="data-change" v-if="data.businessCardViews.change !== 0">{{data.businessCardViews.change}}</span></div>
          <span class="data-title">名片浏览</span>
        </div>
        <div class="data-item">
          <div class="data-value">{{data.estateViews.val}}<span class="data-change" v-if="data.estateViews.change !== 0">{{data.estateViews.change}}</span></div>
          <span class="data-title">楼盘浏览</span>
        </div>
      </div>
      <div class="arrow-icon">
        <van-icon name="arrow" />
      </div>
      <div class="bottom-line"></div>
      <div class="carousel-container">
        <marquee :itemHeight="50">
          <marquee-item class="carousel-item" v-for="(item,index) in data.simpleDynamic" :key="index">
            <avatar :avatar="item.avatarUrl"></avatar>
            {{item.clientName | textOver(4)}} <span>{{item.timeStr}}</span> 浏览楼盘 <span>{{item.markedWords | textOver(6)}}</span>
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
  },
  data: () => ({
    bgImg: require('IMG/dynamics/collectBottom.png')
  }),
  methods: {
    goMessage () {
      this.$router.push('/dynamics/message/messageList')
    },
    goMessageInfo(){
      this.$router.push('/dynamics/allDynamics')
    }
  }
}
</script>
<style lang="less">
.dynamics-collect {
  background-color: #2360ad;
  margin: 0 0 65px;
  height: 175px;
  position: relative;
  .modify-img {
    width: 100%;
    position: absolute;
    top: 175px;
  }
  .top-container {
    position: relative;
    margin: 0 16px 0;
    color: #333333;
    font-size: 28px;
    h5 {
      margin: 20px 0 15px;
      display: inline-block;
      font-size: 20px;
      color: #fff;
    }
    .icon-right {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
    }
  }
  .info-box {
    background: #fff;
    position: relative;
    margin: 0 15px;
    padding: 10px;
    line-height: 1;
    > .data-container {
      padding: 30px 5px;
      margin-right: 20px;
      display: flex;
      justify-content: space-around;
      > .data-item {
        display: inline-block;
        position: relative;
        width: 70px;
        height: 50px;
        > .data-title {
          position: absolute;
          bottom: 0;
          width: 200px;
          font-size: 12px;
          font-weight: 400;
          color: #999999;
        }
        > .data-value {
          position: absolute;
          bottom: 16px;
          font-size: 20px;
          font-weight: 500;
          color: #333333;
          > .data-change {
            position: absolute;
            font-weight: 500;
            color: #333333;
          }
        }
        &:first-child {
          width: 90px;
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
    > .arrow-icon {
      position: absolute;
      display: inline-block;
      font-size: 16px;
      color: #8b9198;
      font-weight: bolder;
      right: 5px;
      top: 30px;
    }
    > .bottom-line {
      margin: auto;
      width: 80%;
      height: 1px;
      border-radius: 1px;
      background: #eeeeee;
    }
    .carousel-container {
      margin: 10px 0 -20px;
      // text-align: center;
      .carousel-item {
        text-align: left;
        display: flex;
        height: 50px;
        justify-content: center;
        font-size: 12px;
        line-height: 24px;
        // margin: 20px 0;
      }
    }
  }
}
</style>
