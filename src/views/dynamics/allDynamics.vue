<template>
  <div class="allDynamics-page">
    <!-- <Tips></Tips> -->
    <div class="tab-container">


  <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated @click="goList">
        <van-tab v-for="item in tabs" :key="item.index" :title="item.typeName" >
          <!-- 动态全部-->
          <div class="allDynamics-container" v-if="item.index === 0">
            <shadow-box>
              <div slot="container">
                <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
              </div>
            </shadow-box>
            <dynamics-list></dynamics-list>
          </div>
           <div class="allDynamics-container" v-if="item.index === 1">
            <dynamics-card></dynamics-card>
          </div>
           <div class="allDynamics-container" v-if="item.index === 2">
            <properties  :info="item"  @click="itemProperties"></properties>
          </div>
          <div class="allDynamics-container" v-if="item.index === 3">
            <dynamics-article></dynamics-article>
          </div>

        </van-tab>
      </van-tabs>

      <!-- <van-tabs  color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="全部">

          <div class="allDynamics-container">
            <shadow-box>
              <div slot="container">
                <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
              </div>
            </shadow-box>
            <dynamics-list></dynamics-list>
          </div>
        </van-tab>
        <van-tab title="名片">

          <div class="allDynamics-container">
            <dynamics-card></dynamics-card>
          </div>
        </van-tab>
        <van-tab title="楼盘">

          <div class="allDynamics-container">
            <properties  :info="item"  @click="itemProperties"></properties>
          </div>
        </van-tab>
        <van-tab title="文章">

          <div class="allDynamics-container">
            <dynamics-article></dynamics-article>
          </div>
        </van-tab>
      </van-tabs> -->
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
import userService from 'SERVICE/dynamicsService'
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
      totalTitle: '总浏览数',
      totalNum: '90',
      cardTitle: '名片浏览',
      cardNum: '0',
      propertiesTitle: '楼盘浏览',
      propertiesNum: '190',
      articleTitle: '文章浏览',
      articleNum: '124',
      item:[],
      tabs:[
        { index: 0, type: '', typeName: '全部', page: 0, finished: false, list: [] },
        { index: 1, type: '', typeName: '名片', page: 0, finished: false, list: [] },
        { index: 2, type: '', typeName: '楼盘', page: 0, finished: false, list: [] },
        { index: 3, type: '', typeName: '文章', page: 0, finished: false, list: [] }
      ]
    }
  },
  created() {
    this.getAllDynamicCount()
  },
  methods: {
   goList(index,title){
       alert("1111")
        alert(index)
    },
     async getAllDynamicCount () {
        // 全部数据动态统计
      const res = await dynamicsService.getAllDynamicCount()
      this.allDynamicCount = res.records
      Promise.all([this.getAllDynamicList,this.getArticleDynamicCount,this.getArticleDynamicList,this.getCardDynamicCount,this.getCardDynamicList])
    },
    //全部数据动态列表
    async getAllDynamicList () {
      const res = await dynamicsService.getAllDynamicList()
      this.allDynamicList= res.records
    },
    //文章数据动态统计
    async getArticleDynamicCount () {
      const res = await dynamicsService.getArticleDynamicCount()
      this.ArticleDynamicCount = res.records
    },
    //文章数据动态列表
    async getArticleDynamicList () {
      const res = await dynamicsService.getArticleDynamicList()
      this.ArticleDynamicList = res.records
    },
    //名片数据动态统计
    async getCardDynamicCount () {
      const res = await dynamicsService.getCardDynamicCount()
      this.CardDynamicCount = res.records
    },
    //名片数据动态列表
    async getCardDynamicList () {
      const res = await dynamicsService.getCardDynamicList()
      this.CardDynamicList = res.records
    },
    //楼盘数据动态统计
    async getHouseDynamicCount () {
      const res = await dynamicsService.getHouseDynamicCount()
      this.HouseDynamicCount = res.records
    },
    //楼盘动态列表
    async getHouseDynamicList () {
      const res = await dynamicsService.getHouseDynamicList()
      this.HouseDynamicList = res.records
    },
    //单个文章数据动态统计
      async getArticleDynamicCount () {
      const res = await dynamicsService.getArticleDynamicCount()
      this.ArticleDynamicCount = res.records
    },
    //查询单个文章客户访问数据动态列表
      async getArticleDynamicList () {
      const res = await dynamicsService.getArticleDynamicList()
      this.ArticleDynamicList = res.records
    },
    //单个楼盘数据动态统计
      async getSingleHouseDynamicCount () {
      const res = await dynamicsService.getSingleHouseDynamicCount()
      this.SingleHouseDynamicCount = res.records
    },
    //查询单个楼盘数据动态列表
      async getSingleHouseDynamicList () {
      const res = await dynamicsService.getSingleHouseDynamicList()
      this.SingleHouseDynamicList = res.records
    },
    itemProperties() {

      //跳转到动态详情item
      // this.$router.push('/dynamics/dynamicsInfo')
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
    }
  }
}
</script>
<style lang="less">
.allDynamics-page {
  background: #ffffff;
  margin: 0 0 20px 0;
  > .tab-container {
    // position: fixed;
    width: 100%;
    .allDynamics-container {
      margin-top: 20px;
    }
  }
  .van-tabs--line .van-tabs__wrap {
    height: 1.17333rem;
    position: fixed;
    /* background: white; */
    z-index: 11;
  }
}
</style>
