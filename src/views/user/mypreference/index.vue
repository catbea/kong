<template>
  <div class="my-preference-page">
    <div class="my-preference-header">
      <van-search :obj="searchInfo"></van-search>
      <screen></screen>
    </div>
    <div class="market-box">
      <vip-market v-for="(item,index) in dataArr" :key="index" :dataArr="item"></vip-market>
      
    </div>
    <div class="check-all-box">
      <div class="img-box">
      <span class="icon-wait bg_img" :style="{backgroundImage:'url('+waitImg+')'}"></span>
     待选楼盘 (8/10)
      </div>
      <router-link tag="p" to="/user/mypreference/openPreference" class="check-all-button">开通</router-link>
    </div>
  </div>
</template>
<script>
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import VipMarket from './VipMarket.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    VanSearch,
    Screen,
    VipMarket
  },
  data: () => ({
    waitImg: require('IMG/user/alreadyBuy/wait@2x.png'),
    searchInfo: {
      siteText: '全国',
      placeholderText: '请输入楼盘'
    },
    dataArr: [
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通', price: '1%+5万元/套' },
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通', price: '1%+5万元/套' },
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通', price: '1%+5万元/套' },
      { title: '龙光·久钻', site: '深圳 南山 120000元/㎡', condition: ['热销中', '地铁房', '低密度'], open: '125次开通', price: '1%+5万元/套' }
    ]
  }),
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
  methods: {}
}
</script>
<style lang="less">
.my-preference-page {
  .my-preference-header {
    width: 100%;
    position: fixed;
    background: rgba(255, 255, 255, 1);
    z-index: 11;
    padding-top: 6px;
    .van-search-page {
      margin-left: 15px;
    }
  }
  .market-box {
    margin: 74px 0 0px 0px;
    .meal-market-page {
      .meal-market-page-box {
        margin-left: 16px;
        margin-top: 16px;
      }
    }
  }
  .report-confirm {
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    p {
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid rgba(0, 122, 230, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      text-align: center;
      line-height: 30px;
    }
  }
  .check-all-box {
    background: rgba(255, 255, 255, 1);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    .img-box {
      display: flex;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .icon-wait {
      width: 20px;
      height: 17px;
      // margin: 0 5px 0 16px;
    }
    .check-all-button {
      margin-right: 32px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
