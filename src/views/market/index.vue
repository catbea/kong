<template>
  <div class="market-page">
    <div class="header">
      <div class="search-box">
        <div class="search-box-content">
          <p>
            深圳
            <span :style="{'background':'url(' + defaultAvatar + ')','background-size':'contain'}"></span>
          </p>
          <form action="/">
            <van-search v-model="value" placeholder="请输入搜索关键词" @click="onClickHandler" />
          </form>
        </div>
        <div class="a" :style="{'background':'url(' + locationIcon + ')','background-size':'contain'}"></div>
      </div>
      <screen :functionList="functionList"></screen>
      <already-open :agentIdInfo="agentIdInfo"></already-open>
    </div>
    <div class="all-market">
      <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item" @skipDetail="skipDetail" :borderBottom="borderBottom"></market-describe>
    </div>
  </div>
</template>
<script>
import Screen from 'COMP/Screen/'
import MarketDescribe from 'COMP/MarketDescribe/'
import TitleBar from 'COMP/TitleBar/'
import AlreadyOpen from 'COMP/Market/AlreadyOpen/'
import marketService from 'SERVICE/marketService'
export default {
  created () { },
  components: {
    Screen,
    MarketDescribe,
    TitleBar,
    AlreadyOpen
  },
  data: () => ({
    value: '',
    defaultAvatar: require('IMG/market/list__arrow_@2x.png'),
    locationIcon: require('IMG/market/juxing.png'),
    functionList: null,
    agentIdInfo: null,
    resInfo: null,
    borderBottom: true
  }),
  created () {
    this.getMarketDescribeInfo()
    this.getBrokerInfo()
  },
  methods: {
    onClickHandler () {
      this.$router.push('/market/inputSearch')
    },
    async getMarketDescribeInfo () {
      const res = await marketService.getMarketDescribe()
      console.log(res.records)
      this.resInfo = res.records
    },
    async getBrokerInfo () {
      const res = await marketService.getBrokerMarket(1)
      console.log(res)
      this.agentIdInfo = res
    },
    skipDetail (n) {
      if (n == 1) {
        this.$router.push('/market/marketDetail')
      }
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
      justify-content: space-between;
      border-bottom: solid 1px #dfdfdf;
      .search-box-content {
        display: flex;
        background: rgba(245, 245, 245, 1);
        font-size: 13px;
        margin: 7px 0 7px 15px;
        width: 306px;
        border-radius: 4px;
        p {
          margin: 6px 0 0 16px;
          padding: 0 12px 0 0;
          display: flex;
          span {
            width: 16px;
            height: 16px;
            margin-top: 4px;
          }
        }
        .van-search {
          padding: 0;
        }
        .van-cell {
          background: rgba(245, 245, 245, 1);
          input {
            line-height: 24px;
          }
        }
      }
      .a {
        width: 20px;
        height: 20px;
        margin: 13px 14px 0 0;
      }
    }
  }
  .all-market {
    display: flex;
    flex-wrap: wrap;
    width: 375px;
    height: auto;
    position: relative;
    margin-top: 160px;
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
  }
}
</style>
