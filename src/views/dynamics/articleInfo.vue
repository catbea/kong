<template>
  <div class="articleInfo-page">
    <shadow-box>
      <div slot="container">
        <div class="articleInfo-list">
          <span class="articleInfo-list-left">
            <p class="list-left-title">为什么好多人买房都不选高层今天为您解答奥秘。</p>
            <p class="list-left-time">楚天都市报&nbsp;&nbsp;1小时前</p>
          </span>
          <span class="articleInfo-list-right">
            <img :src="backIcon" class="mark-icon">
          </span>

        </div>
        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>
     <dynamics-list></dynamics-list>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
export default {
  components: {
    ShadowBox,
    DynamicsData,
    DynamicsList
  },
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
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
  methods:{
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
  }
}
</script>
<style lang="less">
.articleInfo-page {
  background: #ffffff;
  margin: 16px 0;
  .articleInfo-list {
    margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0 16px 0;
    > .articleInfo-list-left {
      height: 90px;
      position: relative;
      > .list-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-right: 60px;
        padding-right: 70px;
      }
      > .list-left-time {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        position: absolute;
        bottom: 0;
      }
    }
    > .articleInfo-list-right {
      width: 120px;
      height: 90px;
      border-radius: 6px;
      position: absolute;
      margin-right: 0;
      padding-right: 0;
      right: 32px;
      > .mark-icon {
        width: 120px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
