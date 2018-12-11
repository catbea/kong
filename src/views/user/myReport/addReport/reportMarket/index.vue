<template>
  <div class="my-preference-page">
    <div class="my-preference-header">
      <van-search :obj="searchInfo"></van-search>
      <screen></screen>
    </div>
    <div class="market-box">
      <meal-market
        v-for="(item,index) in dataArr"
        :key="index"
        :dataArr="item"
        :indexData="index"
        :checkData="checkData"
        @click.native="selectHandle(index)"
      ></meal-market>
    </div>
    <div class="report-confirm"  @click="onSureHandler">
      <p>确定</p>
    </div>
  </div>
</template>
<script>
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    VanSearch,
    Screen,
    MealMarket
  },
  created() {},
  data: () => ({
    type: null,
    checkIndex: -1,
    checkData: null,
    dataArrLength: null,
    showArr: [],
    searchInfo: {
      siteText: '全国',
      placeholderText: '请输入楼盘'
    },
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    checkShow: false,
    dataArr: [
      {
        linkerName: '龙光·久钻',
        site: '深圳 南山 120000元/㎡',
        condition: ['热销中', '地铁房', '低密度'],
        open: '125次开通',
        price: '1%+5万元/套'
      },
      {
        linkerName: '龙光·久钻',
        site: '深圳 南山 120000元/㎡',
        condition: ['热销中', '地铁房', '低密度'],
        open: '125次开通',
        price: '1%+5万元/套'
      },
      {
        linkerName: '龙光·久钻',
        site: '深圳 南山 120000元/㎡',
        condition: ['热销中', '地铁房', '低密度'],
        open: '125次开通',
        price: '1%+5万元/套'
      },
      {
        linkerName: '龙光·久钻',
        site: '深圳 南山 120000元/㎡',
        condition: ['热销中', '地铁房', '低密度'],
        open: '125次开通',
        price: '1%+5万元/套'
      }
    ]
  }),
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
  methods: {
    selectHandle(index) {
      this.checkData = index
    },
    /**
     * 报备选择楼盘确定
     */
    onSureHandler() {
      if (this.checkIndex != -1) {
        var item = this.dataArr[this.checkIndex]
        let _reportAddInfo = {
          linkerId: item.linkerId,
          linkerName: item.linkerName
        }
        this.$store.dispatch('reportAddInfo', Object.assign(this.reportAddInfo, _reportAddInfo))
        this.$router.back(-1)
      }
    }
  }
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
    margin: 74px 0 60px 16px;
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
