<template>
  <div class="dynamics-page">
    <div class="dynamics-top-container">
      <dynamics-collect :data="collectData" @click="goMessageInfo"/>
      <estate-recommend v-if="recommendData" :info="recommendData" @click="goRecommendInfo"/>
    </div>
    <div class="list-container" v-if="estateListData&&estateListData.length>0">
      <my-estate-list :list="estateListData" @click="goRecommendInfo" @share="shareHandler"/>
    </div>
    <div class="list-container" v-if="hotEstateListData&&hotEstateListData.length>0">
      <hot-estate-list :list="hotEstateListData" @click="goRecommendInfo" @open="openHandler"/>
    </div>
    <open-market :show.sync="guidanceShow" :conf="guidanceConf"></open-market>
  </div>
</template>

<script>
import DynamicsCollect from 'COMP/Dynamics/DynamicsCollect'
import EstateRecommend from 'COMP/Dynamics/EstateRecommend'
import MyEstateList from 'COMP/Dynamics/MyEstateList'
import HotEstateList from 'COMP/Dynamics/HotEstateList'
import OpenMarket from 'COMP//Guidance/OpenMarket'
import CommonService from 'SERVICE/commonService'
import dynamicsService from 'SERVICE/dynamicsService'
import isEmpty from 'lodash/isEmpty'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    DynamicsCollect,
    EstateRecommend,
    MyEstateList,
    HotEstateList,
    OpenMarket
  },
  data: () => ({
    collectData: null, // 数据中心数据
    recommendData: null, // 推荐盘数据
    estateListData: null, // 我的楼盘数据
    hotEstateListData: null, // 热门楼盘数据
    timer: null,
    guidanceShow: false,
    guidanceConf: null
  }),
  created() {
    // this.shiftHandle()//提示被移出分销商弹窗
    // let timeStamp = window.localStorage.getItem('timeStamp') || ''
    // this.queryVersion('2', timeStamp)
    this.getCollectInfo()
    this.getEstateList()
    // 30s自动刷新数据
    this.timer = setInterval(() => {
      this.getCollectInfo()
    }, 30000)
  },
  methods: {
    shiftHandle() {
      this.$dialog
        .alert({
          title: '您被移出原有分销平台',
          message: '请重新添加主营区域分销商及所属机构',
          className: 'shiftOut'
        })
        .then(() => {
          this.$router.push({ name: 'user-edit' })
        })
    },
    //动态详情
    async goMessageInfo(num) {
      if (num.customerCount != 0 || num.businessCardViews != 0 || num.estateViews != 0) {
        this.$router.push({
          path: '/dynamics/allDynamics',
          query: { customerCount: num.customerCount, businessCardViews: num.businessCardViews, estateViews: num.estateViews, articleCount: num.articleCount, allDynamicsNum: num.allDynamicsNum }
        })
      } else {
        this.$dialog.alert({
          title: '暂无任何动态',
          message: '您还没有任何动态信息，请开通楼盘分享后再次尝试'
        })
      }
    },
    //楼盘详情
    async goRecommendInfo(val) {
      if (val.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        this.$router.push('/market/' + val.linkerId)
      }
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
        articleCount: {
          val: res.scanArticleCount,
          change: res.unreadScanArticleCount
        },
        simpleDynamic: res.simpleDynamicVOs
      }
    },
    async getEstateList() {
      const res = await dynamicsService.getEstateInfo()
      this.estateListData = res.myLinkerVOs

      if (this.estateListData) {
        for (let i = 0; i < this.estateListData.length; i++) {
          if (this.estateListData[i].linkerTags.length >= 3) {
            if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.pop()

            if (this.estateListData[i].saleStatus === 0) {
              if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.unshift('热销中')
            }
            if (this.estateListData[i].saleStatus === 1) {
              if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.unshift('即将发售')
            }
            if (this.estateListData[i].saleStatus === 3) {
              if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.unshift('售罄')
            }
          } else {
            if (this.estateListData[i].saleStatus === 0) {
              if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.unshift('热销中')
            }
            if (this.estateListData[i].saleStatus === 1) {
              if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.unshift('即将发售')
            }
            if (this.estateListData[i].saleStatus === 3) {
              if (this.estateListData[i].linkerTags) this.estateListData[i].linkerTags.unshift('售罄')
            }
          }
        }
        for (let temp of this.estateListData) {
          temp.headImgUrl = temp.linkerHeadUrl
        }
      }
      this.hotEstateListData = res.hotLinkerVOs
      for (let i = 0; i < this.hotEstateListData.length; i++) {
        const element = this.hotEstateListData[i]
        element.openStatus = '0'
      }
      for (let i = 0; i < this.hotEstateListData.length; i++) {
        let temp = this.hotEstateListData[i]
        temp.linkerAddress = `${temp.city || ''}-${temp.district || ''}`
        this.$set(this.hotEstateListData, i, temp)
      }
      this.recommendData = res.aiLinkerVO
      if (this.userInfo.isOne && !this.userGuidance.dynamics) {
        this.guidanceConf = res.aiLinkerVO
        if(this.guidanceConf.linkerId) this.guidanceShow = true
      }
    },
    async queryVersion(type, timeStamp) {
      const res = await CommonService.queryVersion(type, timeStamp)
      if (res !== '') {
        timeStamp = res.publishStamp
        window.localStorage.setItem('timeStamp', timeStamp)
      }
    },
    shareHandler(info) {
      if (info.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      // } else if (isEmpty(this.userInfo.name) || isEmpty(this.userInfo.distributorName) || isEmpty(this.userInfo.majorCity) || isEmpty(this.userInfo.institutionName)) {
      } else if (isEmpty(this.userInfo.name) || isEmpty(this.userInfo.majorCity)) {
        this.$dialog
          .confirm({
            title: '您有未完善的信息',
            message: '信息不完整会影响传播效率哦',
            confirmButtonText: '去完善',
            className: 'marketShareHint'
          })
          .then(() => {
            this.$router.push({ name: 'user-edit' })
          })
      } else {
        this.$router.push({ name: 'market-poster', params: { id: info.linkerId } })
      }
    },
    openHandler(info) {
      this.$router.push({ name: 'marketDetail-open', params: { id: info.linkerId } })
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userGuidance'])
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less">
.dynamics-page {
  background: #f7f9fa;
  .dynamics-top-container {
    background: #fff;
    padding-bottom: 10px;
  }
  .list-container {
    background: #fff;
    margin-top: 10px;
  }
}
.renew-Dialog {
  width: 235px;
  border-radius: 10px;
  .van-dialog__header,
  .van-dialog__message--has-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding-top: 26px;
  }
}
</style>
