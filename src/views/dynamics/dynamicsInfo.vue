<template>
  <div class="dynamicsInfo-page">
    <shadow-box>
      <div slot="container">
        <div class="dynamicsInfo-list">

          <div class="dynamicsInfo-list-top">
            <span class="dynamicsInfo-list-left">
              <img :src="backIcon" class="mark-icon">
            </span>
            <span class="dynamicsInfo-list-right">
              <p class="list-right-title">万科臻湾汇
                <!-- <span class="left-title-right">续费</span> -->
                <span class="left-title-right-open">开通</span>
              </p>
              <p class="list-right-time">南山 深圳湾 | 11/2到期</p>
              <p class="list-right-label">
                <span class="right-label-red">即将发售</span>
                <span class="right-label-gray">地铁房</span>
              </p>
              <p class="list-right-price">
                98000元/㎡
                <span class="right-price-text">起</span>
                <span class="right-price-open">43次开通</span>
              </p>
            </span>
          </div>

          <div class="dynamicsInfo-list-commission">
            <span class="list-commission-word">佣</span>
            1.056%+50000元/套
          </div>

        </div>

        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>
    <dynamics-list></dynamics-list>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
export default {
  components: {
    ShadowBox,
    DynamicsData,
    DynamicsList
  },
  data () {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
      totalTitle: '楼盘数量',
      totalNum: '90',
      cardTitle: '楼盘分享',
      cardNum: '0',
      propertiesTitle: '楼盘访客',
      propertiesNum: "190",
      articleTitle: '平均停留(S)',
      articleNum: '124',

    }
  },
}
</script>
<style lang="less">
.dynamicsInfo-page {
  margin: 16px 0;
  .dynamicsInfo-list {
    margin: 0 15px;

    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0 16px 0;
    > .dynamicsInfo-list-top {
      display: flex;
      > .dynamicsInfo-list-left {
        height: 90px;
        position: relative;
        border-radius: 6px;
        > .mark-icon {
          width: 120px;
          height: 90px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
        }
      }
      > .dynamicsInfo-list-right {
        border-radius: 6px;
        margin-left: 12px;

        > .list-right-title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          > .left-title-right {
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 122, 230, 1);
            line-height: 27px;
            border-radius: 12px;
            border: 1px solid;
            width: 46px;
            height: 24px;
            right: 15px;
            position: absolute;
            text-align: center;
          }
          > .left-title-right-open {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 27px;
            width: 46px;
            height: 24px;
            background: rgba(0, 122, 230, 1);
            border-radius: 12px;
            border: 1px solid;
            right: 31px;
             position: absolute;
            text-align: center;
          }
        }
        > .list-right-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        > .list-right-label {
          line-height: 15px;
          > .right-label-red {
            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(234, 77, 46, 1);
            line-height: 10px;
            padding: 3px 5px;
            background: rgba(234, 77, 46, 0.1);
            border-radius: 2px;
          }
          > .right-label-gray {
            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(92, 95, 102, 1);
            line-height: 10px;
            background: rgba(143, 159, 177, 0.15);
            border-radius: 3px;
            padding: 3px 5px;
          }
        }
        > .list-right-price {
          font-size: 15px;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          line-height: 45px;
          > .right-price-text {
            font-size: 12px;
          }
          > .right-price-open {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 11px;
            padding-left: 12px;
          }
        }
      }
    }

    > .dynamicsInfo-list-commission {
      height: 31px;
      background: rgba(247, 249, 250, 1);
      border-radius: 4px;
      font-size: 15px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      padding-left: 11px;
      > .list-commission-word {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        border: 1px solid;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 85, 51, 1);
        line-height: 14px;
      }
    }
  }
}
</style>
