<template>
  <div class="article-container">
    <div class="shadow-box">
      <div class="dynaData-container" v-if="articleDynamicCount">
        <span class="container-total">
          <p class="container-title">文章数量</p>
          <p class="card-num">{{articleDynamicCount.articleCount }}</p>
        </span>
        <span class="container-card">
          <p class="container-title">文章分享</p>
          <p class="card-num">{{articleDynamicCount.articleShareCount }}</p>
        </span>
        <span class="container-properties">
          <p class="container-title">文章访客</p>
          <p class="card-num">{{articleDynamicCount.articleVisitorCount }}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">平均停留(S)</p>
          <p class="card-num">{{avgStayArticleTime}}</p>
        </span>
      </div>
    </div>
     <div class="article-containers" v-if="articleDynamicList.length>0">
     
    <div class="van-hairline--bottom discover-item" v-for="(item,key) in articleDynamicList"
        :key="key" @click="itemArticleInfo(item)">
      <div class="discover-list-left">
        <p class="list-left-title">{{item.articleTitle}}</p>
        <p
          class="list-left-time"
        >{{item.articleSource}}&nbsp;&nbsp;{{item.articleTime | dateFormatterToHuman}}
        <span class="left-time-nub">{{item.dynamicCount}}条动态</span>
        </p>
      </div>
      <div
        class="bg_img van-hairline--surround discover-list-right"
        :style="{'backgroundImage':'url('+ item.articleImgUrl +')'}"
      ></div>
    </div>
    </div>
  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ShadowBox from 'COMP/ShadowBox'
import DynamicsNull from 'COMP/Dynamics/DynamicsNull'
export default {
  components: {
    DynamicsData,
    ShadowBox,
    DynamicsNull
  },
  props: {
    articleDynamicCount: { type: '' },
    articleDynamicList: { type: Array },
    avgStayArticleTime: { type: '' }
  },
  data() {
    return {
      // articleDynamicList:[
      //   { id: '4', articleTitle: '治污染纳入考核 河长制延伸到村', articleTime: '', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      //   { id: '5', articleTitle: '碧桂园凤凰国际', articleTime: '0', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      //   { id: '6', articleTitle: '治污染纳入考核 河长制延伸到村', articleTime: '0', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      //   { id: '7', articleTitle: '碧桂园凤凰国际', articleTime: '0', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      //   { id: '8', articleTitle: '碧桂园凤凰国际', articleTime: '0', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      //    { id: '1', articleTitle: '从月球上能看到长城？这些关于月亮的谣言你信过几个', articleTime: '0', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      //     { id: '2', articleTitle: '从月球上能看到长城？这些关于月亮的谣言你信过几个', articleTime: '0', dynamicCount: '14', articleSource: '南山 深圳湾', price: '0' },
      // ]
    }
  },
  methods() {},
  methods: {
    itemArticleInfo(item) {
      let parm = {
        item: item
      }
      this.$emit('click', parm)
    }
  }
}
</script>
<style lang="less">
.article-container {
  background: #ffffff;

  .article-containers {
    margin-top: 30px;
  }
  .discover-item {
    background: #ffffff;
    margin: 15px;
    display: flex;
    height: 110px;
    > .discover-list-left {
      position: relative;
      flex: 1;
      height: 90px;
      // padding: 6px 15px;
      > .list-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        width: 95%;
      }
      > .list-left-time {
        position: absolute;
        bottom: 4px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .left-time-nub {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 17px;
          padding-left: 25px;
        }
      }
    }
    > .discover-list-right {
      width: 120px;
      height: 90px;
      border-radius: 6px;
      background-color: #999999;
      // margin-right: 16px;
      // margin-top: 10px;
    }
  }
}
</style>
