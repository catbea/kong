<template>
  <div class="allDynamics-page">
    <Tips></Tips>
    <!-- 动态全部-->
    <!-- <shadow-box>
      <div slot="container">
        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>
    <dynamics-list></dynamics-list> -->
  <!-- 名片 -->
    <dynamics-card></dynamics-card>

    <!-- 动态楼盘 -->
    <!-- <properties></properties>  -->

    <!-- 动态文章 -->

    <!-- <dynamics-article></dynamics-article> -->
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
      totalTitle: '总浏览数',
      totalNum: '90',
      cardTitle: '名片浏览',
      cardNum: '0',
      propertiesTitle: '楼盘浏览',
      propertiesNum: "190",
      articleTitle: '文章浏览',
      articleNum: '124',
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
.allDynamics-page {
  margin: 20px 0;
}
</style>
