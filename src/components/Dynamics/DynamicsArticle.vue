<template>
  <div class="article-container" >
   <div class="shadow-box">
     <div class="dynaData-container" v-if="articleDynamicCount">
        <span class="container-total">
          <p class="container-title">文章数量</p>
          <p class="card-num">{{articleDynamicCount.articleCount  }}</p>
        </span>
        <span class="container-card">
          <p class="container-title">文章分享</p>
          <p class="card-num">{{articleDynamicCount.articleShareCount  }}</p>
        </span>
        <span class="container-properties " >
          <p class="container-title">文章访客</p>
          <p class="card-num">{{articleDynamicCount.articleVisitorCount }}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">平均停留(S)</p>
          <p class="card-num">{{articleDynamicCount.avgStayArticleTime }}</p>
        </span>
      </div>
    </div>

    <div class="article-container" v-if="articleDynamicList">

    <div class="article-list" v-for="(item,key) in articleDynamicList" :key="key"  @click="itemArticleInfo(item)">
      <span class="article-list-left">
        <p class="article-left-title">{{item.articleTitle }}</p>
        <p class="article-left-time">{{item.articleSource }}&nbsp;&nbsp;{{item.articleTime | dateFormatterToHuman}}
          <span class="left-time-nub"> {{item.dynamicCount}}条动态</span>
        </p>
      </span>
      <span class="article-list-right">
        <img :src="item.articleImgUrl" class="mark-icon">
      </span>

    </div>
    
  </div>
    <!-- <article-list :info="item" :HouseDynamicList="HouseDynamicList"></article-list> -->
  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ArticleList from 'COMP/Dynamics/ArticleList'
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    DynamicsData,
    ArticleList,
    ShadowBox
  },
  props: {
    articleDynamicCount: { type: Array },
    articleDynamicList: { type: Array }
  },
  data() {
    return {
      totalTitle: '文章数量',
      totalNum: '90',
      cardTitle: '文章分享',
      cardNum: '0',
      propertiesTitle: '文章访客',
      propertiesNum: '190',
      articleTitle: '平均停留(S)',
      articleNum: '124'
    }
  },
  created() {},
  methods: {
    itemArticleInfo(item) {
      // /discover/headlinepath：'/Dynamics/articleInfo',query{}
      this.$router.push({path:'/Dynamics/articleInfo',query: {itemlist:item}})
    },
    
  }
}
</script>
<style lang="less">
.article-container {
  background: #ffffff;
  .article-container {
    background: #ffffff;
    margin-top: 13px;
    .shadow-box {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
      border-radius: 6px;
      margin: 0 16px;
      .dynaData-container {
        background: #ffffff;
        display: flex;
        padding: 20px 0 20px 20px;

        span {
          width: 80.7px;
        }
        .container-title {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 18px;
        }
        .card-num {
          font-size: 24px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 36px;
        }
      }
    }
    > .article-list {
      // margin: 0 15px;
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      margin: 0 16px;
      padding: 16px 0 16px 0;
      > .article-list-left {
        height: 90px;
        position: relative;
        > .article-left-title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          margin-right: 60px;
          padding-right: 70px;
        }
        > .article-left-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          position: absolute;
          bottom: 0;
          > .left-time-nub {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 122, 230, 1);
            line-height: 17px;
            padding-left: 50px;
          }
        }
      }
      > .article-list-right {
        width: 120px;
        height: 90px;
        border-radius: 6px;
        position: absolute;
        margin-right: 0;
        padding-right: 0;
        right: 16px;
        > .mark-icon {
          width: 120px;
          height: 90px;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
