<template>
  <div class="swipe-poster-page">
    <div class="swipe-poster-item">
      <div
        class="content-box bg_img"
        :style="{backgroundImage:'url('+backImg+')'}"
      >
        <div class="box-top">
          <ul>
            <li>境墅高层</li>
            <li>碧桂园·十里银滩</li>
            <li>价格：58888元/㎡</li>
          </ul>
          <div class="QRcode">
            <span></span>
            <p>长按识别更多</p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="message">
            <span></span>
            <div class="name">
              <p>张杰柯</p>
              <p>18776586534</p>
            </div>
          </div>
          <p class="company">
            授权开发商：深圳万科地产集团有限公司
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    backImg: require('IMG/marketDetail/back@2x.png')
  })
}
</script>
<style lang="less">
.swipe-poster-page {
  margin-top: 20px;
  width: 375px;
  display: flex;
  justify-content: center;
  > .swipe-poster-item {
    width: 240px;
    height: 387px;
    border-radius: 0px 0px 6px 6px;
    border: 1px solid;
    position: relative;
    .content-box {
      position: absolute;
      bottom: -3px;
      width: 100%;
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
            font-family: STSongti-SC-Bold;
            font-weight: bold;
            color: rgba(229, 179, 123, 1);
            line-height: 33px;
          }
          li:nth-child(2) {
            font-size: 16px;
            font-family: STSongti-SC-Regular;
            font-weight: 400;
            color: rgba(229, 179, 123, 1);
            line-height: 22px;
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
          margin-left: 19px;
          span {
            margin-bottom: 7px;
            width: 58px;
            height: 58px;
          }
          p {
            font-size: 7px;
            font-family: PingFangSC-Regular;
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
          span {
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