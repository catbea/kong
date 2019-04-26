<template>
  <div class="allDynamics-page">
    <div class="tab-container">
      <van-tabs v-model="active" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated @click="goList">
        <van-tab v-for="item in tabs" :key="item.index" :title="item.typeName"></van-tab>
      </van-tabs>
      <div class="data-container">
        <!-- 动态全部-->
        <div class="allDynamics-container" v-if="active === 0 ">
          <shadow-box>
            <div slot="container">
              <div class="allDynamics-container-titps" @click="govallDynamicsNum" v-show="showDynamics">新增 {{allDynamicsNum}} 浏览</div>
              <!-- active === 0? allDynamicCount :CardDynamicCount -->
              <dynamics-data :totalTitle="all.totalTitle" :cardTitle="all.cardTitle" :propertiesTitle="all.propertiesTitle" :articleTitle="all.articleTitle" :allDynamicCount="allDynamicCount"></dynamics-data>
            </div>
          </shadow-box>
          <van-list v-model="loading" @load="onLoad" :finished="finished" :finished-text="'没有更多了'">
            <dynamics-list @click="getupdateCustomerInfo" :allDynamicList="allDynamicList" :item="item"></dynamics-list>
          </van-list>
        </div>
        <div class="allDynamics-container" v-if="active === 1">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <dynamics-card @click="goallDynamics" :cardDynamicCount="cardDynamicCount" :cardDynamicListCount="cardDynamicListCount" :cardDynamicList="cardDynamicList"></dynamics-card>
          </van-list>
        </div>
        <div class="allDynamics-container" v-if="active === 2">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <properties :info="item" @click="itemProperties" :houseDynamicList="houseDynamicList" :houseDynamicCount="houseDynamicCount" :avgStayLinkerTime="avgStayLinkerTime"></properties>
          </van-list>
        </div>
        <div class="allDynamics-container" v-if="active === 3">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <dynamics-article :articleDynamicCount="articleDynamicCount" :articleDynamicList="articleDynamicList" :avgStayArticleTime="avgStayArticleTime" @click="itemArticleInfo"></dynamics-article>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ShadowBox from 'COMP/ShadowBox'
