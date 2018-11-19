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
<market-describe v-for="(item,index) in describeInfo" :key="index" :dredgeFlag="item.dredgeFlag" 
      :borderBottom="item.borderBottom" @skipDetail="skipDetail"></market-describe>
    </div>
  </div>
</template>
<script>
import Condition from 'COMP/Condition/'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import MarketDescribe from 'COMP/MarketDescribe/'
export default {
  components: {
    Condition,
    Search,
    Screen,
    MarketDescribe
  },
  data: _ => ({
    describeInfo: [
      { dredgeFlag: true, borderBottom: true },
      { dredgeFlag: false, borderBottom: false },
      { dredgeFlag: true, borderBottom: false },
      { dredgeFlag: true, borderBottom: true }
    ],
    info: [
      {
        text: '即将发售',
        textColor: 'rgba(234,77,46,1)',
        backColor: 'rgba(234,77,46,0.1)'
      },
      {
        text: '地铁房',
        textColor: 'rgba(92,95,102,1)',
        backColor: 'rgba(143,159,177,0.15)'
      },
      {
        text: '高端社区',
        textColor: 'rgba(92,95,102,1)',
        backColor: 'rgba(143,159,177,0.15)'
      },
      {
        text: '商务区',
        textColor: 'rgba(92,95,102,1)',
        backColor: 'rgba(143,159,177,0.15)'
      }
    ],
    marketList: [1, 2, 3, 4]
  }),
  methods: {
    skipDetail(n) {
      if (n == 1) {
        this.$router.push({ path: `/market/marketDetail/${this.userId}` })
        console.log(n)
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
  }
}
</style>
