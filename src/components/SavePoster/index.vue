
<template>
  <div class="market-share-poster-page">
    <div
      class="swipe-poster-item bg_img"
      :style="{backgroundImage:'url(http://t1.27270.com/uploads/tu/201811/907/84695947e4.jpg)'}"
    >
      <div class="content-box bg_img" :style="{backgroundImage:'url('+backImg+')'}">
        <div class="box-top">
          <ul>
            <!-- <li>境墅高层</li> -->
            <li>{{buildingInfo.linkerName}}</li>
            <li>{{buildingInfo.linkerPrice}}{{buildingInfo.priceUnit}}</li>
          </ul>
          <div class="QRcode">
            <img class="qrcode-view" :src="buildingInfo.qrCode">
            <p>长按识别更多</p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="message">
            <img class="header-view" :src="buildingInfo.avatarMediaid">
            <div class="name">
              <p>{{buildingInfo.agentName}}</p>
              <p>{{buildingInfo.agentMobile}}</p>
            </div>
          </div>
          <p class="company">授权开发商：{{buildingInfo.developer}}</p>
        </div>
      </div>
    </div>
    <!-- <save-button></save-button> -->
  </div>
</template>
<script>
import SaveButton from './SaveButton'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'

export default {
  computed: {
    ...mapGetters(['buildId'])
  },

  components: {
    SaveButton
  },

  created() {
    this.getPosterInfo(this.buildId)
  },

  data: () => ({
    backImg: require('IMG/marketDetail/back@2x.png'),
    buildingInfo: {}
  }),

  methods: {
    async getPosterInfo(buildId) {
      const result = await marketService.shareBuildingCard(buildId)
      if (result) {
        this.buildingInfo = result
      }
    }
  }
}
</script>
<style lang="less">
.market-share-poster-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .swipe-poster-item {
    margin-top: 20px;
    width: 300px;
    height: 485px;
    border-radius: 6px;
    position: relative;
    .content-box {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-radius: 0 0 6px 6px;
      height: 217px;
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
            font-weight: bold;
            color: rgba(229, 179, 123, 1);
            line-height: 33px;
          }
          li:nth-child(2) {
            font-size: 16px;
            font-weight: 400;
            color: rgba(229, 179, 123, 1);
            line-height: 22px;
            margin: 3px 0 7px 0;
          }
          li:nth-child(3) {
            font-size: 9px;

            font-weight: 400;
            color: rgba(229, 179, 123, 1);
            line-height: 13px;
          }
        }
        .QRcode {
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          margin-left: 60px;
          .qrcode-view {
            margin-bottom: 7px;
            width: 58px;
            height: 58px;
            border-radius: 50%;
          }
          p {
            font-size: 7px;

            font-weight: 400;
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

              font-weight: 600;
              color: rgba(164, 184, 213, 1);
              line-height: 13px;
            }
          }
        }
        .company {
          font-size: 12px;
          transform: scale(0.67);

          font-weight: 400;
          color: rgba(164, 184, 213, 1);
          line-height: 11px;
        }
      }
    }
  }
}
</style>
