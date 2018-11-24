<template>
  <div class="article-container">
    <shadow-box>
      <div slot="container">
        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>
    <dynamics-list></dynamics-list>
  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    DynamicsData,
    DynamicsList,
    ShadowBox
  },
  data() {
    return {
      totalTitle: '名片数量',
      totalNum: '90',
      cardTitle: '名片分享',
      cardNum: '0',
      propertiesTitle: '名片访客',
      propertiesNum: '190',
      articleTitle: '平均停留(S)',
      articleNum: '124'
    }
  }
}
</script>
<style lang="less">
.article-container {
}
</style>
