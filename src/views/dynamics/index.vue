<template>
  <div class="dynamics-page">
    <div class="dynamics-top-container">
      <dynamics-collect :data="collectData" @click="goMessageInfo"></dynamics-collect>
      <estate-recommend :info="recommendData" @click="goRecommendInfo"></estate-recommend>
    </div>
    <div class="list-container">
      <my-estate-list :list="estateListData" @click="goRecommendInfo"></my-estate-list>
    </div>
  </div>
</template>
<script>
import DynamicsCollect from 'COMP/Dynamics/DynamicsCollect'
import EstateRecommend from 'COMP/Dynamics/EstateRecommend'
import MyEstateList from 'COMP/Dynamics/MyEstateList'
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  components: {
    DynamicsCollect,
    EstateRecommend,
    MyEstateList
  },
  data: () => ({
    collectData: null, // 数据中心数据
    recommendData: null, // 推荐盘数据
    estateListData: null // 我的楼盘数据
  }),
  created() {
    this.getCollectInfo()
    this.getEstateList()
  },
  methods: {
    //动态详情
    async goMessageInfo(num) {
      if (num.customerCount.val != 0 && num.businessCardViews.val != 0 && num.estateViews.val != 0) {
        this.$router.push({ name: 'allDynamics', params: { customerCount: num.customerCount.val, businessCardViews: num.businessCardViews.val, estateViews: num.estateViews.val } })
      }
    },
    //楼盘详情
    async goRecommendInfo(val) {
      console.log(val)
      this.$router.push('/market/marketDetail')
    },
    async getCollectInfo() {
      const res = await dynamicsService.getDynamicsCollect()
      // 数据中心部分 数据拼装
      this.collectData = {
        newMsg: res.unreadCustomerCount,
        customerCount: {
          val: res.customerCount,
          change: res.unreadCustomerCount
        },
        businessCardViews: {
          val: res.scanCardCount,
          change: res.unreadScanCardCount
        },
        estateViews: {
          val: res.scanLinkerCount,
          change: res.unreadScanLinkerCount
        },
        simpleDynamic: res.simpleDynamicVOs
      }
    },
    async getEstateList() {
      const res = await dynamicsService.getEstateInfo()
      this.estateListData = res.myLinkerVOs
      this.recommendData = res.aiLinkerVO
    }
  }
}
</script>
<style lang="less">
.dynamics-page {
  width: 100%;
  height: 100%;
  background: #f7f9fa;
  .dynamics-top-container {
    background: #fff;
    padding-bottom: 25px;
  }
  .list-container {
    background: #fff;
    margin-top: 15px;
  }
}
</style>
