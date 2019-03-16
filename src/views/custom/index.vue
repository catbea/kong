<template>
  <div class="custom-page">
    <form action="/">
      <van-search class="search-container" v-model.trim="searchVal" placeholder="请输入客户名称" show-action @search="onSearchHandler" @click="onFocusHandler" background="#fff">
        <img src="../../assets/img/market/Group 3@2x.png" class="search-icon" slot="left-icon">
        <div slot="action" @click="onSortHandler">
          <i class="icon iconfont icon-Clientlist_screenin" :style="{color: activeIcon ? '#1989fa' : ''}"></i>
        </div>
      </van-search>
    </form>
    <!-- <div class="popup-container">

    </div>-->
    <div class="sort-container" v-show="sortShow" @click="sortHandle">
      <ul>
        <li class="van-hairline-bottom" :class="{active:pitch==='intention'}" @click="sortClickHandler('intention')">意向度排序</li>
        <li class="van-hairline-bottom" :class="{active:pitch==='createTime'}" @click="sortClickHandler('createTime')">
          时间排序
          <span>(按客户新增时间)</span>
        </li>
      </ul>
    </div>

    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" @click="onClick">
        <van-tab title="全部"></van-tab>
        <van-tab title="关注"></van-tab>
        <van-tab title="访客"></van-tab>
        <van-tab title="意向"></van-tab>
        <van-tab title="新增"></van-tab>
      </van-tabs>
    </div>
    <div class="list-continer">
      <van-list v-model="loading" :finished="currentData.finished" @load="onLoad" v-if="currentData.haveData">
        <my-custom-item v-for="(item,index) in currentData.list" :key="index" :info="item" :num="index" @click="itemClickHandler" @delete="itemDelete"></my-custom-item>
      </van-list>
      <div v-if="!currentData.haveData">
        <null :nullIcon="nullIcon" :nullcontent="nullcontent"></null>
      </div>
    </div>
    <custom-activity @click="goactivitDetaily" v-show="Linkerok"></custom-activity>
    <div class="delCoustomerGuide" @click="hideGuide" v-show="showGuide">
      <img src="../../assets/img/custom/guide.png" alt="">
    </div>
  </div>
