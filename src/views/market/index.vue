<template>
  <div class="market-page">
    <div class="header">
      <div class="search-box">
        <search></search>
        <div class="a"></div>
      </div>
      <screen></screen>
    </div>
    <div class="all-market">
      <div class="inform-box">
        <div class="inform">
          <div class="have-opened">
            已开通16个楼盘
          </div>
          <div class="my-market">
            我的楼盘
          </div>
          <van-icon name="arrow" color="rgba(234,77,46,1)" size="7px 12px" />
        </div>
      </div>
      <div class="market-box" v-for="(item,index) in marketList" :key="index" @click="marketDetail">
        <div class="img">
          <div class="label">9.9折</div>
        </div>
        <div class="market-describe">
          <div class="market-name">
            华润城市花园
            <div class="dredge">开通</div>
          </div>
          <div class="site">南山 大冲</div>
          <condition :info="info"></condition>
          <div class="unit-price">
            <span>98000元/m2起</span>
            <span>45次开通</span>
          </div>
        </div>
        <div class="price">
          <span>佣</span>
          <span>1.56%+111111元/套</span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Condition from 'COMP/Condition/'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
export default {
  components: {
    Condition,
    Search,
    Screen
  },
  data: _ => ({
    info: [
      {text:'即将发售',textColor:'rgba(234,77,46,1)', backColor:'rgba(234,77,46,0.1)'},
      {text:'地铁房',textColor:'rgba(92,95,102,1)', backColor:'rgba(143,159,177,0.15)'},
      {text:'高端社区',textColor:'rgba(92,95,102,1)', backColor:'rgba(143,159,177,0.15)'},
      {text:'商务区',textColor:'rgba(92,95,102,1)', backColor:'rgba(143,159,177,0.15)'}
    ],
    marketList: [1, 2, 3, 4]
  }),
  methods: {
    marketDetail () {
      this.$router.push("/marketDetail")
    }
  }
}
</script>

<style lang="less">
.market-page {
  width: 100%;
  height: 100%;
  .header {
    position: fixed;
    background: white;
    z-index: 11;
    .search-box {
      display: flex;
      width: 375px;
      height: 44px;
      border-bottom: solid 1px #dfdfdf;
      .a {
        width: 20px;
        height: 20px;
        border: 1px solid black;
        margin-top: 13px;
        margin-left: 14px;
      }
    }
  }
  .all-market {
    display: flex;
    flex-wrap: wrap;
    width: 375px;
    height: auto;
    position: relative;
    margin-top: 90px;
    z-index: 1;
    .inform-box {
      background: white;
      position: fixed;
      z-index: 111;
      width: 100%;
      .inform {
        display: flex;
        padding-top: 8px;
        width: 100%;
        height: 28px;
        background: rgba(234, 77, 46, 0.15);

        .have-opened {
          font-size: 14px;
          font-weight: 400;
          color: rgba(234, 77, 46, 1);
          margin-left: 16px;
        }
        .my-market {
          font-size: 14px;
          font-weight: 400;
          color: rgba(234, 77, 46, 1);
          margin-left: 176px;
        }
      }
    }
    .market-box {
      display: flex;
      flex-wrap: wrap;
      width: 359px;
      height: 153px;
      padding-top: 13px;
      padding-left: 16px;
      border-bottom: solid 0.02667rem #dfdfdf;
      .img {
        width: 120px;
        height: 90px;
        border-radius: 6px;
        border: 1px solid black;
        margin-right: 12px;
        position: relative;
        .label {
          position: absolute;
          left: -4px;
          top: 4px;
          width: 36px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: rgba(234, 77, 46, 1);
          font-size: 11px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
      .market-describe {
        flex: 1;
        height: 90px;
        .market-name {
          display: flex;
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        .dredge {
          width: 46px;
          height: 24px;
          background: rgba(0, 122, 230, 1);
          border-radius: 12px;
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: #fff;
          line-height: 24px;
          text-align: center;
          margin-left: 74px;
        }
        .site {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        .unit-price {
          display: flex;
          height: 15px;
          span:nth-child(1) {
            line-height: 15px;
            font-size: 15px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(234, 77, 46, 1);
          }
          span:nth-child(2) {
            line-height: 15px;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-left: 12px;
          }
        }
      }
      .price {
        span:nth-child(1) {
          display: inline-block;
          text-align: center;
          line-height: 16px;
          width: 16px;
          height: 16px;
          border-radius: 2px;
          border: 1px solid;
          font-size: 10px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(255, 85, 51, 1);
        }
        span:nth-child(2) {
          margin-left: 10px;
          font-size: 15px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
</style>