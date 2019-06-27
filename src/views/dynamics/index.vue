<template>
  <div class="dynamics-page">
    <Skeleton v-show="!collectData" showSkeleton='1' />
    <div class="dynamics-top-container">
      <dynamics-collect :data="collectData" @click="goMessageInfo"/>
      <!-- <estate-recommend v-if="recommendData" :info="recommendData" @click="goRecommendInfo"/> -->
    </div>
    <div class="todo-box" @click="goTodoList">
      <div class="todo-list">
        <div class="info">
          <div class="icon">
            <img src="../../assets/img/dynamics/todo.png" alt="">
          </div>
          <div class="text">
            <b>今日待办</b>
            <p>您今日还有{{incompleteNum}}件待办事项</p>
            <!-- <p v-else>已完成所有的待办任务</p> -->
          </div>
        </div>
      <div class="action">
        <span class="dot" v-show="incompleteNum"></span>
        <img src="../../assets/img/dynamics/arrow.png" alt="">
      </div>
    </div>
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
import { parseTime } from '@/utils/tool';
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
    guidanceConf: null,
    incompleteNum: ''
  }),
  created() {
    // this.shiftHandle()//提示被移出分销商弹窗
    // let timeStamp = window.localStorage.getItem('timeStamp') || ''
    // this.queryVersion('2', timeStamp)
    this.getCollectInfo()
    this.getEstateList()
    this.queryIncompleteNum()
    // 30s自动刷新数据
    this.timer = setInterval(() => {
      this.getCollectInfo()
    }, 30000)
  },
  methods: {
    // 经纪人未完成任务数量
    queryIncompleteNum () {
      dynamicsService.queryIncompleteNum({}).then(res => {
        this.incompleteNum = res.incompleteNum || 0
      }).catch()
    },
    // 跳转待办事项
    goTodoList () {
      this.$router.push('/dynamics/todoList')
    },
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

<style lang="less" scoped>
.dynamics-page{
  .todo-box{
    background-color: #fff;
    // border-bottom: 1px solid #f7f9fa;
    padding: 0 16px 20px 16px;
    margin-top: -10px;
    .todo-list{
      height: 80px;
      border-radius: 10px;
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow:0px 0px 12px 0px rgba(0,20,38,0.1);
      font-size: 12px;
      display: flex;
    .info{
      flex: 1;
      display: flex;
      align-items: center;
      .icon{
        display: flex;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
          margin: 0 5px 0 12px;
        }
      }
      .text{
        b{
          font-size: 16px;
          margin-bottom: 4px;
          display: block;
        }
        p{
          color: #8A9299;
        }
      }
    }
    .action{
      width: 40px;
      height: 80px;
      line-height: 80px;
      display: flex;
      align-items: center;
      .dot{
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #EA4D2E;
        border-radius: 50%;
      }
      img{
        width: 16px;
        height: 16px;
      }
    }
  }
  }
  
}
</style>

<style lang="less">
.dynamics-page {
  background: #f7f9fa;
  .dynamics-top-container {
    background: #fff;
    padding-bottom: 10px;
  }
  .list-container {
    background: #fff;
    margin-top: 8px;
    padding-top: 5px;
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
