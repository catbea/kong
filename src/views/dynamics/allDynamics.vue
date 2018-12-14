<template>
  <div class="allDynamics-page">
    <div class="tab-container">
      <van-tabs
        v-model="active"
        color="#007AE6"
        :line-width="15"
        :swipe-threshold="6"
        sticky
        animated
        @click="goList"
      >
        <van-tab
          v-for="item in tabs"
          :key="item.index"
          :title="item.typeName"
        >
        </van-tab>
      </van-tabs>
      <div class="data-container">
        <!-- 动态全部-->
        <div
          class="allDynamics-container"
          v-if="active === 0 "
        >
          <shadow-box>
            <div slot="container">
              <!-- active === 0? allDynamicCount :CardDynamicCount -->
              <dynamics-data
                :totalTitle="all.totalTitle"
                :cardTitle="all.cardTitle"
                :propertiesTitle="all.propertiesTitle"
                :articleTitle="all.articleTitle"
                :allDynamicCount="allDynamicCount"
              ></dynamics-data>
            </div>
          </shadow-box>
          <dynamics-list
            @click="getupdateCustomerInfo"
            :allDynamicList="allDynamicList"
            :item="item"
            
          ></dynamics-list>
        </div>
        <div
            class="allDynamics-container"
            v-if="active === 1"
          >
            <dynamics-card
              @click="goallDynamics"
              :cardDynamicCount="cardDynamicCount"
              :cardDynamicListCount="cardDynamicListCount"
              :cardDynamicList="cardDynamicList"
            ></dynamics-card>
          </div>
        <div
          class="allDynamics-container"
          v-if="active === 2"
        >
          <properties
            :info="item"
            @click="itemProperties"
            :houseDynamicList="houseDynamicList"
            :houseDynamicCount="houseDynamicCount"
            :avgStayLinkerTime="avgStayLinkerTime"
          ></properties>
        </div>
        <div
          class="allDynamics-container"
          v-if="active === 3"
        >
          <dynamics-article
            :articleDynamicCount="articleDynamicCount"
            :articleDynamicList="articleDynamicList"
            :avgStayArticleTime="avgStayArticleTime"
          ></dynamics-article>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ShadowBox from 'COMP/ShadowBox'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
import Properties from 'COMP/Dynamics/Properties'
import DynamicsArticle from 'COMP/Dynamics/DynamicsArticle'
import DynamicsCard from 'COMP/Dynamics/DynamicsCard'
import Tips from 'COMP/Dynamics/Tips'
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  components: {
    DynamicsData,
    DynamicsList,
    Properties,
    DynamicsArticle,
    ShadowBox,
    DynamicsCard,
    Tips
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
      active: '',
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
      cardDynamicListCount:0,
      avgStayArticleTime: 0,
      avgStayLinkerTime: 0,
    }
  },
  created() {
    this.getAllDynamicCount()
  },
  methods: {
    goList(index, title) {
      switch (index) {
        case 0:
          this.getAllDynamicCount()
          break
        case 1:
          this.getCardDynamicCount()
          break
        case 2:
          this.getHouseDynamicCount()
          break
        case 3:
          this.getArticleDynamicCount()
          break
      }
    },
    async getAllDynamicCount() {
      // 全部数据动态统计
      const res = await dynamicsService.getAllDynamicCount()
      this.allDynamicCount = res
      this.getAllDynamicList()
      // Promise.all([this.getAllDynamicList,this.getArticleDynamicCount,this.getArticleDynamicList,this.getCardDynamicCount,this.getCardDynamicList])
    },
    //全部数据动态列表
    async getAllDynamicList() {
      const res = await dynamicsService.getAllDynamicList()
      this.allDynamicList = res.records
    },
    //名片数据动态统计
    async getCardDynamicCount() {
      const res = await dynamicsService.getCardDynamicCount()
      this.cardDynamicCount = res
        this.cardDynamicListCount = parseInt(this.cardDynamicCount.avgStayCardTime /1000)
      this.getCardDynamicList()
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
      this.avgStayLinkerTime = parseInt(this.houseDynamicCount.avgStayLinkerTime/1000) 
      this.getHouseDynamicList()
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
      this.avgStayArticleTime = parseInt(this.articleDynamicCount.avgStayArticleTime /1000)
      this.getArticleDynamicList()
    },
    //文章数据动态列表
    async getArticleDynamicList() {
      const res = await dynamicsService.getArticleDynamicList(1)
      this.articleDynamicList = res.records
    },
    //全部按鈕
 async getupdateCustomerInfo (cons) {
    if(cons.type === 'update'){
// /关注状态 0：已关注 1：未关注关注
     if (cons.item.attentionStatus == 1) {
        cons.item.attentionStatus = 0
        await dynamicsService.getupdateCustomerInfo(cons.item.clientId,0)
      } else {
        cons.item.attentionStatus = 1
        await dynamicsService.getupdateCustomerInfo(cons.item.clientId,1)
      }
    }else if(cons.type === 'messageList'){
      //聯繫
       this.$router.push('/dynamics/message/messageList')
    }else if(cons.type === 'detail'){
      //詳情
       this.$router.push(`/custom/${cons.item.clientId}`)
    }
    },
   //文章跳轉
    goallDynamics (pram) {
      if(pram.type === 'guanz'){
        if (pram.item.attentionStatus == 1) {
        pram.item.attentionStatus = 0
         dynamicsService.getupdateCustomerInfo(pram.item.clientId,0)
      } else {
        pram.item.attentionStatus = 1
         dynamicsService.getupdateCustomerInfo(pram.item.clientId,1)
      }
      //客户详情
      }else if(pram.type === 'detail'){
        this.$router.push(`/custom/${pram.item.clientId}`)
      }else if(pram.type ==='messageList'){
         this.$router.push('/dynamics/message/messageList')
      }
      
    },
    itemProperties (val) {
      if (val.itemDynamiclist.openStatus == 1) {
        this.$dialog
          .confirm({
            title: '暂未开通楼盘',
            message: '请开通后查看楼盘详细动态',
            confirmButtonText: '去开通'
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          })
      } else {
        //跳转到动态详情item
        this.$router.push({ path: '/Dynamics/dynamicsInfo', query: { itemDynamiclist: val.itemDynamiclist } })
      }
    },
   
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
    // position: fixed;
    width: 100%;
    .allDynamics-container {
      margin-top: 20px;
    }
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
