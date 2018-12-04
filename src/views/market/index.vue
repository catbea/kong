<template>
  <div class="market-page">
    <div class="header">
      <div class="search-box">
        <van-search :obj="searchContent"></van-search>
        <div class="a" :style="{'background':'url(' + locationIcon + ')','background-size':'contain'}"></div>
      </div>
      <screen v-model="filter" :height="containerHeight"></screen>
      <already-open :agentIdInfo="agentIdInfo"></already-open>
    </div>
    <div class="all-market">
      <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="itemInfo" @skipDetail="skipDetail" :borderBottom="borderBottom"></market-describe>
    </div>
  </div>
</template>
<script>
import VanSearch from 'COMP/VanSearch'
import Screen from 'COMP/Screen/'
import MarketDescribe from 'COMP/MarketDescribe/'
import TitleBar from 'COMP/TitleBar/'
import AlreadyOpen from 'COMP/Market/AlreadyOpen/'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    VanSearch,
    Screen,
    MarketDescribe,
    TitleBar,
    AlreadyOpen
  },
  data: () => ({
    filter: null,
    itemInfo: {
      linkerTags: ["热销中", "地铁房", "学区好房"]
    },
    searchContent: {
      siteText: '深圳',
      placeholderText: '请输入平台名称'
    },
    value: '',
    locationIcon: require('IMG/market/juxing.png'),
    agentIdInfo: null,
    resInfo: null,
    borderBottom: true,
    containerHeight:'0'
  }),
  created () {
    this.getMarketDescribeInfo()
    this.getBrokerInfo()
  },
  mounted () {
    this.containerHeight = (document.body.offsetHeight
      - document.getElementsByClassName('search-box')[0].offsetHeight
      - document.getElementsByClassName('screen-container')[0].offsetHeight
      - document.getElementsByClassName('tabbar')[0].offsetHeight) / 37.5 + 'rem'
  },
  methods: {
    onClickHandler () {
      this.$router.push('/market/inputSearch')
    },
    async getMarketDescribeInfo () {
      const res = await marketService.getMarketDescribe(705)
      console.log(res)
      console.log(res.size)
      this.resInfo = res.size
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
