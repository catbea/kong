<template>
  <div class="article-container" >
    <shadow-box>
      <div slot="container">
        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>
    <article-list :info="item" @click="itemArticleInfo"></article-list>
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
}
</style>
