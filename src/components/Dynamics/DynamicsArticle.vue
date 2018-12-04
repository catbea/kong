<template>
  <div class="article-container" >
    <shadow-box>
      <div slot="container">
        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>

    <div class="article-container" v-if="ArticleDynamicList">

    <div class="article-list" @click="GOheadline" v-for="(item,key) in ArticleDynamicList" :key="key">
      <span class="article-list-left">
        <p class="article-left-title">{{item.articleTitle }}</p>
        <p class="article-left-time">{{item.articleSource }}&nbsp;&nbsp;{{item.articleTime}}
          <span class="left-time-nub"> {{item.dynamicCount}}条动态</span>
        </p>
      </span>
      <span class="article-list-right">
        <img :src="item.articleImgUrl" class="mark-icon">
      </span>

    </div>
    
  </div>
    <!-- <article-list :info="item" @click="itemArticleInfo" :HouseDynamicList="HouseDynamicList"></article-list> -->
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
  props:{
    HouseDynamicCount:{type:Array},
    ArticleDynamicList:{type:Array}
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
  created() {
  },
  methods: {
    itemArticleInfo(e) {
      // /discover/headline
      this.$router.push('/Dynamics/articleInfo')
    }
  }
}
</script>
<style lang="less">
.article-container {
  background: #ffffff;
  .article-container {
  background: #ffffff;
  margin-top: 13px;
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