</template>
<script>
import MyCustomItem from 'COMP/Custom/MyCustomItem'
import CustomActivity from 'COMP/Custom/CustomActivity'
import Null from 'COMP/Null'
import CustomService from 'SERVICE/customService'
import marketService from 'SERVICE/marketService'
import commonService from 'SERVICE/commonService'
import { mapGetters } from 'vuex'
export default {
  components: {
    Null,
    MyCustomItem,
    CustomActivity
  },
  data: () => ({
    activeIndex: 0,
    nullIcon: require('IMG/user/empty_custom@2x.png'),
    nullcontent: '未找到客户，快去分享你的名片吧!',
    data: {
      0: { finished: false, list: [], page: 1, haveData: true },
      1: { finished: false, list: [], page: 1, haveData: true },
      2: { finished: false, list: [], page: 1, haveData: true },
      3: { finished: false, list: [], page: 1, haveData: true },
      4: { finished: false, list: [], page: 1, haveData: true }
    },
    loading: false,
    pageSize: 10,
    searchVal: '',
    sortShow: false,
    sort: 'intention', // intention：意向度（默认选项）， createTime：时间
    activeIcon: false,
    pitch: false,
    Linkerok: false,
    showGuide: false // 显示引导
  }),
  created () {
    // let showDeleteGuide = window.localStorage.getItem('showDeleteGuide')
    // if (!showDeleteGuide) {
    //   this.showGuide = true
    // }
    this.showGuide = this.userInfo.delClientFlag !== 1
  },
  mounted() {
    this.getLinker()
    document.querySelector('.sort-container').addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault()
      },
      { passive: false }
    )
   document.querySelector('.delCoustomerGuide').addEventListener('touchmove', (e) => {
      e.preventDefault()
    }, { passive: false })
  },
  methods: {
    // 更新新手引导标志位
    updateUserExpandInfo() {
      commonService.updateUserExpandInfo({delClientFlag: 1})
      let data = Object.assign({}, this.userInfo, { delClientFlag: 1})
      this.$store.commit(types.USER_INFO, data)
    },
    goactivitDetaily() {
      this.$router.push('/custom/message/activityDetail')
    },
    onSearchHandler() {
      this.currentData.page = 1
      this.onLoad()
    },
    sortHandle() {
      this.sortShow = false
    },
    onSortHandler() {
      this.sortShow = !this.sortShow
    },
    onFocusHandler() {},
    // 排序切换
    sortClickHandler(val) {
      this.activeIcon = true
      this.sortShow = false
      this.sort = val
      this.pitch = val
      this.cleanCurrentData()
      this.onLoad()
    },
    cleanCurrentData() {
      this.currentData.page = 1
      this.currentData.list = []
    },
    /**
     * 切换tab方法
     */
    onClick() {
      this.cleanCurrentData()
      this.onLoad()
    },
    async onLoad() {
      // this.loading = true
      const result = await CustomService[this.getServeceFunc()](this.searchVal, this.currentData.page, this.pageSize, this.sort)
      if (this.currentData.page > 1) {
        this.currentData.list = this.currentData.list.concat(result.records)
      } else {
        this.currentData.list = result.records
      }
      if (this.currentData.list.length > 0) {
        this.currentData.haveData = true
      } else {
        this.currentData.haveData = false
      }
      this.loading = false
      if (result.pages <= this.currentData.page) {
        this.currentData.finished = true
      } else {
        this.currentData.finished = false
        this.currentData.page++
      }
    },
    async getLinker() {
      const res = await CustomService.getLinker()
      this.Linkerok = res
      if (this.Linkerok != '') {
        this.Linkerok = true
      } else {
        this.Linkerok = false
      }
    },

    // 获取当前serviec处理方法
    getServeceFunc() {
      switch (this.activeIndex) {
        case 0:
          return 'getCustomerAll'
        case 1:
          return 'getCustomerFollow'
        case 2:
          return 'getCustomerVisitor'
        case 3:
          return 'getCustomerIntention'
        case 4:
          return 'getCustomerAdd'
      }
    },
    itemClickHandler(e) {
      this.$router.push(`/custom/${e.clientId}`)
    },

    // 删除客户
    async itemDelete (index) {
      let item = this.currentData.list[index]
      let result = await CustomService.deleteCustomer({clientId: item.clientId, clientDelFlag: 2})
      this.currentData.list.splice(index, 1)
      this.$toast('删除成功！')
    },
    // 隐藏引导页面
    hideGuide () {
      this.showGuide = false
      this.updateUserExpandInfo()
      // window.localStorage.setItem('showDeleteGuide', true)
    },
    touchHandler(e) {
      return e.preventDefault()
    }
  },
  watch: {
    sortShow(val) {
      if (val) {
        document.removeEventListener('touchmove', this.touchHandler, false)
        document.getElementsByClassName('router-view')[0].style.overflowY = 'hidden' // 兼容pc测试
      } else {
        document.addEventListener('touchmove', null)
        document.getElementsByClassName('router-view')[0].style.overflowY = 'auto' // 兼容pc测试
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    currentData() {
      return this.data[this.activeIndex]
    }
  },
  beforeDestroy() {
    try {
      document.querySelector('.sort-container').removeEventListener('touchmove')
      document.removeEventListener('touchmove')
      document.querySelector('.delCoustomerGuide').removeEventListener('touchmove')
    } catch (error) {}
  }
}
</script>
<style lang="less">
.custom-page {
  position: relative;
  > .search-container {
    .van-field__body {
      height: 100%;
    }
    .van-field__control {
      // height: 100%;
      border: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      resize: none;
      display: block;
      color: #323233;
      box-sizing: border-box;
      background-color: transparent;
      line-height: 24px !important;
    }
  }
  .van-field__body {
    height: 100%;
  }
  .van-field__control {
    // height: 100%;
    line-height: 24px !important;
  }
  .van-cell {
    background-color: #f5f5f5;
    line-height: 0;
  }
  .search-icon {
    width: 24px;
    height: 24px;
  }
  > .sort-container {
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 45px;
    width: 100%;
    // background: #fff;
    // margin: 0 15px;
    z-index: 100;
    li {
      color: #333;
      padding: 0 15px;
      background: #fff;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      box-shadow: inset 0px -1px 1px -1px #c8c7cc;
    }
    .active {
      color: #1989fa;
    }
    span {
      color: #999;
    }
  }
  .delCoustomerGuide{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    background-color: #4c4c4c;
    z-index: 999;
  }
}
</style>
