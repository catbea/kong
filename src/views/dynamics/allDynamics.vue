<template>
  <div class="allDynamics-page">
    <div class="tab-container">
      <van-tabs
        v-model="activeIndex"
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
          v-if="activeIndex === 0 || activeIndex === 1"
        >
          <shadow-box>
            <div slot="container">
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
            @click="goallDynamics"
            :allDynamicList="activeIndex ===0?allDynamicList :CardDynamicList"
          ></dynamics-list>
        </div>
        <!-- <div
            class="allDynamics-container"
            v-if="activeIndex === 1"
          >
            <dynamics-card
              @click="goallDynamics"
              :CardDynamicCount="CardDynamicCount"
              :CardDynamicList="CardDynamicList"
            ></dynamics-card>
          </div> -->
        <div
          class="allDynamics-container"
          v-if="activeIndex === 2"
        >
          <properties
            :info="item"
            @click="itemProperties"
            :HouseDynamicList="HouseDynamicList"
            :HouseDynamicCount="HouseDynamicCount"
          ></properties>
        </div>
        <div
          class="allDynamics-container"
          v-if="activeIndex === 3"
        >
          <dynamics-article
            :ArticleDynamicCount="ArticleDynamicCount"
            :ArticleDynamicList="ArticleDynamicList"
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

  data () {
    return {
      all:{
        totalTitle: '总浏览数',
        cardTitle: '名片浏览',
        propertiesTitle: '楼盘浏览',
        articleTitle: '文章浏览',
      },

      item: [],
      activeIndex: [],
      tabs: [
        { index: 0, type: '', typeName: '全部', page: 0, finished: false, list: [] },
        { index: 1, type: '', typeName: '名片', page: 0, finished: false, list: [] },
        { index: 2, type: '', typeName: '楼盘', page: 0, finished: false, list: [] },
        { index: 3, type: '', typeName: '文章', page: 0, finished: false, list: [] }
      ],
      allDynamicCount: [],
      allDynamicList: [],
      CardDynamicCount: [],
      CardDynamicList: [],
      HouseDynamicCount: [],
      HouseDynamicList: [],
      ArticleDynamicCount: [],
      ArticleDynamicList: [],
    }
  },
  created () {
    this.getAllDynamicCount()
  },
  methods: {
    goList (index, title) {
      switch (index) {
        case 0:
          this.getAllDynamicCount()
          break;
        case 1:
          this.getCardDynamicCount()
          break;
        case 2:
          this.getHouseDynamicCount()
          break;
        case 3:
          this.getArticleDynamicCount()
          this.getArticleDynamicList()
          break;
      }
    },
    async getAllDynamicCount () {
      // 全部数据动态统计
      const res = await dynamicsService.getAllDynamicCount()
      this.allDynamicCount = res
      this.getAllDynamicList()
      // Promise.all([this.getAllDynamicList,this.getArticleDynamicCount,this.getArticleDynamicList,this.getCardDynamicCount,this.getCardDynamicList])
    },
    //全部数据动态列表
    async getAllDynamicList () {
      const res = await dynamicsService.getAllDynamicList()
      this.allDynamicList = res.records

    },
    //名片数据动态统计
    async getCardDynamicCount () {
      const res = await dynamicsService.getCardDynamicCount()
      this.CardDynamicCount = res.records
      this.getCardDynamicList()
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
      this.getHouseDynamicList()
    },
    //楼盘动态列表
    async getHouseDynamicList () {
      const res = await dynamicsService.getHouseDynamicList()
      this.HouseDynamicList = res.records
    },

    //文章数据动态统计
    async getArticleDynamicCount () {
      const res = await dynamicsService.getArticleDynamicCount()
      this.ArticleDynamicCount = res.records
      
    },
    //文章数据动态列表
    async getArticleDynamicList () {
      const res = await dynamicsService.getArticleDynamicList(1)
      this.ArticleDynamicList = res.records
    },


    itemProperties (val) {
      if (val.openStatus == 1) {
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
        this.$router.push('/dynamics/dynamicsInfo')
      }
    },
    //客户详情
    goallDynamics () {
      this.$router.push('/custom/detail')
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
