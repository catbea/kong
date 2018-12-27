<template>
  <div class="input-search-page">
    <div class="input-search-page-top">
    <form action="/">
  <van-search
    v-model="value"
    placeholder="碧桂园"
    show-action
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
<screen></screen>
</div>
<div class="history-show-box" v-if="true">
  <div class="input-search-page-middle">
    <p class="history-search">历史搜索</p>
    <span class="bg_img" :style="{backgroundImage:'url('+bucketImg+')'}"></span>
  </div>
  <ul class="input-search-page-bottom">
  <li v-for="(item,index) in list" :key="index">
    111111
  </li>
  </ul>
</div>
<empty></empty>
<div class="input-search-content">
   <ol>
     <li v-for="(item,index) in list" :key="index">
       <p>碧桂园·中央公馆</p>
       <p>南山区-蛇口 120000元/㎡</p>
     </li>
   </ol>
</div>
  <market-describe v-for="(item,index) in resInfo" :key="index" :itemInfo="item"></market-describe>
  </div>
</template>
<script>
import Screen from 'COMP/Screen/'
import Empty from './Empty'
import MarketDescribe from 'COMP/MarketDescribe/'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    Screen,
    MarketDescribe,
    Empty
  },
  created() {
    this.getMarketDescribeInfo(current)
  },
  data: () => ({
    value: '',
    list: [1, 2, 3, 4, 5, 6, 7],
    resInfo: null,
    bucketImg: require('IMG/marketDetail/bucket@2x.png'),
    current: 1
  }),
  methods: {
    onCancel() {
      this.value = ''
    },
    onSearch() {
      console.log(1111)
    },
    submit() {
      console.log(1111)
    },
    async getMarketDescribeInfo(current) {
      const res = await marketService.getMarketDescribe(current)
      this.resInfo = res.records
    }
  }
}
</script>
<style lang="less">
.input-search-page {
  .input-search-page-top {
    padding-left: 15px;
    position: fixed;
    background: #ffffff;
    z-index: 1;
    .van-search {
      margin: 7px 0 0 0px;
      padding: 0;
      width: 360px;
      border-radius: 6px;
      > .van-cell {
        background: #f5f5f5;
        height: 30px;
        width: 283px;
        > .van-cell__value {
          > .van-field__body {
            input {
              line-height: 24px;
            }
          }
        }
        > .van-cell__left-icon {
        }
      }
      > .van-search__action {
        background: #ffffff;
      }
    }
  }
  .history-show-box {
    margin-top: 100px;
    margin-left: 15px;
    > .input-search-page-middle {
      display: flex;
      width: 337px;
      justify-content: space-between;
      align-items: center;
      > .history-search {
        font-size: 18px;
        
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 27px;
      }
      span {
        width: 16px;
        height: 16px;
      }
    }
  }

  .input-search-page-bottom {
    display: flex;
    flex-wrap: wrap;
    width: 336px;

    li {
      margin: 16px 30px 16px 0;
      font-size: 14px;
      
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 21px;
    }
  }
  .input-search-content {
    margin-left: 15px;
    margin-top: 37px;
    ol {
      li {
        padding: 12px 0 12px 0;
        border-bottom: 1px solid #eeeeee;
        p:nth-child(1) {
          font-size: 16px;
          
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          margin-bottom: 3px;
        }
        p:nth-child(2) {
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
      }
    }
  }
}
</style>
