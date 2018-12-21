<template>
  <div class="swipe-poster-page">
    <div class="swipe-poster-item bg_img" :style="{backgroundImage:'url('+model.postersUrl+')'}">
      <!-- <div class="content-box bg_img" :style="{backgroundImage:'url('+backImg+')'}"> -->
      <div class="content-box bg_img" :style="{backgroundImage:'url('+backImg+')'}">
        <div class="box-top">
          <ul>
            <li>{{model.posterDescribe}}</li>
            <li>{{model.linkerName}}</li>
            <li>价格：{{model.linkerPrice}}{{model.priceUnit}}</li>
          </ul>
          <div class="QRcode">
            <img class="qrcode-view" :src="model.qrCode">
            <span>长按识别更多</span>
          </div>
        </div>
        <div class="box-bottom">
          <div class="message">
            <img class="header-view" :src="model.avatarMediaid">
            <div class="name">
              <p>{{model.agentName}}</p>
              <p>{{model.agentMobile}}</p>
            </div>
          </div>
          <p class="company">授权开发商：{{model.developer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    backImg: require('IMG/marketDetail/back@2x.png')
  }),

  props: {
    model: Object,
    modelBgImg: ''
  }
}
</script>
<style lang="less">
.swipe-poster-page {
  margin-top: 20px;
  width: 375px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  > .swipe-poster-item {
    width: 240px;
    height: 387px;
    border-radius: 6px;
    position: relative;
    .content-box {
      position: absolute;
      border-radius: 0 0 6px 6px;
      bottom: 0px;
      width: 100%;
      height: 214px;
      .box-top {
        width: 100%;
        height: 129px;
        display: flex;
        ul {
          width: 129px;
          margin-left: 19px;
          margin-top: 49px;
          li:nth-child(1) {
            font-size: 23px;
            font-family: STSongti-SC-Bold;
            font-weight: bold;
            color: rgba(229, 179, 123, 1);
            line-height: 33px;
          }
          li:nth-child(2) {
            font-size: 11px;
            font-family: STSongti-SC-Regular;
            font-weight: 400;
            color: rgba(229, 179, 123, 1);
            line-height: 16px;
            margin: 3px 0 7px 0;
          }
          li:nth-child(3) {
            font-size: 9px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(229, 179, 123, 1);
            line-height: 13px;
          }
        }
        .QRcode {
          display: flex;
          flex-direction: column;
          margin-top: 19px;
          margin-left: 22px;
          align-content: center;

          .qrcode-view {
            margin-bottom: 7px;
            width: 58px;
            height: 58px;
            border-radius: 50%;
          }
          span {
            font-size: 7px;
            color: rgba(255, 255, 255, 1);
            line-height: 10px;
          }
        }
      }
      .box-bottom {
        display: flex;
        flex-direction: column;
        .message {
          margin: 21px 0 11px 19px;
          display: flex;
          .header-view {
            width: 29px;
            height: 29px;
            border-radius: 50%;
          }
          .name {
            p {
              transform: scale(0.84);
              font-size: 12px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(164, 184, 213, 1);
              line-height: 13px;
            }
          }
        }
        .company {
          margin-left: 19px;
          font-size: 12px;
          transform: scale(0.67);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(164, 184, 213, 1);
          line-height: 11px;
        }
      }
    }
  }
}
</style>