import Properties from 'COMP/Dynamics/Properties'
import DynamicsArticle from 'COMP/Dynamics/DynamicsArticle'
import DynamicsCard from 'COMP/Dynamics/DynamicsCard'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
import Tips from 'COMP/Dynamics/Tips'
import dynamicsService from 'SERVICE/dynamicsService'
import customService from 'SERVICE/customService'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    DynamicsData,
    Properties,
    DynamicsArticle,
    DynamicsList,
    ShadowBox,
    DynamicsCard,
    Tips
  },
  computed: {
    ...mapGetters(['currDataDynamicsTab'])
  },
  watch: {
    active(v) {
      this.$store.commit(types.CURR_DATA_DYNAMICS_TAB, v)
    }
  },
  data() {
    return {
      all: {
        totalTitle: '总浏览数',
        cardTitle: '名片浏览',
        propertiesTitle: '楼盘浏览',
        articleTitle: '文章浏览'
      },

      item: [],
      active: this.currDataDynamicsTab,
      tabs: [
        { index: 0, type: '', typeName: '全部', page: 0, finished: false, list: [] },
        { index: 1, type: '', typeName: '名片', page: 0, finished: false, list: [] },
        { index: 2, type: '', typeName: '楼盘', page: 0, finished: false, list: [] },
        { index: 3, type: '', typeName: '文章', page: 0, finished: false, list: [] }
      ],
      allDynamicCount: [],
      allDynamicList: [],
      cardDynamicCount: [],
      cardDynamicList: [],
      houseDynamicCount: [],
      houseDynamicList: [],
      articleDynamicCount: [],
      articleDynamicList: [],
      attentionStatus: 0,
      cardDynamicListCount: 0,
      avgStayArticleTime: 0,
      avgStayLinkerTime: 0,
      loading: false,
      finished: false,
      current: 1,
      size: 5,
      page: 1,
      pageSize: 5,
      allCurrent: 1,
      customerCount: this.$route.query.customerCount,
      businessCardViews: this.$route.query.businessCardViews,
      estateViews: this.$route.query.estateViews,
      articleCount: this.$route.query.articleCount,
      allDynamicsNum: this.$route.query.allDynamicsNum,
      showDynamics: false,
      scrollTop: 0
    }
  },
  created() {
    //动态未读状态变为0
    this.$store.dispatch('getUserInfo', Object.assign({},this.userInfo, { jumpToDynamicDetail: 0}))
    this.active = this.$store.state.dynamics.currDataDynamicsTab || 0
    this.allDynamicsNum = this.$route.query.allDynamicsNum
    let data = window.sessionStorage.getItem('dynamics')
    if (data) {
      let item = JSON.parse(data)
      this.allDynamicCount = item.allDynamicCount
      this.allDynamicList = item.allDynamicList
      this.cardDynamicCount = item.cardDynamicCount
      this.cardDynamicList = item.cardDynamicList
      this.houseDynamicCount = item.houseDynamicCount
      this.houseDynamicList = item.houseDynamicList
      this.articleDynamicCount = item.articleDynamicCount
      this.articleDynamicList = item.articleDynamicList
      this.attentionStatus = item.attentionStatus
      this.cardDynamicListCount = item.cardDynamicListCount
      this.avgStayArticleTime = item.avgStayArticleTime
      this.avgStayLinkerTime = item.avgStayLinkerTime
      this.loading = item.loading
      this.finished = item.finished
      this.current = item.current
      this.page = item.page
      this.scrollTop = item.scrollTop
      window.sessionStorage.removeItem('dynamics')
      this.$nextTick(() => {
        document.querySelector('.router-view').scrollTop = this.scrollTop
      })
    } else {
      this.updateDynamicsCollect()
      this.getAllDynamicCount()
      this.goList(this.active)
      this.govallDynamicsNum()
    }
    
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    govallDynamicsNum() {
      let second = 3
      const timer = setInterval(() => {
        second--
        if (second) {
          if (this.allDynamicsNum != 0) {
            this.showDynamics = true
          } else {
            this.showDynamics = false
          }
        } else {
          clearInterval(timer)
          this.showDynamics = false
        }
      }, 1000)
    },
    checkPosition(val) {},
    goList(index, title) {
      this.finished = false
      document.querySelector('.router-view').scrollTop = '0px'
      switch (index) {
        case 0:
          this.allDynamicList = []
          this.current = 1
          this.onLoad()
          break
        case 1:
          this.cardDynamicList = []
          this.current = 1
          this.onLoad()
          this.getCardDynamicCount()
          break
        case 2:
          this.houseDynamicList = []
          this.current = 1
          this.onLoad()
          this.getHouseDynamicCount()
          break
        case 3:
          this.articleDynamicList = []
          this.current = 1
          this.onLoad()
          this.getArticleDynamicCount()
          break
      }
    },

    async onLoad() {
      this.loading = true
      let result = []
      if (this.active === 0) {
        result = await customService.getCustomerDynamicList('', this.current)
      } else {
        result = await dynamicsService[this.getServeceFunc()](this.current)
      }

      if (this.active === 0) {
        //全部
        if (result.records.length > 0) {
          this.allDynamicList = this.allDynamicList.concat(result.records)
          if (result.pages === 0 || this.current === result.pages) {
            this.finished = true
          }
          this.current++
          this.loading = false
        } else {
          this.loading = false
          this.finished = true
        }
      } else if (this.active === 1) {
        //名片
        if (result.records.length > 0) {
          this.cardDynamicList = this.cardDynamicList.concat(result.records)
          if (result.pages === 0 || this.current === result.pages) {
            this.finished = true
          }
          this.current++
          this.loading = false
        } else {
          this.loading = false
          this.finished = true
        }
      } else if (this.active === 2) {
        //楼盘
        if (result.records.length > 0) {
          this.houseDynamicList = this.houseDynamicList.concat(result.records)
          if (result.pages === 0 || this.current === result.pages) {
            this.finished = true
          }
          this.current++
          this.loading = false
        } else {
          this.loading = false
          this.finished = true
        }
      } else if (this.active === 3) {
        //文章
        if (result.records.length > 0) {
          this.articleDynamicList = this.articleDynamicList.concat(result.records)
          if (result.pages === 0 || this.current === result.pages) {
            this.finished = true
          }
          this.current++
          this.loading = false
        } else {
          this.loading = false
          this.finished = true
        }
      }
    },

    getServeceFunc() {
      switch (this.active) {
        case 0:
          return 'getAllDynamicList'
        case 1:
          return 'getCardDynamicList'
        case 2:
          return 'getHouseDynamicList'
        case 3:
          return 'getArticleDynamicList'
      }
    },

    async updateDynamicsCollect() {
      const res = await dynamicsService.updateDynamicsCollect()
    },
    async getAllDynamicCount() {
      // 全部数据动态统计
      const res = await dynamicsService.getAllDynamicCount()
      this.allDynamicCount = res
      // Promise.all([this.getAllDynamicList,this.getArticleDynamicCount,this.getArticleDynamicList,this.getCardDynamicCount,this.getCardDynamicList])
    },
    //全部数据动态列表
    async getAllDynamicList(current) {
      const res = await dynamicsService.getAllDynamicList()
      this.allDynamicList = res.records
    },
    //名片数据动态统计
    async getCardDynamicCount() {
      const res = await dynamicsService.getCardDynamicCount()
      this.cardDynamicCount = res
      this.cardDynamicListCount = parseInt(this.cardDynamicCount.avgStayCardTime / 1000)
      // this.getCardDynamicList()
    },

    //名片数据动态列表
    async getCardDynamicList() {
      const res = await dynamicsService.getCardDynamicList()
      this.cardDynamicList = res.records
    },

    //楼盘数据动态统计
    async getHouseDynamicCount() {
      const res = await dynamicsService.getHouseDynamicCount()
      this.houseDynamicCount = res
      this.avgStayLinkerTime = parseInt(this.houseDynamicCount.avgStayLinkerTime / 1000)
      // this.getHouseDynamicList()
    },
    //楼盘动态列表
    async getHouseDynamicList() {
      const res = await dynamicsService.getHouseDynamicList()
      this.houseDynamicList = res.records
    },

    //文章数据动态统计
    async getArticleDynamicCount() {
      const res = await dynamicsService.getArticleDynamicCount()
      this.articleDynamicCount = res
      this.avgStayArticleTime = parseInt(this.articleDynamicCount.avgStayArticleTime / 1000)
      // this.getArticleDynamicList()
    },
    //文章数据动态列表
    async getArticleDynamicList() {
      const res = await dynamicsService.getArticleDynamicList(1)
      this.articleDynamicList = res.records
    },
    //全部按鈕
    async getupdateCustomerInfo(cons) {
      if (cons.type === 'update') {
        // /关注状态 0：已关注 1：未关注关注
        if (cons.item.attentionStatus == 1) {
          cons.item.attentionStatus = 0
          await dynamicsService.getupdateCustomerInfo(cons.item.clientId, 0)
        } else {
          cons.item.attentionStatus = 1
          await dynamicsService.getupdateCustomerInfo(cons.item.clientId, 1)
        }
      } else if (cons.type === 'messageList') {
        //聯繫
        this.$router.push({
          path: '/custom/message/message',
          query: {
            clientId: cons.item.clientId
          }
        })
      } else if (cons.type === 'detail') {
        //詳情
        this.$router.push(`/custom/${cons.item.clientId}`)
      }
    },
    //名片跳轉
    goallDynamics(pram) {
      if (pram.type === 'guanz') {
        if (pram.item.attentionStatus == 1) {
          pram.item.attentionStatus = 0
          dynamicsService.getupdateCustomerInfo(pram.item.clientId, 0)
        } else {
          pram.item.attentionStatus = 1
          dynamicsService.getupdateCustomerInfo(pram.item.clientId, 1)
        }
        //客户详情
      } else if (pram.type === 'detail') {
        this.$router.push(`/custom/${pram.item.clientId}`)
      } else if (pram.type === 'messageList') {
        this.$router.push({
          path: '/custom/message/message',
          query: {
            clientId: pram.item.clientId
          }
        })
      }
    },
    //楼盘
    itemProperties(val) {
      if (val.itemDynamiclist.openStatus == 1) {
        this.$dialog
          .confirm({
            title: '暂未开通楼盘',
            message: '请开通后查看楼盘详细动态',
            confirmButtonText: '去开通'
          })
          .then(() => {
            // on confirm
            this.$router.push(`/marketDetail/open/${val.itemDynamiclist.linkerId}`)
          })
          .catch(() => {
            // on cancel
          })
      } else {
        //跳转到动态详情item
        this.$router.push({ path: '/dynamics/dynamicsInfo', query: { itemDynamiclist: val.itemDynamiclist.linkerId } })
      }
    },
    //文章跳转
    itemArticleInfo(articlelist) {
      let articleInfo = articlelist.item
      if (articleInfo.enable == 1 || articleInfo.status == 0) {
        this.$dialog.alert({
          title: '',
          message: '该文章已删除下架，无法查看详细数据'
        })
        return
      }
      this.$router.push({
        path: '/Dynamics/articleInfo',
        query: {
          articleTime: articleInfo.articleTime,
          articleId: articleInfo.articleId,
          articleTitle: articleInfo.articleTitle,
          articleSource: articleInfo.articleSource,
          articleImgUrl: articleInfo.articleImgUrl
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.querySelector('.router-view').scrollTop
    next()
  },
  beforeDestroy () {
    let data = this.$data
    window.sessionStorage.setItem('dynamics',JSON.stringify(data))
  }
}
</script>
<style lang="less">
.allDynamics-page {
  background: #ffffff;
  margin: 0 0 20px 0;
  .data-container {
    margin-top: 60px;
  }
  > .tab-container {
    z-index: 99;
    > .van-tabs {
      z-index: 99;
    }
    // position: fixed;
    width: 100%;
    .allDynamics-container {
      padding-top: 8px;
    }
  }
  .allDynamics-container-titps {
    width: 133px;
    height: 30px;
    background: rgba(0, 122, 230, 1);
    border-radius: 16px;
    opacity: 0.9;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 30px;
    position: absolute;
    margin-top: -9px;
    left: 30%;
  }
  .van-tabs--line {
    padding-top: 1.17333rem;
    position: fixed;
    top: 0;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 1.17333rem;
    position: fixed;
    /* background: white; */
    z-index: 11;
  }
}
</style>
