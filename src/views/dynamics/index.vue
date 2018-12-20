<template>
  <div class="dynamics-page">
    <div class="dynamics-top-container">
      <dynamics-collect :data="collectData" @click="goMessageInfo"/>
      <estate-recommend v-if="recommendData" :info="recommendData" @click="goRecommendInfo"/>
    </div>
    <div class="list-container">
      <my-estate-list :list="estateListData" @click="goRecommendInfo" @share="shareHandler"/>
    </div>
  </div>
</template>
<script>
import DynamicsCollect from 'COMP/Dynamics/DynamicsCollect'
import EstateRecommend from 'COMP/Dynamics/EstateRecommend'
import MyEstateList from 'COMP/Dynamics/MyEstateList'
import CommonService from 'SERVICE/commonService'
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
    estateListData: null, // 我的楼盘数据
    timer: null
  }),
  created() {
    let timeStamp = window.localStorage.getItem('timeStamp') || ''
    this.queryVersion('2', timeStamp)
    this.getCollectInfo()
    this.getEstateList()
    // 30s自动刷新数据
    this.timer = setInterval(() => {
      this.getCollectInfo()
    }, 30000)
  },
  methods: {
    //动态详情
    async goMessageInfo(num) {
      console.log('num.customerCount.val', num.customerCount)
      console.log('num.businessCardViews.val', num.businessCardViews)
      console.log('num.estateViews.val', num.estateViews)
      if (num.customerCount != 0 || num.businessCardViews != 0 || num.estateViews != 0) {
        // this.$router.push({ name: 'allDynamics', params: { customerCount: num.customerCount, businessCardViews: num.businessCardViews, estateViews: num.estateViews } })
        this.$router.push({ path: '/dynamics/allDynamics', query: { customerCount: num.customerCount, businessCardViews: num.businessCardViews, estateViews: num.estateViews } })
      }
    },
    //楼盘详情
    async goRecommendInfo(val) {
      this.$router.push('/market/' + val.linkerId)
    },
    async getCollectInfo() {
      const res = await dynamicsService.getDynamicsCollect()
      // 数据中心部分 数据拼装
      this.collectData = {
        newMsg: res.unreadMessageCount,
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

      for (let i = 0; i < this.estateListData.length; i++) {
        if (this.estateListData.saleStatus === 0) {
          this.estateListData[i].linkerTags.unshift('热销中')
        }
        if (this.estateListData.saleStatus === 1) {
          this.estateListData[i].linkerTags.unshift('即将发售')
        }
        if (this.estateListData.saleStatus === 3) {
          this.estateListData[i].linkerTags.unshift('售罄')
        }
      }

      for (let temp of this.estateListData) {
        temp.headImgUrl = temp.linkerHeadUrl
      }

      this.recommendData = res.aiLinkerVO
    },
    async queryVersion(type, timeStamp) {
      const res = await CommonService.queryVersion(type, timeStamp)
      if (res !== '') {
        timeStamp = res.publishStamp
        window.localStorage.setItem('timeStamp', timeStamp)
      }
    },
    shareHandler(info) {
      // this.$router.push({name: 'market-share', params: {id: info.linkerId}})
      this.$router.push({ name: 'marketDetail-share' })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
    padding-bottom: 15px;
  }
  .list-container {
    background: #fff;
    margin-top: 15px;
  }
}
</style>
